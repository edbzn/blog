import * as http from "http";

export function allowCORSRequest(response: http.ServerResponse): void {
  response.setHeader("Access-Control-Allow-Origin", [
    process.env.FRONT_APP_DOMAIN || "http://localhost:8080",
  ]);
  response.setHeader("Access-Control-Allow-Headers", [
    "Content-Type",
    "Origin",
    "Authorization",
  ]);
  response.setHeader("Access-Control-Allow-Methods", [
    "OPTIONS",
    "GET",
    "POST",
  ]);
}
