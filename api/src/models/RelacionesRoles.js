import rol from "../models/Rol.js";
import rolUser from "../models/UserRol.js";
import user from "../models/users.js";

//Relación entre Rol y UserRol
rol.hasMany(rolUser);
rolUser.belongsTo(rol);

//Relación entre User y UserRol
rolUser.hasMany(user);
user.belongsTo(rolUser);
