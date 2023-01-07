
import Product from "../models/Product.js";

export async function createProduct(request, response){
    try{
        const { name } = request.body;

        //const newProduct= await Product.build({ name }).save();
        const newProduct= await Product.create( { name } );
        //const newProductInstance = new Product.build({name});
        //const newProduct = await newProductInstance.save();

        response.send(newProduct);
    }
    catch(error){
        response.status(500).send({
            message:"There was an error while creating a new product",
            error,
        });
    }
}


export async function getAllProductos(request, response){
    try{//? request
        const allProducts = await Product.findAll( {
            attributes: ['id','name']}); // gets only the columns that we want

        //const allProducts = await Product.findAll( {attributes: ['name']} ); // gets only the columns that we want
        response.send(allProducts);
    }catch(error){
        response.status(500).send({
            message:"There was an error while listing the productos",
            error,
        });
    }
}

export async function getProducto(request, response){
    const id = request.params.id;
    console.log("id:"+id)
    try{
        const product = await Product.findOne( {
            attributes: ['id', 'name'],
            where: {
                id
            }
        } );
        if(!product){
            return response.status(404).send({ message:"Product not found" });
        }
        //const allProducts = await Product.findAll( {attributes: ['name']} ); // gets only the columns that we want
        response.send(product);
    }catch(error){
        response.status(500).send({
            message:`There was an error while listing the productos`,
            error,
        });
    }
}

