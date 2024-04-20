import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandle from "./middlewares/errorHandle.js";
import manipulator404 from "./middlewares/manipulator404.js";


const connection = await dbConnect();

connection.on("error", (erro)=>{
    console.error("Connection error:", erro);
});

connection.once("open", ()=>{
    console.log("DataBase connection successfully!")
})
const app = express();
routes(app);

app.use(manipulator404);


app.use(errorHandle);

export default app;