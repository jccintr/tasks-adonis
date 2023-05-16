import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {

public async login({request,auth}: HttpContextContract){

    const {email,password} = request.all();

    const token = await auth.attempt(email,password);
    return token;
}

public async logout({auth}: HttpContextContract){


    await auth.logout();

}

public async me({auth,response}: HttpContextContract){

const loggedUser = auth.user;    
return await response.json({user : loggedUser});


}

public async register({request,response}: HttpContextContract){

    const {name,email,password} = request.all();

    if(!name || !email || !password){
        return response.status(400).json({erro:'Campos obrigatórios não informados.'});      
    }


    const user = await User.findBy('email', email);
    if(user)
      return response.status(400).json({erro:'Email já cadastrado.'});      
    

   const newUser =  await User.create({
        name: name, 
        email: email,
        password: password
       });

  return response.status(201).json(newUser);
}


}
