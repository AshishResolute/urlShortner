import { app } from "./src/routes/app.js";
import dotenv from 'dotenv';

dotenv.config();


const PORT = process.env.SERVER_PORT

app.listen(PORT,()=>{
    console.log(`Server running at PORT: ${PORT}`)
})