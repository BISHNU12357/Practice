import express from "express"
import mongoose from "mongoose"
import { z } from zod;

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

const patientSchema = new mongoose.schema( {
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
        type: string,
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

const validation = ( ) =>{

}

db();
app.use( express.json() );

app.get( '/', ( req, res ) => {

} )

app.listen( port, () => {
    console.log( `listening in ${ port }` );
} )