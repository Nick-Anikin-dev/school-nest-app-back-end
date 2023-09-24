import { IUser } from "../../../core/user/user.interface";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { UserRole } from "../../user-role/entities/user-role.entity";

@Entity('user')
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    first_name: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    last_name: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    password: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    role_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToOne(() => UserRole, (userRole) => userRole.user, {
        eager: true,
        cascade: true,
    })
    @JoinColumn({
        name: 'role_id'
    })
    role: UserRole;
}
