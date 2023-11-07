import { IUser } from "../../../core/user/user.interface";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { UserRole } from "../../user-role/entities/user-role.entity";
import { BaseEntity } from "../../../common/types/base-entity";
import { RequestForCooperation } from "../../cooperation/entities/cooperation.entity";

@Entity('user')
export class User extends BaseEntity implements IUser {
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

    @OneToOne(() => UserRole, (userRole) => userRole.user, {
        eager: true,
    })
    @JoinColumn({
        name: 'role_id'
    })
    role: UserRole;

    @OneToMany(() => RequestForCooperation, (cooperation) => cooperation.recipient)
    received_requests_for_cooperation: RequestForCooperation[];

    @OneToMany(() => RequestForCooperation, (cooperation) => cooperation.sender)
    sent_requests_for_cooperation: RequestForCooperation[];
}
