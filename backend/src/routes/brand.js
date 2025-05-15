import express from 'express';
import brandController from "../controllers/brandController.js";
import multer from "multer";
import e from 'express';

const router = express.Router();

/*Configurar una carpeta en local que guarde
el refgistro de las imagenes subidas*/

const upload = multer({dest: "public/"});

router.route("/")
    .get(brandController.getAll)
    .post(upload.single("image"), brandController.insertBrand);

export default router;