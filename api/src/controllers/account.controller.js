import { Account } from "../models/account.js";
import { user } from "../models/users.js";
import account from "../models/account.js";

export const createAccountForUser = async (userId, documento) => {
  try {
    let isUnique = false;
    let accountNumber;

    while (!isUnique) {
        accountNumber = generateAccountNumber();
        const existingAccount = await Account.findOne({ where: { accountNumber } });
        
        if (!existingAccount) {
            isUnique = true;
        }
    }
    const newAccount = await Account.create({
      accountNumber,
      documento,
      balance: 1000000,
    });

    console.log(`Cuenta creada para el usuario con documento: ${documento}`);
    return newAccount;
  } catch (error) {
    console.error("Error al crear la cuenta del usuario:", error);
    throw new Error("No se pudo crear la cuenta del usuario");
  }
};

function generateAccountNumber() {
  const accountNumber = Math.floor(Math.random() * 1000000000000); // Genera un número de 12 dígitos
  return accountNumber.toString().padStart(12, '0'); // Asegura que tenga 12 dígitos
}

export const getAllAccounts = async (req, res) => {
  try {
    // Buscar todas las transacciones
    const accounts = await account.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(accounts);
  } catch (error) {
    console.error("Error al obtener transacciones: ", error);
    return res
      .status(500)
      .json({ message: "Error al obtener transacciones de la aplicacion" });
  }
};