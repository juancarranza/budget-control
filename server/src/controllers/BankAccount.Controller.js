
import {  QueryTypes } from "sequelize";
import BankAccount from "../models/BankAccount.js";
import Transfer from "../models/Transfer.js";
import Transactionn from "../models/Transactionn.js";
import db from "../db/index.js";


export async function createBankAccount(request, response){
    try{
        const name = request.body.bankAccount.name;
        console.log(name);
        const description = request.body.bankAccount.description;
        console.log(description);
        //const creationDate = Sequelize.now();
        const initialAmmount = request.body.bankAccount.initial_ammount;
        console.log(initialAmmount);
        const status = "activo";
        console.log(status);
        const id_user= request.body.bankAccount.id_user;
        console.log(id_user);
        const id_currency = request.body.bankAccount.id_currency;
        console.log(id_currency);
        //const newProduct= await Product.build({ name }).save();
        const newBankAccount= await BankAccount.create( { name, description, initialAmmount, status, id_user, id_currency } );
        
        //const newProductInstance = new Product.build({name});
        //const newProduct = await newProductInstance.save();

        response.send(newBankAccount);
    }
    catch(error){
        response.status(500).send({
            message:"There was an error while creating a new Bank Account",
            error,
        });
    }
}//create

export async function updateBankAccount(request, response){
    try{
        const id = request.body.bankAccount.id;
        //console.log(id);
        const name = request.body.bankAccount.name;
        //console.log(name);
        const description = request.body.bankAccount.description;
        //console.log(description);
        const initialAmmount = request.body.bankAccount.initial_ammount;
        //console.log(id_user);
        const id_currency = request.body.bankAccount.id_currency;

        const updatedBankAccount = await BankAccount.update( 
        {
            name, description, initialAmmount, id_currency
        },
        {
            where: {
                id
            }
        } );
        response.send(updatedBankAccount);
    }catch(error){
        response.status(500).send({
            message:`There was an error while update the bank account`,
            error,
        });
    }
}//update

export async function deleteBankAccount(request, response){
    try{
        const id = request.body.id;//id_bankAccount
        //console.log(id);
        const status = "deleted";

        const delTransactionns = await Transactionn.update( 
            {
                status
            },
            {
                where: {
                    id_bankaccount: id
                }
            } 
        );
        // const delTransfer = await Transfer.update(
        //     {
        //         status
        //     },
        //     {
        //         where: {
        //             [Op.or] : [
        //                 {
        //                     id_bankaccount_from: id
        //                 },
        //                 {
        //                  id_bankaccount_to: id
        //                 }
        //             ]
        //         }
        //     }
        // );
        const delBankAccount = await BankAccount.update( 
            {
                status
            },
            {
                where: {
                    id
                }
            } 
        );

        response.send(delBankAccount);
    }catch(error){
        response.status(500).send({
            message:`There was an error while update the bank account`,
            error,
        });
    }
}//delete


export async function getBankAccounts(request, response){
    try{

        const bankAccounts = await db.get().query('SELECT * FROM JUAN.bank_account_list;', 
         {  
            type: QueryTypes.SELECT 
         });
        // const bankAccounts = await db.get().query('SELECT ba."id", ba."name", ba."description" , ba."initialAmmount" , ba."status", ba."createdAt", c."name" AS currency, c."symbol"  FROM JUAN."Currencies" c, JUAN."BankAccounts" ba WHERE c."id" = ba."id_currency" AND ba."status" = :status AND c.status =:status ;', 
        // {   
        //     replacements: { status: estado }, 
        //     type: QueryTypes.SELECT 
        // });

        response.send(bankAccounts);
    }catch(error){
        response.status(500).send({
            message:"There was an error while listing the bank accounts",
            error,
        });
    }
}//getAllProductos

//currency - Dollar US
//96ab67dd-c81d-435c-a165-124aa994b7b3

//User - test@email.com 
//784f7322-e0ed-4930-b876-17778c183cb7