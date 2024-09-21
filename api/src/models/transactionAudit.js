import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js"; // Archivo de configuración para la conexión
import Account from "./account.js";

export const TransactionAudit = sequelize.define(
  "TransactionAudit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeTransaction: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    fromAccount: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    toAccount: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "transaction_audits",
  }
);

TransactionAudit.belongsTo(Account, { foreignKey: "fromAccount", targetKey: "accountNumber" });
Account.hasMany(TransactionAudit, { foreignKey: "fromAccount", sourceKey: "accountNumber" });

export default sequelize.model("TransactionAudit", TransactionAudit);
