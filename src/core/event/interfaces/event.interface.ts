import { IBaseEntity } from "../../../common/types/base-entity";
import { IUserRole } from "../../user-role/user-role.interface";

export interface IEvent extends IBaseEntity {
    title: string;
    description: string;
    from: Date;
    to: Date | null;
    meeting_link: string | null;
    school_id: number;
    guests: IUserRole[];
}
