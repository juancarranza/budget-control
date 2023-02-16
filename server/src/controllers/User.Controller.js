import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config} from "dotenv";


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
    config();
    try{
        console.log("here hola1");
        const username = request.body.loginCredentials.username;
        //const username = request.body.username;
        console.log("USERNAME: "+username);
        //const password=request.body.password;
        const password=request.body.loginCredentials.password;
        //const password = await bcrypt.hash(request.body.usuario.password, saltRounds);
        console.log("here hola2");

        const user= await User.findOne({
            attributes: ['id', 'username', 'password', 'firstName', 'lastName', 'isAdmin'], 
            where: {
                username
            }
        });

        let result;
        if(user){
            console.log("user found");
            console.log("=---------------");
            const login= await bcrypt.compare(password, user.password);
            result = login ? user : "Wrong username/password combination!";
            if(login){
                const token = jwt.sign(
                    {
                        user_id: user.id,
                        username: user.username
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h"
                    }

                );
                result.token = token;
            }
            console.log(result)
            console.log("=---------------");
        }else{
            result= "The user does not exists!";
        }

        setTimeout(() => { response.send(result)}, 3000);
        
    }catch(error){
        console.log("error: "+error);
        response.status(500).send({
            message:"There was an error while login",
            error,
        });
    }

}//end login

export async function testlogin(request, response){
    try {
        console.log(request.body);
        console.log("here llego");
    } catch (error) {
        console.log(e);
    }
    
}