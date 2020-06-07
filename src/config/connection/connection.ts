import { Sequelize } from 'sequelize';

import config from '../env/index';


const sequelize: Sequelize = new Sequelize(
  config.database.PG_DB,
  config.database.PG_USER,
  config.database.PG_PASSWD,
  {
    host: config.database.PG_HOST,
    dialect: 'postgres',
    port: config.database.PG_PORT as number,
    define: {
      underscored: true,
      charset: 'utf8',
    }
  }
);

sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err: Error) => {
    console.log('An error occurred %j', err);
  });

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

export { sequelize };
