import { env } from 'process';

export const appConfig = {
  port: env.APP_PORT || 3000,
  jwtSecret: env.JWT_SECRET || 'secret',
};

export const dbConfig = {
  port: Number(env.MONGO_PORT) || 27017,
  host: env.MONGO_HOST || 'localhost',
  name: env.MONGO_DB_NAME || 'test',
  root: env.MONGO_ROOT_NAME || 'root',
  pass: env.MONGO_ROOT_PASS || 'pass',
};

export const connectionString = ((): string => {
  return `mongodb://${dbConfig.root}:${dbConfig.pass}@${dbConfig.host}:${dbConfig.port}/`;
})();
