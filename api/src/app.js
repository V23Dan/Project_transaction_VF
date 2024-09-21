import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import accountRoutes from "./routes/account.routes.js";
import transferRoutes from "./routes/transfer.routes.js";
import userRoutes from "./routes/user.routes.js";
import rolsRoutes from "./routes/rol.routes.js";
import cookie from "cookie-parser";
import {noCacheMiddleware} from "./middleware/cache.middleware.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:4200", // Reemplaza con tu URL de frontend
  credentials: true, // Permite el envío de cookies y encabezados de autenticación
}; // Habilita CORS para solicitudes OPTIONS (preflight)

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookie());
app.use(noCacheMiddleware);

app.use("/auth", authRoutes);
app.use("/account", accountRoutes);
app.use("/transfer", transferRoutes);
app.use("/users", userRoutes);
app.use("/rols", rolsRoutes);

export default app;
