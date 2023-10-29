import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('test-option')
export class TestOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    value: string;
}
