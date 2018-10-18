import * as http from "http";

export function allowCORSRequest(response: http.ServerResponse): void {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Request-Method", "*");
  response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  response.setHeader("Access-Control-Allow-Headers", "*");
}
