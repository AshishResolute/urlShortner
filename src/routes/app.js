import express from 'express';
import prisma from '../config/prisma.js'
const app = express();

app.use(express.json());

app.get('/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message:`Services Running Well!`,
        Timestamp:new Date().toLocaleString()
    })
})


export {app}