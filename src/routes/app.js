import express from 'express';
import prisma from '../config/prisma.js'
import auth from '../routes/auth.js'
const app = express();

app.use(express.json());

app.get('/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message:`Services Running Well!`,
        Timestamp:new Date().toLocaleString()
    })
})


app.use('/',auth)


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500
    const ErrorMessage={
        message:err.message||`Internal Server Error`,
        timeStamp:new Date().toLocaleString(),
        internalCode:err.internalCode||err.message
    }
    res.status(statusCode).json(ErrorMessage)
})

export {app}