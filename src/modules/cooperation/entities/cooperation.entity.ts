import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../common/types/base-entity";
import { User } from "../../user/entities/user.entity";
import { IRequestForCooperation } from "../../../core/cooperation/interfaces/cooperation.interface";
import { RequestForCooperationStatus } from "../../../core/cooperation/enums/request-for-cooperation-status.enum";

@Entity('request-for-cooperation')
export class RequestForCooperation extends BaseEntity implements IRequestForCooperation {
    @Column({
        type: 'int',
        nullable: false,
    })
    sender_id: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    recipient_id: number;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    message: string;


    @Column({
        type: 'enum',
        enum: RequestForCooperationStatus,
        nullable: false,
        default: RequestForCooperationStatus.PENDING,
    })
    status: RequestForCooperationStatus;

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'sender_id'
    })
    sender: User;

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'recipient_id'
    })
    recipient: User;
}
