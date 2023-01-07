import {config} from "dotenv";
import app from "./api/api.js";
import db from "./db/index.js"


config();
const PORT = process.env.SERVER_PORT

db.connect().then( () =>{
    app.listen(PORT, ()=>{
        console.log(`API IS RUNNING IN http://localhost:${PORT}`);
    });
});

