import Sequelize from 'sequelize';

export const ormInit = () => {
  // @ts-ignore
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err: any) => {
      console.error('Unable to connect to the database:', err);
    });

  return sequelize;
};
