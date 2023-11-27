import { Repository } from "typeorm"
import { Aktifitas } from "../entity/Aktifitas"
import { AppDataSource } from "../data-source"
import { Request } from "express-serve-static-core"
import { Response } from "express"

class AktifitasService {
    private readonly aktifitasRepository: Repository<Aktifitas> = AppDataSource.getRepository(Aktifitas)
    async find(req: Request, res: Response) {
        try {
            const aktifitas = await this.aktifitasRepository.find()
            res.status(200).json(aktifitas)
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params
            const aktifitas = await this.aktifitasRepository.findOne({
                where:{
                    id: Number(id)
                },
                relations: ["list","user"]
            })
            res.status(200).json(aktifitas)
        } catch (error) {
            console.log(error)
        }
    }
    async findUser(req: Request, res: Response) {
        try {
            const IDUserLogin = res.locals.loginSesion

            const aktifitas = await this.aktifitasRepository.find({
                where:{
                    user:{
                        id: IDUserLogin.user.id
                    }
                },
                relations:["list","user"]
            })

            res.status(200).json(aktifitas)
        } catch (error) {
            console.log(error)
        }
    }
    async create(req: Request, res: Response) {
        const { name,userId } = req.body
        try {
            const aktifitas = this.aktifitasRepository.create({
                name: name,
                user:{id:userId}
               
            })
            const result = await this.aktifitasRepository.save(aktifitas)
            res.status(201).json(result)
        } catch (error) {
            console.log(error)
        }
    }
    async patch(req: Request, res: Response) {
        const { id } = req.params
        const { name } = req.body
        try {
            const aktifitas = await this.aktifitasRepository.findOne({
                where: {
                    id: Number(id)
                }
            })
            aktifitas.name = name
         
            const result = await this.aktifitasRepository.save(aktifitas)
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params
        try {
            const aktifitas = await this.aktifitasRepository.findOneBy({ id: Number(id) })
            const result = await this.aktifitasRepository.remove(aktifitas)
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    }

}
export default new AktifitasService