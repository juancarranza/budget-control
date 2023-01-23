import {Sequelize, DataTypes} from "sequelize"; 
import db from "../db/index.js"
import User from "./User.js";
import Currency from "./Currency.js";

const BankAccount = db.get().define(
    'BankAccount', 
    {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        /*creationDate:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },*/
        initialAmmount:{
            type: DataTypes.FLOAT,
            allowNull: false
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
//Adding Foreign Keys -> User & Currency
BankAccount.belongsTo(User, {foreignKey: "id_user"});// User FK 
BankAccount.belongsTo(Currency, {foreignKey: "id_currency"});//Currency FK

export default BankAccount;