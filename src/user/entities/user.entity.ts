import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({default: 0})
    role?: number;

    constructor(partial: Partial<User>){
        Object.assign(this, partial)
    }
    
    
}
