import { Sequelize } from "sequelize";
import BankAccount from "../models/BankAccount.js";
import Transfer from "../models/Transfer.js";
//import Transaction from "sequelize";
import Transactionn from "../models/Transactionn.js";


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
        const id_currency_from="96ab67dd-c81d-435c-a165-124aa994b7b3";
        const exchange_rate_from = 1;

        //Debit Ammount - Transactionn
        const debit_ammount = ammount;

        //Query to get the exchange_rate & id_currency for the Credit Account (Destiny)
        const id_currency_to="96ab67dd-c81d-435c-a165-124aa994b7b3";
        const exchange_rate_to = 7.8;
        //Credit Ammount - Transactionn
        const credit_ammount= ammount / exchange_rate_from * exchange_rate_to ;


        //ids that we need to get from a query
        const id_category_expense="a7023279-fcc0-408e-a0c1-ebef304bd01a";
        const id_category_income="77b23950-326d-4daf-af72-aa16481223b2";

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
      
        response.send(newTransfer);
    }
    catch(error){
        response.status(500).send({
            message:"There was an error while creating a new Transfer",
            error,
        });
    }
}//create
