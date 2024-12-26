import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

/*
* @author
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

class Database {
  static instance;

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Sequelize(
        process.env.MYSQL_DATABASE,
        process.env.MYSQL_USER,
        process.env.MYSQL_PASSWORD, {
          host: process.env.MYSQL_HOST,
          dialect: 'mysql',
          dialectOptions: {
              charset: 'utf8mb4',
          },
          port: process.env.MYSQL_PORT,
          logging: false
        }
      );
    }
    return Database.instance;
  }
}

(async () => {
  try {
    const sequelize = Database.getInstance();
    await sequelize.authenticate();
    // console.log('Connection successfully established with the database.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();

export default Database.getInstance();
