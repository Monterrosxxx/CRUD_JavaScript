/*
Employees:
  name
  lastName
  birthday (esto es de tipo Date o lo puden poner como String)
  email
  address
  hireDate (esto es de tipo Date o lo puden poner como String)
  password
  telephone
  dui
  isssNumber
  isVerified (esto es booleano)
  */

import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
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

        address:{
            type: String,
            requiere: true
        },

        hireDate:{
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

        isssNumber:{
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

export default model("employee", employeeSchema)