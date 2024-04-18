import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await dbConnect();

connection.on("error", (erro)=>{
    console.error("Connection error:", erro);
});

connection.once("open", ()=>{
    console.log("DataBase connection successfully!")
})
const app = express();
routes(app);

export default app;