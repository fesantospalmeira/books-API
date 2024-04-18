import "dotenv/config";
import app from "./src/app.js";

const PORT = 3000;

const routes = {
    "/": "First route",
    "/books": "all books",
    "/authors": "all authors"
};

app.listen(PORT, ()=>{
    console.log("Server on!")
})

