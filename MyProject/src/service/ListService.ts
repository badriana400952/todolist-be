import { Repository } from "typeorm"
import { List } from "../entity/List"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"

class ListService{
    private readonly ListRepository: Repository<List> = AppDataSource.getRepository(List)

    async find(req: Request, res: Response){
        const list = await this.ListRepository.find()
        res.send(list)
    }

    async findOne(req: Request, res: Response){
        const { id } = req.params
        const list = await this.ListRepository.findOneBy({ id: Number(id) })
        res.send(list)
    }

    async create(req: Request, res: Response){
        const { name, option, aktifitasId } = req.body
        
       try {
        if(!aktifitasId){
            throw new Error('aktifitasID not found')
        }
        const result =  this.ListRepository.create({
           name: name,
           option: option,
           aktifitas:{id: aktifitasId}
        })
        console.log("result", result)
        const list = await this.ListRepository.save(result)
        console.log("list", list)
        res.status(201).json(list)
        
       } catch (error) {
        console.log(error)
       }
    }

    async patch(req: Request, res: Response){
       try {
        const{id} = req.params
        const {name, option, aktifitasId} = req.body
        if(!aktifitasId){
            throw new Error('aktifitasID not found')
        }
        const listID = await this.ListRepository.findOne({
            where:{
                id: Number(id)
            }
        })
        const listAdd =  this.ListRepository.create({
            name: name,
            option: option,
            aktifitas:{id: aktifitasId}
        })
        const listSave = await this.ListRepository.save(listAdd)
        res.status(200).json(listSave)
       } catch (error) {
        console.log(error)
       }
    }
    async delete(req: Request, res: Response){
        try {
            const {id} = req.params
            const listID = await this.ListRepository.findOne({
                where:{
                    id: Number(id)
                }
            })
            const deletes = await this.ListRepository.remove(listID)
            res.status(200).json(deletes)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new ListService