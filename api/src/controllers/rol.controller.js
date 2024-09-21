import { where } from "sequelize";
import rolUser from "../models/UserRol.js";

export const getUsersRols = async (req, res) => {
  try {
    // Obtener los datos del usuario según el documento
    const userRols = await rolUser.findAll();

    if (!userRols) {
      return res.status(404).json({ message: "No hay usuarios con roles" });
    }

    return res.status(200).json(userRols);
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener los datos del usuario", error });
  }
};

export const getRol = async (req, res) => {
  try {
    const documento = req.user.documento;

    const rol = await rolUser.findOne({
      where: { documento: documento },
    });

    if (!rol) {
      return res.status(404).json({ message: "No existe el usuario con rol" });
    }

    return res.status(200).json(rol);
  } catch (error) {
    console.error("Error al obtener el rol del usuario:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener el rol del usuario", error });
  }
};
