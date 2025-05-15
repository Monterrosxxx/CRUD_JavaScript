/*
   Colection name: Providers

    Fields:
   name 
   telephone
   image
*/

import {Schema, model} from 'mongoose';

const providerSchema = new Schema(
    {
        name: {
            type: String,
        },
        telephone: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("Providers", providerSchema);