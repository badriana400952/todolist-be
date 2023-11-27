import { Request, Response } from "express"
import ListService from "../service/ListService"

class ListController{
    
    find(req:Request,res:Response) {
        ListService.find(req,res)
    }
    findOne(req:Request,res:Response) {
        ListService.findOne(req,res)
    }
    create(req:Request,res:Response) {
        ListService.create(req,res)
    }
    patch(req:Request,res:Response) {
        ListService.patch(req,res)
    }
    delete(req:Request,res:Response) {
        ListService.delete(req,res)
    }
}

export default new ListController