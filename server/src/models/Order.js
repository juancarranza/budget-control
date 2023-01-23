import {Sequelize, DataTypes} from "sequelize"; 
import db from "../db/index.js"
import Customer from "./Customer.js";

//const sequelize = new Sequelize("oracle");

const Order = db.get().define(
    'Order', 
    {
        id:{
            type: DataTypes.NUMBER,
            primaryKey: true
        },
        total:{
            type: DataTypes.NUMBER,
            allowNull: false,
        }
    },
    {
        schema: 'JUAN'
    }
);

//Order.belongsTo(Customer, { foreignKey: "id_customer"});

//const customer = Customer.findOne({ where: {id: "1"}});



//const order = await Order.build({total:150}).save();
//order.set("id_customer", customer);

//const order = await Order.build({total:150, id_customer: customer}).save();

export default Order;