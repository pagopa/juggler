import path from 'path';
import { Config } from '../config';

export const envs: NodeJS.ProcessEnv = {
  ...process.env,
};

export const config: Config = {
  server: {
    hostname: envs.HOSTNAME as string,
    port: Number(envs.PORT),
  },
  openapi: {
    URL: envs.OPENAPI_URL as string,
  },
  rootDir: path.resolve(path.join(__dirname, '..')),
};
