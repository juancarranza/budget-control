import {Sequelize, DataTypes} from "sequelize"; 
import db from "../db/index.js"
import Category from "./Category.js";
import Currency from "./Currency.js";

const BankAccount = db.get().define(
    'BankAccount', 
    {
        id:{
            type:DataTypes.UUIDV4,
            primaryKey: true
        },
        ammount:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        creationDate:{
            type: DataTypes.DATE,
            allowNull: false
        },
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
BankAccount.belongsTo(Category, {foreignKey: "id_category"});// User FK 
BankAccount.belongsTo(Currency, {foreignKey: "id_currency"});//Currency FK

export default BankAccount;