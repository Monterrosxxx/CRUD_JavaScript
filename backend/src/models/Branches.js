/*
Branches
  name
  address
  telephone
  schedule
*/

import { Schema, model } from "mongoose";

const branchesSchema = new Schema(
    {
        name:{
            type: String,
            requiere: true
        },

        address:{
            type: String,
            requiere: true
        },

        telephone: {
            type: String,
            requiere: true
        },

        schedule: {
            type: String,
            requiere: true
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("branch", branchesSchema)