import { ENV } from "./env";

export enum NodeEnv {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}

export type LoggerLevel = "dev" | "prod";

interface IConfig {
  env: NodeEnv;
  server: {
    host: string;
    port: number;
  };
  logger: {
    level: LoggerLevel;
  };
  jwt: {
    secret: string;
  };
}

export const Config: IConfig = {
  env: (process.env.NODE_ENV as NodeEnv) || (ENV.NODE_ENV as NodeEnv),
  server: {
    host: process.env.HOST || ENV.SERVER_HOST,
    port: Number(process.env.PORT) || ENV.SERVER_PORT,
  },
  logger: {
    level:
      (process.env.LOG_LEVEL as LoggerLevel) || (ENV.LOG_LEVEL as LoggerLevel),
  },
  jwt: {
    secret: ENV.JWT_SECRET,
  },
};
