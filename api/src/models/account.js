import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import user from "./users.js";

export const Account = sequelize.define(
  "Account",
  {
    accountNumber: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    documento: {
      type: DataTypes.STRING(30),
      allowNull: false,
      References: {
        model: "users",
        key: "documentoUser",
      },
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 1000000.0, // Saldo inicial de $1,000,000
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "accounts",
  }
);
Account.belongsTo(user, {foreignKey: "documento"});
user.hasMany(Account, {foreignKey: "documento"});

export default sequelize.model("Account", Account);
