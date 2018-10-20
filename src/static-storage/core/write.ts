import { createWriteStream, exists } from "fs";
import * as http from "http";
import { renderFileURI } from "./file-uri";

export function _writeFile(
  path: string,
  request: http.IncomingMessage,
  response: http.ServerResponse,
): void {
  request
    .pipe(
      createWriteStream(path),
      { end: true },
    )
    .on("close", () => {
      exists(path, exists => {
        if (!exists) {
          // If file does not exists, it's not a 404 NOT FOUND error
          // but a fail while writing stream on the file system
          response.writeHead(500);
          response.end("Something went wrong");
        }

        const responseData = JSON.stringify({
          path: renderFileURI(request, path),
        });
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(responseData);
      });
    });
}
