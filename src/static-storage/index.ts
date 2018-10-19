import { HttpStatus } from "@marblejs/core";
import chalk from "chalk";
import * as http from "http";
import { v1 as uuid } from "uuid";

import { allowCORSRequest } from "./core/cors";
import { _readFile as readFile } from "./core/read";
import { _writeFile as writeFile } from "./core/write";
import { getPublicPath, PUBLIC_PATH } from "./core/public-path";

const port = process.env.PORT || 8082;

http
  .createServer((request, response) => {
    console.log(
      `${chalk.yellow("[storage]")} request [${request.method}] starting`,
    );
    const { method } = request;

    allowCORSRequest(response);
    if (method === "OPTIONS") {
      response.writeHead(200);
      return response.end();
    }

    if (method === "GET") {
      const { url } = request;
      if (!url) {
        console.log(`${chalk.red("[storage]")} Path not found`);
        response.writeHead(HttpStatus.BAD_REQUEST);
        response.end("No path was found in request url");
        return;
      }

      const filename = /([^\/]+)(?=$)/.exec(url);

      if (filename) {
        const filePath = `${PUBLIC_PATH}${filename[0]}`;
        readFile(filePath, response);
      }
    } else if (method === "POST") {
      let contentType = request.headers["content-type"];

      if (!contentType) {
        console.log(`${chalk.red("[storage]")} No Content-Type found`);
        response.writeHead(HttpStatus.BAD_REQUEST);
        response.end("No Content-Type was found in request Headers");
        return;
      }
      const extname = "." + contentType.split("/").pop();
      const filename = uuid() + extname;

      switch (extname) {
        case ".png":
          contentType = "image/png";
          break;
        case ".jpg":
          contentType = "image/jpg";
          break;
        default:
          console.log(`${chalk.red("[storage]")} unsupported MIME-Type`);
          response.writeHead(HttpStatus.BAD_REQUEST);
          response.end("Unsupported MIME-Type");
          return;
      }

      writeFile(getPublicPath(filename), request, response);
    } else {
      response.writeHead(HttpStatus.BAD_REQUEST);
      response.end("Unsupported Method");
    }
  })
  .listen(port)
  .on("listening", () => {
    console.log(
      chalk.green("[storage] running ") + "@ http://localhost:" + port + "/",
    );
  });
