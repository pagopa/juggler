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
};
