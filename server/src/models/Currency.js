import {Sequelize, DataTypes} from "sequelize"; 
import db from "../db/index.js"

const Currency = db.get().define(
    'Currency', 
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
        symbol:{
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false
        },
        exchangeRate: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    },
    {
        schema: 'JUAN'
    }
);

export default Currency;
