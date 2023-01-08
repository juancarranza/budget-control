import {Sequelize, DataTypes} from "sequelize"; 
import db from "../db/index.js"

//const sequelize = new Sequelize("oracle");

const Customer = db.get().define(
    'Customer', 
    {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        schema: 'JUAN'
    }
);

export default Customer;