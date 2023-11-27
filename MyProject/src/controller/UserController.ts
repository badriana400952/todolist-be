import { Request, Response } from "express"
import UserService from "../service/UserService"

class UserController{
    find(req:Request,res:Response){
        UserService.find(req,res)
    } 
     login(req:Request,res:Response){
        UserService.login(req,res)
    }
    findOne(req:Request,res:Response){
        UserService.findOne(req,res)
    }
    create(req:Request,res:Response){
        UserService.create(req,res)
    }
    patch(req:Request,res:Response){
        UserService.patch(req,res)
    }
    delete(req:Request,res:Response){
        UserService.delete(req,res)
    }
}

export default new UserController