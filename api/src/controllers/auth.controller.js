import { user } from "../models/users.js";
import jwt from "jsonwebtoken";
import { createAccountForUser } from "./account.controller.js";
import { sequelize } from "../database/database.js";
import Rol from "../models/Rol.js";
import rolUser from "../models/UserRol.js";

const secretKey = "your_secret_key";

export const getUser = async (req, res) => {
  try {
    // Obtener el ID del usuario desde el token decodificado (almacenado en req.user por el middleware verifyToken)
    const userId = req.user.id;

    // Buscar al usuario en la base de datos usando su ID
    const userData = await user.findByPk(userId, {
      attributes: { exclude: ["pass"] }, // Excluir la contraseña de la respuesta
    });

    // Verificar si el usuario fue encontrado
    if (!userData) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Devolver los datos del usuario
    return res.status(200).json(userData);
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener los datos del usuario:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener los datos del usuario", error });
  }
};

export const creandoUsers = async (req, res) => {
  try {
    const { nombre, documento, edad, sexo, direccion, correo, pass } = req.body;
    //Verificar si es el primer usuario registrado

    const usuariosExistentes = await user.count();
    let rolId;

    if (usuariosExistentes === 0) {
      // Primer usuario registrado: asignar rol de Administrador
      const rolAdmin = await Rol.findOne({
        where: { nameRol: "Administrador" },
      });
      rolUser.nameRol = rolAdmin.nameRol;
      rolId = rolAdmin.idRol;
    } else {
      // Usuarios subsecuentes: asignar rol de Usuario
      const rolUsuario = await Rol.findOne({ where: { nameRol: "Usuario" } });
      rolUser.nameRol = rolUsuario.nameRol;
      rolId = rolUsuario.idRol;
    }

    const newUser = await user.create({
      nombre,
      documento,
      edad,
      sexo,
      direccion,
      correo,
      pass,
    });

    await rolUser.create({
      idRol: rolId,
      nameRol: rolUser.nameRol,
      nombre: newUser.nombre,
      documento: newUser.documento,
      ingreso: "REGISTRO",
    });

    if (rolUser.nameRol === "Usuario") {
      await createAccountForUser(newUser.id, documento);
    }

    console.log("Usuario registrado con exito");
    return res.send(true);
  } catch (error) {
    return res.send(false);
  }
};

export const adminRegisterUsers = async (req, res) => {
  try {
    const { nombre, documento, edad, sexo, direccion, correo, pass, rol } =
      req.body;

    let rolId;

    if (rol === "Administrador") {
      //Asignar rol de Administrador
      const rolAdmin = await Rol.findOne({
        where: { nameRol: "Administrador" },
      });
      rolUser.nameRol = rolAdmin.nameRol;
      rolId = rolAdmin.idRol;
    } else {
      // Asignar rol de Usuario
      const rolUsuario = await Rol.findOne({ where: { nameRol: "Usuario" } });
      rolUser.nameRol = rolUsuario.nameRol;
      rolId = rolUsuario.idRol;
    }

    const newUser = await user.create({
      nombre,
      documento,
      edad,
      sexo,
      direccion,
      correo,
      pass,
    });

    await rolUser.create({
      idRol: rolId,
      nameRol: rolUser.nameRol,
      nombre: newUser.nombre,
      documento: newUser.documento,
      ingreso: "ADMIN REGISTER",
    });

    if (rolUser.nameRol === "Usuario") {
      await createAccountForUser(newUser.id, documento);
    }

    console.log("Usuario registrado con exito");
    return res.send(true);
  } catch (error) {
    return res.send(false);
  }
};

export const login = async (req, res) => {
  const { documento, pass } = req.body;

  try {
    // Buscar al usuario en la base de datos usando el documento
    const existingUser = await user.findOne({ where: { documento } });

    // Verificar si el usuario existe
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Documento o contraseña incorrectos" });
    }

    if (pass !== existingUser.pass) {
      return res
        .status(400)
        .json({ message: "Documento o contraseña incorrectos" });
    }

    const inforUser = {
      id: existingUser.id,
      documento: existingUser.documento,
    };

    const token = jwt.sign(inforUser, secretKey, { expiresIn: "1d" });

    res.cookie("authToken", token, {
      httpOnly: true, // Solo accesible desde el servidor, no desde JavaScript del navegador
      secure: false, // Cambia a true en producción con HTTPS
      sameSite: "lax", // Evita ataques CSRF, asegúrate de que esté configurado según tus necesidades
      maxAge: 24 * 60 * 60 * 1000, // Expira en 1 día
    });

    return res.json({ token });
  } catch (error) {
    // Manejo de errores
    console.error("Error during login:", error);
    return res.send(false);
  }
};

export const logout = (req, res) => {
  res.clearCookie("authToken"); // Eliminar la cookie 'authToken'
  res.status(200).json({ message: "Logout exitoso" });
};

export const isLogin = (req, res) => {
  const token = req.cookies.authToken; // Obtener el token de las cookies

  if (!token) {
    console.log("No se recibió token, usuario no autenticado");
    return res.status(401).json({ message: "Usuario no autenticado" });
  } else {
    console.log("Usuario autenticado");
    return res.status(200).json({ message: "Usuario autenticado" });
  }
};
