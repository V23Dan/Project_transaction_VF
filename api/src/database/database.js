import Sequelize from "sequelize";

export const sequelize = new Sequelize("bank", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});
