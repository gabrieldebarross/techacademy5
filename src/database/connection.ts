import { Sequelize } from 'sequelize';

// Configurações de acesso ao banco de dados
const sequelize = new Sequelize({
  dialect: 'mysql',         
  host: 'localhost',        
  port: 3306,               
  username: 'root',
  password: '',     
  database: 'apiprojeto', 
  logging: false,           
  define: {
    timestamps: true,       
  },
});

export default sequelize;
