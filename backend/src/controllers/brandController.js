/*
   Collection name: Brand
    name
    year    
    slogan
    image

    (all is type: String only) 
*/

import brandModel from "../models/Brand.js";
import { v2 as cloudinary } from "cloudinary";

import { config } from "../config.js";

//En el controlador, siempre se tiene que configurar
//Cloudinary primero

cloudinary.config({ 
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

//Array de funciones vacios

const brandController = {};

//SELECT

brandController.getAll = async (req, res) => {
    const brands = await brandModel.find();
    res.json(brands);
}

//INSERT

brandController.insertBrand = async (req, res) => {
    const { name, year, slogan } = req.body;
    let imageURL = "";

    //Subir la imagen a cloudinary
    if (req.file) {
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["jpg", "png", "jpeg"],
            }
        );
        imageURL = result.secure_url;
    }

    //Guardar el registro en la base de datos

    const newBrand = new brandModel({
        name,
        year,
        slogan,
        image: imageURL,
    });

    newBrand.save();
};

export default brandController;