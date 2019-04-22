import { createContext, httpListener } from '@marblejs/core';
import chalk from 'chalk';
import { createServer } from 'http';

import { Config } from '../config';

type HttpListener = ReturnType<typeof httpListener>;

export namespace Server {
  const { host, port } = Config.server;

  const onListen = () => {
    console.info(chalk.green('[server] running'), `@ http://${host}:${port}/`);
  };

  const onClose = () => {
    console.info(chalk.green(`[server] stopped`));
  };

  const onError = (error: Error) => {
    console.error(chalk.red('[server] failed'), error.message);
  };

  export const create = async (httpListener: HttpListener) => {
    const httpListenerWithContext = httpListener.run(createContext());

    createServer(httpListenerWithContext)
      .listen(port)
      .on('close', onClose)
      .on('error', onError)
      .on('listening', onListen);
  };
}
