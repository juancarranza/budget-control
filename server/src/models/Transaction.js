import {Sequelize, DataTypes} from "sequelize"; 
import db from "../db/index.js"
import BankAccount from "./BankAccount.js";
import Category from "./Category.js";
import Currency from "./Currency.js";
import Transfer from "./Transfer.js";

const Transaction = db.get().define(
    'Transaction', 
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
//Adding Foreign Keys -> User, Currency, Transfer & BankAccount
Transaction.belongsTo(Category, {foreignKey: "id_category"});// User FK 
Transaction.belongsTo(Currency, {foreignKey: "id_currency"});//Currency FK
Transaction.belongsTo(Transfer, {foreignKey: "id_transfer", allowNull:true});//Transfer FK
Transaction.belongsTo(BankAccount, {foreignKey: "id_bankaccount"});

export default Transaction;