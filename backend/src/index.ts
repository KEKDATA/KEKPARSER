import { connectionSockets } from './socket';
import { sequilizeDatabaseConnection } from './orm/sequelize/init';

sequilizeDatabaseConnection();

connectionSockets();
