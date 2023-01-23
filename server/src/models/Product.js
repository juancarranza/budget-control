import {Sequelize, DataTypes} from "sequelize"; 
import db from "../db/index.js"
import Order from "../models/Order.js";
//const sequelize = new Sequelize("oracle");

const Product = db.get().define(
    'Product', 
    {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        schema: 'JUAN'
    }
);

//Product.Order=Product.hasMany(Order);

export default Product;