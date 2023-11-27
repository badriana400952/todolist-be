import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Aktifitas } from "./Aktifitas"

@Entity({ name: "list" })
export class List {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    option: string

    @ManyToOne(() => Aktifitas, aktifitas => aktifitas.list,{
        "onDelete": "CASCADE",
        "onUpdate": "CASCADE"
    })
    aktifitas: Aktifitas
}

