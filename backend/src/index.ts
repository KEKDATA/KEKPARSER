import redis from 'redis';

import { connectionSockets } from './socket';
import { sequilizeDatabaseConnection } from './orm/sequelize/init';

redis.createClient();

sequilizeDatabaseConnection();

connectionSockets();
