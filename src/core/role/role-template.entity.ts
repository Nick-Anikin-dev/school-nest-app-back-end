import { Column } from "typeorm";
import { IRoleTemplate } from "./role-template.interface";
import { BaseEntity } from "../../common/types/base-entity";

export class RoleTemplate extends BaseEntity implements IRoleTemplate {
    @Column({
        type: 'int',
        nullable: false,
    })
    user_role_id: number;
}
