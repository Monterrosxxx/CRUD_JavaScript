import express from 'express';
import productsRoutes from "./src/routes/products.js"
import clientsRoutes from './src/routes/clients.js';
import employeesRoutes from './src/routes/employee.js';
import brancheesRouter from './src/routes/branch.js';

const app = express();

//middleware para aceptar datos desde postman
app.use(express.json());

app.use("/api/products", productsRoutes)
app.use("/api/clients", clientsRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/branches", brancheesRouter)

export default app;