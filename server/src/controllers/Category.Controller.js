
import Category from "../models/Category.js";

export async function createCategory(request, response){
    console.log("here");
    try{
        const categoryType= request.body.categoryType;
        const name = request.body.name;
        const description = request.body.description;
        const status = "activo";

        //const newProduct= await Product.build({ name }).save();
        const newCategory= await Category.create( { categoryType, name, description, status } );
        //const newProductInstance = new Product.build({name});
        //const newProduct = await newProductInstance.save();

        response.send(newCategory);
    }
    catch(error){
        response.status(500).send({
            message:"There was an error while creating a new product",
            error,
        });
    }
}//create

