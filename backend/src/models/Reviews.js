/*Reviews
Rating 
Comments
IdCliente
*/

import { Schema, model } from "mongoose";

const reviewsSchema = new Schema(
    {
        comments:{
            type: String,
        },

        rating:{
            type: String,
            max: 5
        },

        idClient: {
            type: Schema.Types.ObjectId,
            requiere: true
        }
    },
    {
        timestamps: true,
        strict: false
    }	
)
export default model("review", reviewsSchema)