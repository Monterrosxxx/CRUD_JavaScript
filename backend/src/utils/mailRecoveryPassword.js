import nodemailer from "nodemailer";
import {config} from "../config.js";

//Configurar el transportador => ¿quien lo envia?
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user:config.emailUser.user,
        pass:config.emailUser.pass
    },
})

//¿A quien le voy a mandar el correo?
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: '"soporte EPA" <rjmj.007.009@gmail.com>',
            to,
            subject,
            text,
            html
        })

        return info;
    } catch (error) {
        console.log("Este es el error w: "+ error);
    }
};

//ULTIMO PASO: -> Generar el html a enviar

const HTMLrecoveryEmail = (code) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de Contraseña EPA</title>
        <style>
            body {
                background-color: #f7f7f7;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            h1 {
                color: #003366; /* Azul EPA */
                text-align: center;
                margin-bottom: 20px;
            }
            p {
                color: #333;
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 10px;
            }
            .code-container {
                text-align: center;
                margin-top: 30px;
            }
            .code {
                font-size: 24px;
                font-weight: bold;
                color: #FFA500; /* Amarillo EPA */
                padding: 10px 20px;
                border: 2px solid #FFA500;
                border-radius: 5px;
                display: inline-block;
                background-color: #FFF;
            }
            .warning {
                font-size: 14px;
                color: #FF0000;
                margin-top: 20px;
                text-align: center;
                font-weight: bold;
            }
            .link-container {
                text-align: center;
                margin-top: 20px;
            }
            .reset-link {
                display: inline-block;
                padding: 10px 20px;
                background-color: #003366; /* Azul EPA */
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
            .reset-link:hover {
                background-color: #002244; /* Más oscuro al pasar el mouse */
            }

            @media screen and (max-width: 600px) {
                .container {
                    padding: 15px;
                }
                .code {
                    font-size: 20px;
                    padding: 8px 15px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Recuperación de Contraseña</h1>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta de Ferretería EPA. Por favor, utiliza el siguiente código para continuar con el proceso:</p>
            <div class="code-container">
                <span class="code">${code}</span>
            </div>
            <p class="warning">
                <strong>Si no realizaste esta solicitud, por favor, ignora este correo electrónico.</strong> Tu contraseña permanecerá segura.
            </p>
            <div class="link-container">
                 <a href="#" class="reset-link">Restablecer Contraseña</a>
            </div>
            <p>
               Si el enlace de arriba no funciona, puedes copiar el código y pegarlo en el siguiente link: [Insertar link de la página de restablecimiento de contraseña]
            </p>

        </div>
    </body>
    </html>
    `;
}

export {sendEmail, HTMLrecoveryEmail};