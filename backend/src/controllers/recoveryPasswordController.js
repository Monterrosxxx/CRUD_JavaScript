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

//Verificar codigo  
recoveryPasswordController.verifiedCode = async (req,res) => {
    const {code} = req.body;

    try {
        //Obtener el token
        const token = req.cookies.tokenRecoveryCode;

        //Extraer el codigo del token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        //Comparar 1 el codigo que el usuario escribe
        //con el codigo que tengo guardado en el token
        if(decoded.code !== code){
            return res.json({message: "Invalid code"})
        }

        const newToken = jsonwebtoken.sign(
            //1- ¿Que se va a guardar?
            {
                email: decoded.email,
                code: decoded.code,
                userType: decoded.userType,
                verified: true
            },
            //2- Secret key
            config.JWT.secret,
            //3- ¿Cuando expira?
            {expiresIn: "20m"}
        )

        res.cookie("tokenRecoveryCode", newToken, {maxAge: 20*60*1000});

        res.json({message: "Code verified succesfully"})
    } catch (error) {
        console.log("error" + error);
    }
}

export default recoveryPasswordController;