import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Clients from "../models/Clients.js";
import { config } from "../config.js";

const registerClientsController = {};

registerClientsController.register = async (req, res) => {
    const { 
        name, 
        lastName, 
        birthday, 
        email, 
        password, 
        telephone, 
        dui 
    } = req.body;

    try {
        const clientExists = await Clients.findOne({email});
        if(clientExists){
            return res.json({message: "Client already exists"});
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newClient = new Clients({
            name,
            lastName,
            birthday,
            email,
            password: passwordHash,
            telephone,
            dui: dui || null,
            isVerified: false 
        });

        await newClient.save();

        const verificationCode = crypto.randomBytes(3).toString("hex");

        const tokenCode = jsonwebtoken.sign(
            { email, verificationCode },
            config.JWT.secret,
            { expiresIn: config.JWT.expires }
        );

        res.cookie("VerificationToken", tokenCode, {maxAge: 2 * 60 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.emailUser.user,
                pass: config.emailUser.pass
            }
        });

        const mailOptions = {
            from: config.emailUser.user,
            to: email,
            subject: "Código de verificación",
            html: `
                <div style="background-color: #f6f6f6; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <h1 style="color: #333333; font-family: Arial, sans-serif; text-align: center; margin-bottom: 20px;">¡Bienvenido!</h1>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <p style="color: #666666; font-family: Arial, sans-serif; font-size: 16px; margin-bottom: 15px;">
                                Tu código de verificación es:
                            </p>
                            <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 10px 0;">
                                <span style="font-family: 'Courier New', monospace; font-size: 24px; font-weight: bold; color: #333333;">
                                    ${verificationCode}
                                </span>
                            </div>
                        </div>
                        
                        <p style="color: #666666; font-family: Arial, sans-serif; font-size: 14px; text-align: center;">
                            Por favor, usa este código para verificar tu cuenta.
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({message: "Client registered successfully, please check your email to verify your account"});

    } catch (error) {
        console.log("Error al registrar el cliente: " + error);
        res.json({message: "Error: " + error});
    }
};

registerClientsController.verifyCode = async (req, res) => {
    const {verificationCodeRequest} = req.body;

    try {
        const token = req.cookies.VerificationToken;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {email, verificationCode} = decoded;

        if(verificationCodeRequest !== verificationCode){
            return res.json({message: "Invalid code"});
        }

        const client = await Clients.findOne({email});
        client.isVerified = true;
        await client.save();

        res.clearCookie("VerificationToken");
        res.json({message: "Email verified successfully"});
    } catch (error) {
        console.log("Error en la verificación: " + error);
        res.json({message: "Error: " + error});
    }
};

export default registerClientsController;