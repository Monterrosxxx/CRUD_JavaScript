import dotenv from 'dotenv';

//Se ejecuta la libreria dotenv

dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI
    },
    server: {
        PORT: process.env.PORT
    },
    JWT: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES
    },
    admin: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    },
    emailUser: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    },
    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        cloudinary_api_key: process.env.API_KEY,
        cloudinary_api_secret: process.env.API_SECRET
    }
};