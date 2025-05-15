/*
    Collection name: Brand
    name
    year    
    slogan
    image

    (all is type: String only) 
*/

import { Schema, model } from "mongoose";

const brandSchema = new Schema(
    {
        name: {
            type: String
        },
        year: {
            type: String
        },
        slogan: {
            type: String
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("brand", brandSchema)