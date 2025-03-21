import dotenv from 'dotenv';

//Se ejecuta la libreria dotenv

dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI
    },
    server: {
        PORT: process.env.PORT
    }
};