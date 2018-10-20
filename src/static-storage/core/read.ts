import chalk from "chalk";
import { readFile } from "fs";
import * as http from "http";

export function _readFile(path: string, response: http.ServerResponse): void {
  readFile(path, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        console.log(chalk.red("[Storage]") + " File not found at " + path);

        response.writeHead(404);
        response.end("File not found");
      } else {
        console.log(`
          ${chalk.red("[storage]")} Something went wrong: \n
          ${chalk.gray(error.message)}
        `);

        response.writeHead(500);
        response.end("Something went wrong");
      }
    } else {
      console.log(
        `${chalk.green("[Storage]")} successfully rendered [${path}]`,
      );

      response.writeHead(200);
      response.end(content, "utf-8");
    }
  });
}
