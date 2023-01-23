import {Sequelize, DataTypes} from "sequelize"; 
import db from "../db/index.js"

const Category = db.get().define(
    'Category', 
    {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        categoryType:{
            type: DataTypes.STRING,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
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

export default Category;
