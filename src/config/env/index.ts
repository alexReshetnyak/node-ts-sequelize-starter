import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: string | number;
  database: {
    PG_DB: string;
    PG_PORT: string | number;
    PG_HOST: string;
    PG_USER: string;
    PG_PASSWD: string;
  };
  secret: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    PG_DB: process.env.PG_DB || 'postgres',
    PG_PORT: 5432,
    PG_HOST: process.env.PG_HOST || 'localhost',
    PG_USER: process.env.PG_USER || 'postgres',
    PG_PASSWD: process.env.PG_PASSWD || 'postgres',
  },
  secret: process.env.SECRET || '@QEGTUI'
};

const production: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    PG_DB: process.env.PG_DB || 'postgres',
    PG_PORT: 5432,
    PG_HOST: process.env.PG_HOST || 'localhost',
    PG_USER: process.env.PG_USER || 'postgres',
    PG_PASSWD: process.env.PG_PASSWD || 'postgres',
  },
  secret: process.env.SECRET || '@QEGTUI'
};

const test: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    PG_DB: process.env.PG_DB || 'postgres',
    PG_PORT: 5432,
    PG_HOST: process.env.PG_HOST || 'localhost',
    PG_USER: process.env.PG_USER || 'postgres',
    PG_PASSWD: process.env.PG_PASSWD || 'postgres',
  },
  secret: process.env.SECRET || '@QEGTUI'
};

const config: {
  [name: string]: IConfig
} = {
  test,
  development,
  production
};

export default config[NODE_ENV];
