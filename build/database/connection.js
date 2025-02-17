"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Configurações de acesso ao banco de dados
const sequelize = new sequelize_1.Sequelize({
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
exports.default = sequelize;
