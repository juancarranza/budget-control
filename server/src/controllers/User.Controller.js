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
        const username = request.body.loginCredentials.username;
        //const username = request.body.username;
        console.log("USERNAME: "+username);
        //const password=request.body.password;
        const password=request.body.loginCredentials.password;
        //const password = await bcrypt.hash(request.body.usuario.password, saltRounds);
        

        const user= await User.findOne({
            attributes: ['id', 'username', 'password', 'firstName', 'lastName', 'isAdmin'], 
            where: {
                username
            }
        });

        let result;
        if(user){
            const login= await bcrypt.compare(password, user.password);
            result = login ? user : "Wrong username/password combination!";
        }else{
            result= "The user does not exists!";
        }

        response.send(result)
        
    }catch(error){
        console.log("error: "+error);
        response.status(500).send({
            message:"There was an error while login",
            error,
        });
    }

}//end register


