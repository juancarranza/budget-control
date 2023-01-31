
import Category from "../models/Category.js";
import { Op } from "sequelize";

export async function createCategory(request, response){
    //console.log("here");
    try{
        const categoryType= request.body.category.categoryType;
        //const categoryType= request.body.categoryType;
        console.log(categoryType);
        const name = request.body.category.name;
        //const name = request.body.name;

        //Validate name and Category Type
        const categoryExists= await Category.findAll(  
            {
                attributes: ['id'],
                where: {
                    categoryType,
                    name
                }
            }
        );
        console.log(categoryExists);
        if(categoryExists && categoryExists.length>0){
            console.log("ENTRO");
            return response.status(200).send( { success: false, message: 'The category already exists, please change the name & categoryType.'} );
        }

        console.log( "NO ENTRO");
        const description = request.body.category.description;
        //const description = request.body.description;
        const status = "activo";
        const newCategory= await Category.create( { categoryType, name, description, status } );       
        if(!newCategory){
            return response.status(200).send( { success: false, message: 'There was an error creating the category please validate the send parameters.'} );
        }
        return response.status(200).send( { success: true, message: 'The category had been created successfully.', newCategory } );
    }
    catch(error){
        response.status(500).send({
            message:"There was an error while creating a new product",
            error,
        });
    }
}//create

export async function getCategories(request, response){
    //console.log("here");
    try{
        const status = 'activo';
        const categories= await Category.findAll(  
            {
                attributes: ['id', 'categoryType', 'name', 'description', 'createdAt'],
                where: {
                    status
                }
            }
        );
        if(!categories){
            return response.status(200).send({success: false, message: 'Unable to find active categories'});
        }
        return response.status(200).send({success: true, message: 'Categories found successfully', categories});
    }
    catch(error){
        response.status(500).send({
            message:"There was an error while generating all the categories",
            error,
        });
    }
}//getAllCategories

export async function updateCategory(request, response){
    //console.log("here");
    try{
        const id = request.body.category.id;
        const categoryType= request.body.category.categoryType;
        //const categoryType= request.body.categoryType;
        console.log(categoryType);
        const name = request.body.category.name;
        //const name = request.body.name;
        console.log( "NO ENTRO");
        const description = request.body.category.description;
        
        //Validate name and Category Type
        const categoryExists= await Category.findAll(  
            {
                attributes: ['id'],
                where: {
                    id: {
                        [Op.not]: id
                    },
                    categoryType,
                    name
                }
            }
        );
        console.log(categoryExists);
        if(categoryExists && categoryExists.length>0){
            //console.log("ENTRO");
            return response.status(200).send( { success: false, message: 'The category already exists, please change the name AND/OR categoryType.'} );
        }

        //const description = request.body.description;
        const updatedCategory = await Category.update( 
            {
                name, description, categoryType
            },
            {
                where: {
                    id
                }
            } );
       
        return response.status(200).send( { success: true, message: 'The category had been updated successfully.', updatedCategory } );
    }
    catch(error){
        response.status(500).send({
            success: false,
            message:"There was an error while updating the category",
            error,
        });
    }
}//create

export async function deleteCategory(request, response){
    try{
        const id = request.body.category.id;
        const status = "deleted";

        //const description = request.body.description;
        const updatedCategory = await Category.update( 
            {
                status
            },
            {
                where: {
                    id
                }
            } 
        );
       
        return response.status(200).send( { success: true, message: 'The category had been deleted successfully.', updatedCategory } );
    }
    catch(error){
        response.status(500).send({
            success: false,
            message:"There was an error while updating the category",
            error,
        });
    }
}//delete