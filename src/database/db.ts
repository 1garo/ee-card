import Sequelize from 'sequelize';
import db from '../configs/database';

class Database {
  public connection: Sequelize.Sequelize;
  private URI: string; 

  constructor() {
    this.init();
  }

  init(): void {
    this.URI = `${db.dialect}://${db.username}:${db.password}:${db.port}@${db.host}/${db.database}`
    this.connection = new Sequelize.Sequelize(this.URI);
  }
}

const database: Database = new Database();

export default database;