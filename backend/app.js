import express from 'express';
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from './src/routes/clients.js';
import employeesRoutes from './src/routes/employee.js';
import brancheesRouter from './src/routes/branch.js';
import reviewsRouter from './src/routes/reviews.js';
import registerEmployeesRouter from "./src/routes/registerEmployee.js";
import loginRouter from "./src/routes/login.js";
import logoutRouter from "./src/routes/logout.js";
import registerClientsRouter from "./src/routes/registerClients.js";
import recoveryPasswordRouter from "./src/routes/recoveryPassword.js";
import providers from "./src/routes/providers.js";
import brand from "./src/routes/brand.js";

import cookieParser from "cookie-parser";

import { validateAuthToken } from './src/middlewares/validateAuthToken.js';

import cors from "cors"


const app = express();

app.use(
    cors({
      origin: "http://localhost:5173",
      // Permitir envío de cookies y credenciales
      credentials: true
    })
  );

//middleware para aceptar datos desde postman
app.use(express.json());
//Para que postman guarde el token en una variable            
app.use(cookieParser());

app.use("/api/products", productsRoutes)
app.use("/api/clients", clientsRoutes)
app.use("/api/employees", validateAuthToken(["admin", "employee"]), employeesRoutes)
app.use("/api/branches", brancheesRouter)
app.use("/api/reviews", reviewsRouter)

app.use("/api/registerEmployee", validateAuthToken(["admin"]), registerEmployeesRouter)

app.use("/api/login", loginRouter)

app.use("/api/logout", logoutRouter)

app.use("/api/registerClients", registerClientsRouter)

app.use("/api/recoveryPassword", recoveryPasswordRouter)

app.use("/api/providers", validateAuthToken(["admin", "employee"]), providers)

app.use("/api/brand", brand)

export default app;