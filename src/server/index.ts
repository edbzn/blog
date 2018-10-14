import { Server } from "./connection/server";
import { app } from "./app";

const bootstrap = async () => {
  await Server.create(app);
};

bootstrap();
