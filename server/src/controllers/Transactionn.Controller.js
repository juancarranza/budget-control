
import {  QueryTypes } from "sequelize";
import Transactionn from "../models/Transactionn.js";
//import Currency from "../models/Currency.js";
import db from "../db/index.js";
import BankAccount from "../models/BankAccount.js";


export async function createTransaction(request, response){
    try{
        let ammount = request.body.transaction.ammount;
        if(request.body.transaction.type === 'expense'){
            console.log('llego create');
            ammount = parseFloat(ammount) * (-1);
        }
         
        console.log(ammount);
        const description = request.body.transaction.description;
        console.log(description);
        const status = "activo";
        console.log(status);
        const id_category= request.body.transaction.id_category;
        //console.log(id_user);
        // const id_currency = request.body.transaction.id_currency;
        // console.log(id_currency);
        const id_bankaccount = request.body.transaction.id_bankaccount;
        console.log(id_bankaccount);
        const bankAccount = await BankAccount.findOne( {
            attributes: ['id_currency'],
            where: {
                id:id_bankaccount
            }
        });
        const id_currency=bankAccount.id_currency;
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
        let ammount = request.body.transaction.ammount;
        if(parseFloat(ammount)>=0 && request.body.transaction.type==='expense'){
            ammount=ammount*(-1);
        }

        if(parseFloat(ammount)<=0 && request.body.transaction.type==='expense'){
            ammount=ammount*(-1);
        }
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

export async function summaryTransactions(request, response){
    try{

        const id_user = request.body.transaction.id_user;
        const transactions = await db.get().query('SELECT sum("ammount") AS total, "categoryType"  FROM JUAN.transactionn_list WHERE "id_user"=:id_user GROUP BY "categoryType";', 
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

export async function incomeCategories(request, response){
    try{

        const id_user = request.body.transaction.id_user;
        const transactions = await db.get().query('SELECT sum("ammount") AS total, "categoryType"  FROM JUAN.transactionn_list WHERE "id_user"=:id_user GROUP BY "categoryType";', 
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