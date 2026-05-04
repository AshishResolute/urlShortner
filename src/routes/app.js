import express from 'express';

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