import { IEvent } from "../../../core/event/interfaces/event.interface";
import { BaseEntity } from "../../../common/types/base-entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { UserRole } from "../../user-role/entities/user-role.entity";

@Entity('event')
export class Event extends BaseEntity implements IEvent {
    @Column({
        type: 'varchar',
        nullable: false,
    })
    title: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    description: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    school_id: number;

    @Column({
        type: 'timestamptz',
        nullable: false,
    })
    from: Date;

    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    to: Date | null;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    meeting_link: string | null;

    @ManyToMany(() => UserRole, (userRole) => userRole.events)
    @JoinTable({
        name: 'user-role-event'
    })
    guests: UserRole[];
}
