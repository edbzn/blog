import { app } from "./app";
import { Database } from "./connection/database";
import { Server } from "./connection/server";

const bootstrap = async () => {
  await Database.connect();
  await Server.create(app);
};

bootstrap();
