import { Sequelize } from 'sequelize';

// Configurações de acesso ao banco de dados
const sequelize = new Sequelize({
  dialect: 'mysql',         
  host: process.env.DB_HOST || 'localhost',        
  port: 3306,               
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,     
  database: process.env.DB_DATABASE || 'databaseAPI', 
  logging: false,           
  define: {
    timestamps: true,       
  },
});

export default sequelize;
