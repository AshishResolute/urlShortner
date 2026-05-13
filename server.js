import { app } from "./src/routes/app.js";
import path from 'path'
import dotenv from 'dotenv';

dotenv.config({path:process.env.NODE_ENV==='test'?path.join(import.meta.dirname,'./.env.test'):path.join(import.meta.dirname,'./.env')});


const PORT = process.env.SERVER_PORT

app.listen(PORT,()=>{
    console.log(`Server running at PORT: ${PORT}`)
})