import Sequelize from 'sequelize';

let sequelizeInstance;

export const sequilizeDatabaseConnection = () => {
  // @ts-ignore
  sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

  sequelizeInstance
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err: any) => {
      console.error('Unable to connect to the database:', err);
    });
};
