import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js"; // Asumiendo que tienes un archivo de configuración para la conexión
import user from "./users.js";
import Account from "./account.js";
import { TransactionAudit } from "./transactionAudit.js";

export const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      defaultValue: "PENDING",
    },
  },
  {
    timestamps: true,
    tableName: "transactions",
  }
);

Transaction.belongsTo(Account, { foreignKey: "accountNumber" });
Account.hasMany(Transaction, { foreignKey: "accountNumber" });

Transaction.afterCreate(async (transaction, options) => {
  try {
    await TransactionAudit.create({
      transactionId: transaction.id,
      typeTransaction: transaction.typeTransaction,
      fromAccount: transaction.fromAccount,
      toAccount: transaction.toAccount,
      amount: transaction.amount,
      status: transaction.status,
      ipAddress: options.ipAddress || "Unknown",
    });
  } catch (error) {
    console.error("Error creating transaction audit log:", error);
  }
});

Transaction.afterUpdate(async (transaction, options) => {
  try {
    await TransactionAudit.create({
      transactionId: transaction.id,
      typeTransaction: transaction.typeTransaction,
      fromAccount: transaction.fromAccount,
      toAccount: transaction.toAccount,
      amount: transaction.amount,
      status: transaction.status,
      ipAddress: options.ipAddress || "Unknown",
    });
  } catch (error) {
    console.error("Error creating transaction audit log:", error);
  }
});

export default sequelize.model("Transaction", Transaction);
