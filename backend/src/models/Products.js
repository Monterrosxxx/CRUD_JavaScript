/*
Campos:
    nombre
    descripcion
    precio
    cantidad
*/

import { Schema, model } from "mongoose";

const productsShcema = new Schema(
    {
        name:{
            type: String,
            requiere: true
        },

        description:{
            type: String
        },

        price: {
            type: Number,
            requiere: true,
            min: 0
        },

        stock: {
            type: Number,
            requiere: true,
            min: 0
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("product", productsShcema)