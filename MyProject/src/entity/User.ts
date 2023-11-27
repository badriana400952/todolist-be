import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Aktifitas } from "./Aktifitas"

@Entity({ name: "user" })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Aktifitas, aktifitas => aktifitas.user)
    aktifitas: Aktifitas[]
}
