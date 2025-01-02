import { response } from 'express'
import mongoose from 'mongoose'

export const mongodb = async()=>{
    try{
    await mongoose.connect("mongodb://localhost:27017/i_notebook")
    console.log("database up and running")
    }
    catch(e){
        console.log("error",e)
    }
}
