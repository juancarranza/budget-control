import {Sequelize, DataTypes} from "sequelize"; 
import db from "../db/index.js";
import BankAccount from "./BankAccount.js";
import Category from "./Category.js";
import Currency from "./Currency.js";
import Transfer from "./Transfer.js";

const Transactionn = db.get().define(
    'Transactionn', 
    {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
Transactionn.belongsTo(Category, {foreignKey: "id_category"});// User FK 
Transactionn.belongsTo(Currency, {foreignKey: "id_currency"});//Currency FK
Transactionn.belongsTo(Transfer, {foreignKey: "id_transfer", allowNull: true});//Transfer FK
Transactionn.belongsTo(BankAccount, {foreignKey: "id_bankaccount"});

export default Transactionn;