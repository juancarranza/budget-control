import {Sequelize, DataTypes} from "sequelize"; 
import db from "../db/index.js"
import BankAccount from "./BankAccount.js";


const Transfer = db.get().define(
    'Transfer', 
    {
        id:{
            type:DataTypes.UUIDV4,
            primaryKey: true
        },
        ammount:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        transferDateTime:{
            type: DataTypes.TIME,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        schema: 'JUAN'
    }
);
//Adding Foreign Keys -> Bank Account origin (sender) & Bank Account destiny (receiver)
Transfer.belongsTo(BankAccount, {foreignKey: "id_bankaccount_from"});// FK BankAccount Origin
Transfer.belongsTo(BankAccount, {foreignKey: "id_bankaccount_to"});//FK Currency Destiny 

export default Transfer;