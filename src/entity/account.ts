import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("account")
export class Account {

    @PrimaryGeneratedColumn("increment")
    public id?: number;

    @Column({
        type:"character varying",
        length:40,
        nullable:true})
    public username!: string;

    @Column({
        type:"character varying",
        length:40,
        nullable:true})
    public auth_id?: string;

}
