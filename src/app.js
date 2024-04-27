import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandle from "./middlewares/errorHandle.js";
import manipulator404 from "./middlewares/manipulator404.js";
import { createRequire } from "module";


const require = createRequire(import.meta.url);
const connection = await dbConnect();
const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            
//     optionSuccessStatus:200
// }

connection.on("error", (erro)=>{
    console.error("Connection error:", erro);
});

connection.once("open", ()=>{
    console.log("DataBase connection successfully!")
})
const app = express();
app.use(cors({origin: "*"}));
routes(app);

app.use(manipulator404);

app.use(errorHandle);

export default app;