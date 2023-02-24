import { Config } from '../config';

export const envs: NodeJS.ProcessEnv = {
  ...process.env,
};

export const config: Config = {
  nodeEnv: envs.NODE_ENV as Config['nodeEnv'],
  server: {
    hostname: envs.HOSTNAME as string,
    port: Number(envs.PORT),
  },
  openapi: {
    URL: envs.OPENAPI_URL as string,
  },
};
