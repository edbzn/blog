import { ENV } from "./env";
import { string } from "joi";

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
  db: {
    urlMain: string;
    urlTest: string;
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
  jwt: {
    secret: string;
  };
}

export const Config: IConfig = {
  env: (process.env.NODE_ENV as NodeEnv) || (ENV.NODE_ENV as NodeEnv),
  jwt: {
    secret: process.env.JWT_SECRET || ENV.JWT_SECRET,
  },
  server: {
    host: process.env.HOST || ENV.SERVER_HOST,
    port: Number(process.env.PORT) || ENV.SERVER_PORT,
  },
  logger: {
    level:
      (process.env.LOG_LEVEL as LoggerLevel) || (ENV.LOG_LEVEL as LoggerLevel),
  },
  db: {
    urlMain: process.env.DB_URL_MAIN || ENV.DB_URL_MAIN,
    urlTest: process.env.DB_URL_TEST || ENV.DB_URL_TEST,
  },
  twitter: {
    baseUrl: "https://api.twitter.com/1.1/search/tweets.json",
    fromUserName: "edouardbozon",
    oAuth: {
      token: process.env.TWITTER_TOKEN || ENV.TWITTER_TOKEN,
      token_secret:
        process.env.TWITTER_TOKEN_SECRET || ENV.TWITTER_TOKEN_SECRET,
      consumer_key:
        process.env.TWITTER_CONSUMER_KEY || ENV.TWITTER_CONSUMER_KEY,
      consumer_secret:
        process.env.TWITTER_CONSUMER_KEY_SECRET ||
        ENV.TWITTER_CONSUMER_KEY_SECRET,
    },
  },
};
