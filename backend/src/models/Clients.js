/*Clientes
  name
  lastName
  birthday
  email
  password
  telephone
  dui
  isVerified (esto es booleano)
  */

import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
    {
        name:{
            type: String,
            requiere: true
        },

        lastName:{
            type: String,
            requiere: true
        },

        birthday:{
            type: String,
            requiere: true
        },

        email:{
            type: String,
            requiere: true
        },

        password:{
            type: String,
            requiere: true
        },

        telephone:{
            type: String,
            requiere: true
        },

        dui:{
            type: String,
            requiere: true
        },

        isVerified:{
            type: Boolean,
            requiere: true
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("client", clientsSchema)