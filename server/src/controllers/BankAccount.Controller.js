
import BankAccount from "../models/BankAccount.js";

export async function createBankAccount(request, response){
    try{
        const name = request.body.name;
        const description = request.body.description;
        const creationDate = new Date();
        const initialAmmount = request.body.initialAmmount;
        const status = "activo";
        const id_user= request.body.id_user;
        const id_currency = request.boy.id_currency;

        //const newProduct= await Product.build({ name }).save();
        const newBankAccount= await BankAccount.create( { name, description, creationDate, initialAmmount, status, id_user, id_currency } );
        //const newProductInstance = new Product.build({name});
        //const newProduct = await newProductInstance.save();

        response.send(newBankAccount);
    }
    catch(error){
        response.status(500).send({
            message:"There was an error while creating a new product",
            error,
        });
    }
}//create
