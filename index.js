import express from "express"
import mongoose from "mongoose"
import { z } from "zod";

const app = express();

const port = 3000;

const db = async () => {
    try {
        const ach = await mongoose.connect( "mongodb+srv://bishnuprakashsahoo30_db_user:JSg5FlxEAgl1rXRQ@firstproject.boanbsl.mongodb.net/?appName=FirstProject" )
        if ( ach )
            console.log( "db is connected" );
    } catch ( error ) {
        console.log( "there is a connection error" )
    }
}

const patientSchema = new mongoose.Schema( {
    First_name: {
        type: String,
        required: true,
        trim: true
    },
    Last_name: {
        type: String,
        required: true,
        trim: true
    },
    userName:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
    },
    organs: {
        heart: {
            no: { type: Number },
            isHealthy: { type: Boolean}
        },
        kidney: {
            no: { type: Number },
            isHealthy: { type: Boolean}
        },
        liver: {
            no: { type: Number },
            isHealthy: { type: Boolean}
        }
    }
} )

const patient = mongoose.model("patient", patientSchema);

const organValidation = z.object({
    no: z.number(),
    isHealthy: z.boolean()
})

const userValidation = z.object({
    First_name: z.string().max(20),
    Last_name: z.string().max(10),
    password: z.string()
                .min(8, "The password neeeds to be atleast of 8 characters")
                .regex(/[0-9]/, "password must conatain a number")
                .regex(/[!@#$%^&*]/, "password should contain atleast one special character"),
    organs: z.object({
        heart: organValidation,
        kidney: organValidation,
        liver: organValidation,
    })
})  



db();
app.use( express.json() );

const signUp = async(req, res) => {
    const patientDetails = {
        First_name: req.body.First_name,
        Last_name:req.body.Last_name,
        userName:req.body.userName,
        password:req.body.password,
        age:req.body.age,
        organs:req.body.organs
    }

    const suc = userValidation.safeParse(patientDetails);

    if(!suc.success){
        return res.json({
            message: "vlaidation Failed"
        });
    }


    const newPatient = new patient(patientDetails);
    const saveStatus = await newPatient.save();

    if(saveStatus){
        res.json({
            message: "The details have been saved"
        })
    }else{
        res.json({
            message: "could not save"
        })
    }
}

app.get( '/', ( req, res ) => {
    res.status(200).json({
        message: "This is me"
    })
} )

app.post('/signUp', signUp);

app.listen( port, () => {
    console.log( `listening in ${ port }` );
} )