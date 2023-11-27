import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
import { List } from "./List"


@Entity({name: 'aktifitas'})
export class Aktifitas{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    update_at: Date

    @ManyToOne(() => User, user => user.aktifitas,{
        "onDelete": "CASCADE",
        "onUpdate": "CASCADE"
    })
    user: User

    @OneToMany(() => List, list => list.aktifitas)
    list: List
}