import Product from "../models/Product.js";
import Order from "../models/Order.js";
import {Sequelize, DataTypes} from "sequelize"; 

export async function createProduct(request, response){
    try{
        const { name } = request.body;
        const Orders = Product.hasMany(Order, { as: 'orders' });
        //const newProduct= await Product.build({ name }).save();
        //const id1=DataTypes.UUIDV4;
        //console.log("id1: "+id1);
        //const id2=DataTypes.UUIDV4;
        //console.log("id2: "+id2);
        const newProduct= await Product.create( { 
            name, 
            orders:[
                {id: 33, total: 10},
                { id: 44, total: 20}
            ]
        }, {
            include: [{
                association: Orders,
                as: 'orders'
            }]
        } );
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
}//createProduct


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
}//getAllProductos

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
}//getProducto

export async function deleteOneProduct(request, response){
    const id = request.params.id;
    try{
        const deletedProduct = await Product.destroy( {
            where: {
                id
            }
        } );

        if(deletedProduct === 1){
            return response.send({message: "Product deleted"});
        }

        response.send({message: "Product was not deleted"});
    }catch(error){
        response.status(500).send({
            message:`There was an error while listing the productos`,
            error,
        });
    }
}//deleteOneProduct


export async function updateOneProduct(request, response){
    const id = request.body.id;
    const name = request.body.name;

    try{
        const updatedProduct = await Product.update( 
        {
            name
        },
        {
            where: {
                id
            }
        } );

        response.send(updatedProduct);
    }catch(error){
        response.status(500).send({
            message:`There was an error while listing the productos`,
            error,
        });
    }
}//deleteOneProduct


