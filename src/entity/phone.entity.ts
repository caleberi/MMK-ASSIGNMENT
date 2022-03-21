import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Account } from "./account.entity";


@Entity("phone_number")
export class Phone {

    @PrimaryGeneratedColumn("increment")
    public id?: number;

    @Column({
        type:"character varying",
        length:40,
        nullable:true})
    public number?: string;

    @OneToOne(() => Account)
    public account_id?: number;

}
