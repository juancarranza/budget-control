import User from "../models/User.js";
import bcrypt from "bcrypt";



export async function register(request, response){
    
    try{
        const saltRounds = 10;
        const username = request.body.usuario.username;
        const password = await bcrypt.hash(request.body.usuario.password, saltRounds);
        const firstName = request.body.usuario.firstName;
        const lastName = request.body.usuario.lastName;

        const newUser= await User.create({ 
            username,
            password,
            firstName,
            lastName,
            isAdmin: false
        });

        response.send(newUser);
        

    }catch(error){
        response.status(500).send({
            message:"There was an error while creating a new product",
            error,
        });
    }

}//end register

export async function login(request, response){
    
    try{
        const saltRounds = 10;
        //const username = request.body.usuario.username;
        const username = request.body.username;
        //const password = await bcrypt.hash(request.body.usuario.password, saltRounds);

        const user= await User.findOne({
            attributes: ['id', 'username', 'password', 'firstName', 'lastName', 'isAdmin'], 
            where: {
                username
            }
        });


        response.send(user);
        

    }catch(error){
        response.status(500).send({
            message:"There was an error while login",
            error,
        });
    }

}//end register


