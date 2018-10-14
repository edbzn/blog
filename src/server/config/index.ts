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
  twitter: {
    baseUrl: string;
    fromUserName: string;
    oAuth: {
      token: string;
      token_secret: string;
      consumer_key: string;
      consumer_secret: string;
    };
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
  jwt: { secret: ENV.JWT_SECRET },
  twitter: {
    baseUrl: "https://api.twitter.com/1.1/search/tweets.json",
    fromUserName: "edouardbozon",
    oAuth: {
      token: "613241612-L1pKw6MILp4VBkI5V9vXlVY2QSsc4Sj8CtJZphQy",
      token_secret: "qtKtvObgUkAdTQfAxjSXDBLaAnjQpBRrrpikNHInSxanZ",
      consumer_key: "iSW1Uh8Zf0oqlj8UPiWQkaevj",
      consumer_secret: "TLnXmPYsra4jflTC6fDXkkH3lGiDKszPkUrsrswAkXf84ekrN9",
    },
  },
};
