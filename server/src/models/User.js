import {Sequelize, DataTypes} from "sequelize"; 
import db from "../db/index.js"

//const sequelize = new Sequelize("oracle");

const User = db.get().define(
    'User', 
    {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
               isEmail: true,
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        schema: 'JUAN'
    }
);

export default User;