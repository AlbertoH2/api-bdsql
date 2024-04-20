import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity({  name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    UserName: string
    
    @Column()
    Password: string
}