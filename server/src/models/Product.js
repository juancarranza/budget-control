import {Sequelize, DataTypes} from "sequelize"; 

const sequelize = new Sequelize("oracle");

const Product = sequelize.define('Product', {
    id:{
        type:DataTypes.UUIDV4,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Product;