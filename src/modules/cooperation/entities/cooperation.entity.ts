import { Entity } from "typeorm";
import { BaseEntity } from "../../../common/types/base-entity";

@Entity('request-for-cooperation')
export class RequestForCooperation extends BaseEntity {}
