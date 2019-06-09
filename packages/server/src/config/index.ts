export enum NodeEnv {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export type LoggerLevel = 'dev' | 'prod';

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
  frontAppDomains: string[];
}

export const Config: IConfig = {
  frontAppDomains: (process.env.FRONT_APP_DOMAINS as string).split(' '),
  env: process.env.NODE_ENV as NodeEnv,
  jwt: { secret: process.env.JWT_SECRET as string },
  server: {
    host: process.env.HOST as string,
    port: Number(process.env.PORT as string),
  },
  logger: {
    level: process.env.LOG_LEVEL as LoggerLevel,
  },
  db: {
    urlMain: process.env.DB_URL_MAIN as string,
    urlTest: process.env.DB_URL_TEST as string,
  },
  twitter: {
    baseUrl: 'https://api.twitter.com/1.1/search/tweets.json',
    fromUserName: 'edouardbozon',
    oAuth: {
      token: process.env.TWITTER_TOKEN as string,
      token_secret: process.env.TWITTER_TOKEN_SECRET as string,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
      consumer_secret: process.env.TWITTER_CONSUMER_KEY_SECRET as string,
    },
  },
};
