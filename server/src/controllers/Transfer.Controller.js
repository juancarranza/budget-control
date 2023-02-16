import { Sequelize, QueryTypes } from "sequelize";
import BankAccount from "../models/BankAccount.js";
import Transfer from "../models/Transfer.js";
//import Transaction from "sequelize";
import Transactionn from "../models/Transactionn.js";
import db from "../db/index.js";
import Category from "../models/Category.js";

export async function createTransfer_HOLA(request, response){
    try{

        const ammount = request.body.ammount;
        console.log("ammount: "+ammount);
        const description = request.body.description;
        console.log("description: "+description);
        const status = "activo";
        console.log(status);
        const id_bankaccount_from= request.body.id_bankaccount_from;
        console.log("from: "+id_bankaccount_from);
        const id_bankaccount_to = request.body.id_bankaccount_to;
        console.log("to: "+id_bankaccount_to);

        //id that we need to get using the id_bankaccount_from as criteria
        const id_currency_from="96ab67dd-c81d-435c-a165-124aa994b7b3";
        const id_currency_to="96ab67dd-c81d-435c-a165-124aa994b7b3";

        //ids that we need to get from a quey
        const id_category_expense="a7023279-fcc0-408e-a0c1-ebef304bd01a";
        const id_category_income="77b23950-326d-4daf-af72-aa16481223b2";

        //const Transactionns = Transfer.hasMany(Transactionn, { allowNull:true,as: 'transactionns'});
        const Transactionns = Transfer.hasMany(Transactionn, { as: 'transactionns'});

        //const ammount_expense= parseFloat(ammount) * -1;

        const newTransfer= await Transfer.create({
            ammount, 
            description, 
            status,
            id_bankaccount_from,
            id_bankaccount_to,
            transactionns:[
                {//origin
                //ammount, description, status, -> expense, id_category, id_bankaccount
                    ammount: ammount,
                    description: description,
                    status: status,
                    id_bankaccount: id_bankaccount_from,
                    id_category: id_category_expense,
                    id_currency: id_currency_from
                },
                {//destiny
                //ammount, description, status -> expense, id_category, id_bankaccount
                    ammount: ammount,
                    description: description,
                    status: status,
                    id_bankaccount: id_bankaccount_to,
                    id_category: id_category_income,
                    id_currency: id_currency_to

                }
            ]
        },
        {
            include: [{
                association: Transactionns,
                as: 'transactionns'
            }]
        });
        //origin
        
        
        


        //const newProduct= await Product.build({ name }).save();
        //const newBankAccount= await BankAccount.create( { name, description, initialAmmount, status, id_user, id_currency } );
        
        //const newProductInstance = new Product.build({name});
        //const newProduct = await newProductInstance.save();

        response.send(newTransfer);
    }
    catch(error){
        response.status(500).send({
            message:"There was an error while creating a new Transfer",
            error,
        });
    }
}//create


export async function createTransfer(request, response){
    //const t = await sequelize.transaction();
    try{

        //const ammount = request.body.ammount;
        const ammount = request.body.transfer.ammount;
        console.log("ammount: "+ammount);
        //const description = request.body.description;
        const description = request.body.transfer.description;
        console.log("description: "+description);
        const status = "activo";
        console.log(status);
        //const id_bankaccount_from= request.body.id_bankaccount_from;
        const id_bankaccount_from= request.body.transfer.id_bankaccount_from;
        console.log("from: "+id_bankaccount_from);
        //const id_bankaccount_to = request.body.id_bankaccount_to;
        const id_bankaccount_to = request.body.transfer.id_bankaccount_to;
        console.log("to: "+id_bankaccount_to);
        //const id_currency_from=request.body.id_currency_from;
        const id_currency_from=request.body.transfer.id_currency_from;
        console.log("currency_from: "+id_currency_from);
        //const exchange_rate_from = request.body.exchange_rate_from;
        const exchange_rate_from = request.body.transfer.exchange_rate_from;
        console.log("exchange_rate_from: "+id_currency_from);
        //Debit Ammount - Transactionn
        const debit_ammount = ammount * (-1);
        

        //Query to get the exchange_rate & id_currency for the Credit Account (Destiny)
        const bankAccountTo = await db.get().query('SELECT * FROM JUAN.bank_account_list WHERE "id" =:id_bank_to ;', 
            {  
                replacements: { id_bank_to: id_bankaccount_to },
                type: QueryTypes.SELECT 
            }
        );
        //Validate if Bank Account does not exists!
        if(!bankAccountTo){
            return response.status(200).send({success: false, message: 'Bank Account destiny does not exists.'});
        } 
        
        //Exchange Rate Destiny Currency
        const exchange_rate_to = bankAccountTo[0].exchangeRate;
        const id_currency_to = bankAccountTo[0].id_currency;
        //Credit Ammount - Transactionn
        const credit_ammount= ammount / exchange_rate_from * exchange_rate_to ;
        console.log("Credit Ammount:");
        console.log(credit_ammount);

        // Get Category -> transfer, expense 
        const categoryExpense= await Category.findOne({
            attributes: ['id', 'name', 'categoryType'], 
            where: {
                name: 'transfer',
                categoryType : 'expense',
                status
            }
        });
        if(!categoryExpense){
            return response.status(200).send({success: false, message: 'Category transfer for expense was not created.'});
        }
        const id_category_expense=categoryExpense.id;
        // Get Category -> transfer, income 
        const categoryIncome= await Category.findOne({
            attributes: ['id', 'name', 'categoryType'], 
            where: {
                name: 'transfer',
                categoryType : 'income',
                status
            }
        });
        if(!categoryIncome){
            return response.status(200).send({success: false, message: 'Category transfer for income was not created.'});
        }
        const id_category_income=categoryIncome.id;

        const newTransfer = await Transfer.create({
            ammount,
            description,
            status,
            id_bankaccount_from,
            id_bankaccount_to

        });

        const idTransfer=newTransfer.id;
        //Expense
        const transaccion_debit = await Transactionn.create({
            ammount: debit_ammount,
            description,
            status,
            id_bankaccount: id_bankaccount_from,
            id_category: id_category_expense,
            id_currency: id_currency_from,
            id_transfer: idTransfer

        });
        //Income
        const transaccion_credit = await Transactionn.create({
            ammount: credit_ammount,
            description,
            status,
            id_bankaccount: id_bankaccount_to,
            id_category: id_category_income,
            id_currency: id_currency_to,
            id_transfer: idTransfer

        });
        /*const expense = await Transactionn.create({//origin
            //ammount, description, status, -> expense, id_category, id_bankaccount
                ammount: ammount,
                description: description,
                status: status,
                
            });*/

        //await t.commit();
        //const Transactionns = Transfer.hasMany(Transactionn, { allowNull:true,as: 'transactionns'});
      
        response.status(200).send({success: true, message: 'Transfer had been made properly.'});
        
    }
    catch(error){
        response.status(500).send({
            message:"There was an error while creating a new Transfer",
            error,
        });
    }
}//create
