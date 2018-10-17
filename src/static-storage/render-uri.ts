import * as http from "http";

export function renderFileURI(request: http.IncomingMessage, path: string): string {
  return (request.headers.protocol || "http") + "://" + request.headers.host + path; 
}
