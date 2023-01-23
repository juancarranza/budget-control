
import Currency from "../models/Currency.js";

export async function createCurrency(request, response){
    try{
        const name = request.body.name;
        const symbol= request.body.symbol;
        const description = request.body.description;
        const status = "activo";
        const exchangeRate= request.body.exchangeRate;

        //const newProduct= await Product.build({ name }).save();
        const newCurrency= await Currency.create( { name, symbol, description, status, exchangeRate } );
        //const newProductInstance = new Product.build({name});
        //const newProduct = await newProductInstance.save();

        response.send(newCurrency);
    }
    catch(error){
        response.status(500).send({
            message:"There was an error while creating the new currency",
            error,
        });
    }
}//create