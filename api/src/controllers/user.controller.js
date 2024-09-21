import user from "../models/users.js";
import Account from "../models/account.js";

// Controlador para obtener los datos del usuario
export const getUserData = async (req, res) => {
  try {
    const userDocument = req.user.documento; // Documento del usuario guardado en el token

    // Obtener los datos del usuario según el documento
    const userData = await user.findOne({
      where: { documento: userDocument },
      attributes: { exclude: ["pass"] }, // Excluir la contraseña por seguridad
    });

    if (!userData) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener los datos del usuario", error });
  }
};

// Controlador para obtener los datos de la cuenta
export const getAccountData = async (req, res) => {
  try {
    const userDocument = req.user.documento; // Documento del usuario guardado en el token

    // Obtener los datos de la cuenta según el documento del usuario
    const accountData = await Account.findOne({
      where: { documento: userDocument },
    });

    if (!accountData) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }

    return res.status(200).json(accountData);
  } catch (error) {
    console.error("Error al obtener los datos de la cuenta:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener los datos de la cuenta", error });
  }
};
