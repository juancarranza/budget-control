import {config} from "dotenv";
import { Sequelize } from "sequelize";



class DB{
    sequelize;

    constructor(){
        config();
        this.sequelize=new Sequelize({
            dialect:'oracle', 
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        });
    }

    async connect(){
        try{
            await this.sequelize.authenticate();            
            await this.sequelize.sync();
            console.log('DB IS RUNNING')
        }catch(error){
            console.error('ERROR IN DB CONNECTION')
            console.error(error)
        }
    }
    get(){
        return this.sequelize;
    }
}

const db = new DB();

export default db;
