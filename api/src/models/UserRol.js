import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const rolUser = sequelize.define(
  "rolUser",
  {
    nameRol: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    ingreso: {
      type: DataTypes.STRING(20),
      allowNull: false,
    }
  },
  {
    timestamps: true,
  }
);

export default sequelize.model("rolUser", rolUser);
