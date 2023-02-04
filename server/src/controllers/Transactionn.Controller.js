
import {  QueryTypes } from "sequelize";
import Transactionn from "../models/Transactionn.js";
import db from "../db/index.js";


export async function createTransaction(request, response){
    try{
        const ammount = request.body.transaction.ammount;
        console.log(ammount);
        const description = request.body.transaction.description;
        console.log(description);
        const status = "activo";
        console.log(status);
        const id_category= request.body.transaction.id_category;
        console.log(id_user);
        const id_currency = request.body.transaction.id_currency;
        console.log(id_currency);
        const id_bankaccount = request.body.transaction.id_bankaccount;
        console.log(id_bankaccount);
        //const newProduct= await Product.build({ name }).save();
        const newTransaction= await Transactionn.create( { ammount, description, status, id_category, id_currency, id_bankaccount } );

        response.status(200).send({success: true, message: 'Transaction created.', transaction: newTransaction});
    }
    catch(error){
        response.status(500).send({
            success: false,
            message:"There was an error while creating a new Transaction Expense/Income",
            error,
        });
    }
}//create

export async function getTransactions(request, response){
    try{

        const id_user = request.body.transaction.id_user;
        const transactions = await db.get().query('SELECT * FROM JUAN.transactionn_list where "id_user"=:id_user ;', 
         {  
            replacements: { id_user },
            type: QueryTypes.SELECT 
         });
        response.send(transactions);
    }catch(error){
        response.status(500).send({
            message:"There was an error while listing the transactions Income/Expense/Transfer",
            error,
        });
    }
}//getTransactions

export async function updateTransaction(request, response){
    try{
        const id = request.body.transaction.id;
        console.log(id);
        const ammount = request.body.transaction.ammount;
        console.log(ammount);
        const description = request.body.transaction.description;
        console.log(description);
        const id_category= request.body.transaction.id_category;
        console.log(id_category);
        const id_currency = request.body.transaction.id_currency;
        console.log(id_currency);
        const id_bankaccount = request.body.transaction.id_bankaccount;
        console.log(id_bankaccount);
        const updateTransaction= await Transactionn.update( 
            {   
                ammount, 
                description, 
                id_category, 
                id_currency, 
                id_bankaccount 
            },
            {
                where:{
                    id
                }
            } 
            
        );

        response.status(200).send({success: true, message: 'Transaction updated.', transaction: updateTransaction});
    }
    catch(error){
        response.status(500).send({
            success: false,
            message:"There was an error while updating a Transaction Expense/Income",
            error,
        });
    }
}//update

export async function deleteTransaction(request, response){
    try{
        const id = request.body.transaction.id;
        const status="deleted";
        const deleteTransaction= await Transactionn.update( 
            {   
                status
            },
            {
                where:{
                    id
                }
            } 
            
        );

        response.status(200).send({success: true, message: 'Transaction deleted.', transaction: deleteTransaction});
    }
    catch(error){
        response.status(500).send({
            success: false,
            message:"There was an error while deleting a Transaction Expense/Income",
            error,
        });
    }
}//delete