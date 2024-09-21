import { Transaction } from "../models/transfer.js";
import { Account } from "../models/account.js"; // Modelo de cuenta bancaria
import { sequelize } from "../database/database.js"; // Conexión a la base de datos
import transactionAudit from "../models/transactionAudit.js";
import { Op } from "sequelize"; // Importa Op desde sequelize

export const transferFunds = async (req, res) => {
  const { toAccount, amount } = req.body;
  const ipAddress = req.ip;
  const transaction = await sequelize.transaction(); // Iniciar una transacción

  try {
    // Verificar si las cuentas existen
    const fromAccount = await Account.findOne({
      where: { documento: req.user.documento }, // Usa el documento del usuario autenticado
    });

    if (!fromAccount) {
      if (!transaction.finished) await transaction.rollback();
      return res.status(400).json({ message: "Cuenta origen no existe" });
    }

    const destinationAccount = await Account.findOne({
      where: { accountNumber: toAccount },
    });

    if (!destinationAccount) {
      if (!transaction.finished) await transaction.rollback();
      return res.status(400).json({ message: "Cuenta destino no existe" });
    }

    if (fromAccount.accountNumber === destinationAccount.accountNumber) {
      if (!transaction.finished) await transaction.rollback();
      return res
        .status(400)
        .json({ message: "No se puede transferir fondos a la misma cuenta" });
    }

    if (!(amount > 0 && amount < 1000000)) {
      if (!transaction.finished) await transaction.rollback();
      return res.status(400).json({
        message: "Transferencia debe ser mayor a cero y menor a 1000000",
      });
    }

    // Verificar si el saldo es suficiente
    if (fromAccount.balance < amount) {
      if (!transaction.finished) await transaction.rollback();
      return res
        .status(400)
        .json({ message: "Fondos insuficientes en la cuenta origen" });
    }

    // Deducir el monto de la cuenta origen
    const valorResta = parseFloat(fromAccount.balance) - parseFloat(amount);
    fromAccount.balance = valorResta; // Actualizar el balance
    await fromAccount.save({ transaction });

    // Aumentar el monto en la cuenta destino
    const valorSuma =
      parseFloat(destinationAccount.balance) + parseFloat(amount);
    destinationAccount.balance = valorSuma; // Actualizar el balance
    await destinationAccount.save({ transaction });

    // Crear la transacción bancaria
    await Transaction.create(
      {
        fromAccount: fromAccount.accountNumber, // Solo pasamos el número de cuenta
        toAccount,
        typeTransaction: "TRANSFER",
        amount,
        status: "COMPLETED",
        ipAddress: ipAddress,
      },
      { transaction }
    );

    // Confirmar la transacción
    await transaction.commit();

    return res.status(200).json({ message: "Transferencia exitosa" });
  } catch (error) {
    // En caso de error, revertir la transacción si aún no ha sido finalizada
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.error("Error en la transferencia de fondos:", error);
    return res
      .status(500)
      .json({ message: "Error al realizar la transferencia", error }, false);
  }
};

export const DepositFunds = async (req, res) => {
  const { amount } = req.body;
  const ipAddress = req.ip;

  const transaction = await sequelize.transaction(); // Iniciar una transacción

  try {
    // Verificar si la cuenta existe
    const destinationAccount = await Account.findOne({
      where: { documento: req.user.documento }, // Usa el documento del usuario autenticado
    });

    if (!destinationAccount) {
      await transaction.rollback();
      return res.status(400).json({ message: "La cuentas no existe" });
    }

    if (!(amount > 0 && amount < 1000000)) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ message: "Deposito debe ser mayor a cero y menor a 1000000" });
    }

    // Aumentar el monto en la cuenta destino
    const valorSuma =
      parseFloat(destinationAccount.balance) + parseFloat(amount);
    parseFloat((destinationAccount.balance = valorSuma));

    await destinationAccount.save({ transaction: transaction });

    // Crear la transacción bancaria
    await Transaction.create(
      {
        toAccount: destinationAccount.accountNumber,
        typeTransaction: "DEPOSIT",
        amount,
        status: "COMPLETED",
      },
      {
        ipAddress,
        transaction: transaction,
      }
    );

    // Confirmar la transacción
    await transaction.commit();

    return res.status(200).json({ message: "Deposito completado con éxito" });
  } catch (error) {
    // En caso de error, revertir la transacción
    await transaction.rollback();
    console.error("Error en el deposito de fondos:", error);
    return res
      .status(500)
      .json({ message: "Error al realizar el deposito", error });
  }
};

export const RetreatFunds = async (req, res) => {
  const { amount } = req.body;
  const ipAddress = req.ip;

  const transaction = await sequelize.transaction(); // Iniciar una transacción

  try {
    // Verificar si la cuenta existe
    const sourceAccount = await Account.findOne({
      where: { documento: req.user.documento },
    });

    if (!sourceAccount) {
      await transaction.rollback();
      return res.status(400).json({ message: "La cuentas no existe" });
    }

    // Verificar si el saldo es suficiente
    if (sourceAccount.balance < amount) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ message: "Fondos insuficientes para el retiro" });
    }

    if (!(amount > 0 && amount < 1000000)) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ message: "Retiro debe ser mayor a cero y menor a 1000000" });
    }

    // Deducir el monto de la cuenta origen
    const valorResta = parseFloat(sourceAccount.balance) - parseFloat(amount);
    parseFloat((sourceAccount.balance = valorResta));
    await sourceAccount.save({ transaction: transaction });

    // Crear la transacción bancaria
    await Transaction.create(
      {
        fromAccount: sourceAccount.accountNumber,
        typeTransaction: "RETREAT",
        amount,
        status: "COMPLETED",
      },
      {
        ipAddress,
        transaction: transaction,
      }
    );

    // Confirmar la transacción
    await transaction.commit();

    return res
      .status(200)
      .json({ message: "Retiro completado con éxito, monto: ", amount });
  } catch (error) {
    // En caso de error, revertir la transacción
    await transaction.rollback();
    console.error("Error en el retiro de fondos:", error);
    return res
      .status(500)
      .json({ message: "Error al realizar el retiro", error });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const userDocument = req.user.documento;

    // Encontrar todas las cuentas relacionadas con el usuario
    const accounts = await Account.findAll({
      where: { documento: userDocument },
    });

    // Obtener los números de cuenta del usuario
    const accountNumbers = accounts.map((account) => account.accountNumber);
    console.log(accountNumbers);

    // Buscar todas las transacciones relacionadas con las cuentas del usuario
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [
          { fromAccount: accountNumbers },
          { toAccount: accountNumbers },
        ],
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error al obtener transacciones: ", error);
    return res
      .status(500)
      .json({ message: "Error al obtener transacciones del usuario" });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    // Buscar todas las transacciones
    const transactions = await Transaction.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error al obtener transacciones: ", error);
    return res
      .status(500)
      .json({ message: "Error al obtener transacciones de la aplicacion" });
  }
};
