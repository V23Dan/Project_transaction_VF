import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const rol = sequelize.define(
  "rol",
  {
    idRol: {
      type: DataTypes.INTEGER(4),
      primaryKey: true,
      autoIncrement: true,
    },
    nameRol: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default sequelize.model("rol", rol);
