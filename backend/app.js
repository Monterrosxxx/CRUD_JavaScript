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

import cookieParser from "cookie-parser";


const app = express();

//middleware para aceptar datos desde postman
app.use(express.json());
//Para que postman guarde el token en una variable            
app.use(cookieParser());

app.use("/api/products", productsRoutes)
app.use("/api/clients", clientsRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/branches", brancheesRouter)
app.use("/api/reviews", reviewsRouter)

app.use("/api/registerEmployee", registerEmployeesRouter)

app.use("/api/login", loginRouter)

app.use("/api/logout", logoutRouter)

app.use("/api/registerClients", registerClientsRouter)

export default app;