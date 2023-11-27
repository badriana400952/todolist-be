import { Request, Response } from "express";
import AktifitasService from "../service/AktifitasService";

class AktifitasController{

    findOne(req:Request,res:Response) {
        AktifitasService.findOne(req,res)
    }
    find(req:Request,res:Response) {
        AktifitasService.find(req,res)
    }
    findUser(req:Request,res:Response) {
        AktifitasService.findUser(req,res)
    }
    create(req:Request,res:Response) {
        AktifitasService.create(req,res)
    }
    patch(req:Request,res:Response) {
        AktifitasService.patch(req,res)
    }
    delete(req:Request,res:Response) {
        AktifitasService.delete(req,res)
    }
}
export default new AktifitasController