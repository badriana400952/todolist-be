import { Repository } from "typeorm"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { LoginSchema, RegisSchema } from "../utils/UserSchema"
import bcrypt = require("bcrypt")
import jwt = require("jsonwebtoken")
class UserService {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)

    async login(req: Request, res: Response) {
        try {
            const data = req.body

            const { error, value } = LoginSchema.validate(data)
            if (error) {
                res.status(400).json({error: error.message})
            }

            const loginData = await this.UserRepository.findOne({
                where: {
                    name: value.name,
                    email: value.email,
                },
                select: ["id", "name", "email", "password"]
            })

            if (!loginData) {
                res.status(404).json({message: "User not found"})
            }
            const isPasswordValidae = bcrypt.compareSync(value.password, loginData.password)
            if (!isPasswordValidae) {
               return res.status(400).json({
                    message: "Password email salah"
                })
            }

            const user = this.UserRepository.create({
                id: loginData.id,
                name: loginData.name,
                email: loginData.email,
                password: loginData.password
            })

            const message = `Hallo ${user.name}, selamat datang kembali`
            const token = jwt.sign({ user }, "bagiansecret", { expiresIn: "1h" })

            res.status(200).json({ user,token,isPasswordValidae, message: message })
        } catch (error) {
            console.log({error: error.message})
        }
    }
    async find(req: Request, res: Response) {
        try {
            const users = await this.UserRepository.find()
            res.status(200).json(users)
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params
            const user = await this.UserRepository.findOneBy({ id: Number(id) })
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
        }
    }

    async create(req: Request, res: Response) {
        const data = req.body
        try {
            const { error, value } = RegisSchema.validate(data)
            if (error) {
                res.status(400).json(error)
            }
            const hashPassword = await bcrypt.hash(value.password, 10)
            const Cekregis = await this.UserRepository.count({
                where: {
                    email: value.email,
                }
            })
            if (Cekregis > 0) {
                res.status(404).json({
                    message: "User not found"
                })
            }
            const userSave = this.UserRepository.create({
                name: value.name,
                email: value.email,
                password: hashPassword
            })

            const result = await this.UserRepository.save(userSave)
            res.status(201).json(result)
        } catch (error) {
            console.log(error)
        }
    }

    async patch(req: Request, res: Response) {
        const { id } = req.params
        const { name, email, password } = req.body
        try {
            const user = await this.UserRepository.findOne({
                where: {
                    id: Number(id)
                }
            })
            user.name = name
            user.email = email
            user.password = password
            const result = await this.UserRepository.save(user)
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        try {
            const user = await this.UserRepository.findOne({
                where: {
                    id: Number(id)
                }
            })
            const result = await this.UserRepository.remove(user)
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    }
}
export default new UserService