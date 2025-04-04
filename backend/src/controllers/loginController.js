import bcryptjs from "bcryptjs";
import	jsonwebtoken from "jsonwebtoken";
import clientModel from "../models/Clients.js"
import employeesModel from "../models/Employee.js"
import {config} from "../config.js"

//Array de funciones 
const loginController = {};

loginController.login = async (req, res) => {
    const{email, password} = req.body;

    try {
        

        let userFound; //Almacena el usuario encontrado
        let userType; //Almacena el tipo de usuario

        //Admin, Empleado y Clientes
        if(email === config.admin.email && password === config.admin.password) {
            userType = "admin";
            userFound = {_id: "admin"};
        }else{
            //Empleado
            userFound = await employeesModel.findOne({email});
            userType = "employee";

            //Cliente
            if(!userFound){
                userFound = await clientModel.findOne({email});
                userType = "client";
            }
        }

        //Verifica si el usuario existe
        if(!userFound){
            return res.json({message: "User not found"});
        }

        //Desencripta la contraseña si no es admin
        if(userType !== "admin"){
            const isMatch = bcryptjs.compare(password, userFound.password);
            if(!isMatch){
                return res.json({message: "Invalid password"});
            }
        }

        //TOKEN
        jsonwebtoken.sign(
            //Que es lo que se va a guardar
            {id: userFound._id, userType},
            //Secreto
            config.JWT.secret,
            //Tiempo de expiracion
            {expiresIn: config.JWT.expires},
            //Funcion flecha
            (error, token) => {
                if(error) console.log("error" + error);
                res.cookie("authToken", token);
                res.json({message: "Login success"});
            }
        );
    } catch (error) {
        console.log("Error en el login" + error);
    }
}

export default loginController;