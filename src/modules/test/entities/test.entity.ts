import { Entity } from "typeorm";
import { BaseEntity } from "../../../common/types/base-entity";

@Entity('test')
export class Test extends BaseEntity {}
