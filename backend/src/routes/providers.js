import express from 'express';
import providersController from "../controllers/providersController.js";
import multer from "multer";

const router = express.Router();

/*Configurar una carpeta en local que guarde
el refgistro de las imagenes subidas*/

const upload = multer({dest: "public/"});

router.route("/")
    .get(providersController.getAll)
    .post(upload.single("image"), providersController.insertProviders);
   
export default router;