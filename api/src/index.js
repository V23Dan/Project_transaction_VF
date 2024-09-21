import app from "./app.js";
import { sequelize } from "./database/database.js";
import user from "./models/users.js";
import account from "./models/account.js";
import transfer from "./models/transfer.js";
import Rol from "./models/Rol.js";
import rolUser from "./models/UserRol.js";
import "./models/RelacionesRoles.js";
import transactionAudit from "./models/transactionAudit.js";

async function main() {
  try {
    await sequelize.sync();
    app.listen(3000);
    console.log("Server en puerto", 3000);
    const roles = await Rol.findAll();
    if (roles.length === 0) {
      // Solo crear si no existen roles
      await Rol.bulkCreate([
        { nameRol: "Administrador" },
        { nameRol: "Usuario" },
      ]);
      console.log("Roles por defecto creados: Administrador y Usuario");
    }
  } catch (error) {
    console.log("No se establecio conexion", error);
  }
}

main();
