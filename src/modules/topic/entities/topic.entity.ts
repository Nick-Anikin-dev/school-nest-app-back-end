import { BaseEntity } from "../../../common/types/base-entity";
import { Entity, ManyToMany } from "typeorm";
import { ITopic } from "../../../core/topic/topic.interface";
import { Test } from "../../test/entities/test.entity";

@Entity('topic')
export class Topic extends BaseEntity implements ITopic {
    title: string;

    @ManyToMany(() => Test, {})
    tests: Test[];
}
