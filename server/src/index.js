import {config} from "dotenv";
import app from "./api/api.js";


config();
const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`API IS RUNNING IN http://localhost:${PORT}`);
});
