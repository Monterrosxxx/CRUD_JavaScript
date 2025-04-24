import jsonwebtoken from "jsonwebtoken";
import bycryptjs from "bcryptjs";

import clientsModel from "../models/Clients.js";
import employeesModel from "../models/Employee.js";

import { sendEmail, HTMLrecoveryEmail } from "../utils/mailRecoveryPassword.js";
import { config } from "../config.js";

//1. Array de funciones

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
    const { email } = req.body;

    try {

        let userFound;
        let userType;

        //Verificar si el correo existe

        userFound = await clientsModel.findOne({email});
        if(userFound){
            userType = "client";
        }else{
            userFound = await employeesModel.findOne({email});
            if(userFound){
                userType = "employee";
            }
        }

        if(!userFound){
            return res.status(404).json({message: "User not found"});
        }

        //Generar un codigo aleatorio (el que vamos a mandar)
        const code = Math.floor(10000 + Math.random() * 90000).toString();

        //Guardar todo en el token
        const token = jsonwebtoken.sign(
            //1.¿que voy a guardar?
            {email, code, userType, verified: false},
            //2. Secret key 
            config.JWT.secret,
            //3. Tiempo de expiracion
            {expiresIn: "20m"}
        );

        //Se guarda el token en una cookie
        res.cookie("tokenRecoveryCode", token, {maxAge: 20 * 60 * 1000});

        //ULTIMO PASO - enviar el correo
        await sendEmail(
            email,
            "Recuperación de contraseña",
            `Este es el código de recuperación de contraseña: ${code}`,
            HTMLrecoveryEmail(code)
        );

        res.json({message: "Email sent successfully"});

    } catch (error) {
        console.log("Aqui esta el error al enviar el correo: " + error);
    }
}

export default recoveryPasswordController;