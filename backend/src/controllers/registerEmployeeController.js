import employeeModel from "../models/Employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

//Se crea un array de funciones
const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
    //Se pide los campos que se van a registrar
    const {name,
        lastName,
        email,
        address,
        password,
        hireDate,
        telephone,
        dui,
        isVerified,
        isssNumber
    } = req.body;

    try {

        //Se verifica si el empleado ya existe
        const employeeExist = await employeeModel.findOne({email});
        if(employeeExist){
            return res.json({message: "Employee already exists"});
        }

        //Encriptar la contraseña                         
        const passwordHash = await bcryptjs.hash(password, 10);

        //Se guarda el empleado
        const newEmployee = new employeeModel({
            name,
            lastName,
            email,
            address,
            password: passwordHash,
            hireDate,
            telephone,
            dui,
            isVerified,
            isssNumber
        });

        await newEmployee.save();

        //TOKEN

        jsonwebtoken.sign(
            //1- Que se va a guardar 
            {id: newEmployee._id},
            //2- Palabra secreta
            config.JWT.secret,
            //3- Expiración
            {expiresIn: config.JWT.expires},
            //4- función flecha
            (error, token) => {
                if(error) console.log("error");

                res.cookie("authToken", token)
                res.json({message: "Employee created successfully"})                
            }

        )

    } catch (error) {
        console.log("este es el error:" + error)
        res.json({message: "Error"})
    }

}

export default registerEmployeeController;