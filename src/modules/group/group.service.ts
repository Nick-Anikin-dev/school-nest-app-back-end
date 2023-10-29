import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Repository } from "typeorm";

@Injectable()
export class GroupService {
  constructor(@InjectRepository(Group) private readonly groupRepository: Repository<Group>) {}

  async create(dto: CreateGroupDto) {
    const new_group = this.groupRepository.create(dto);
    return await this.groupRepository.save(new_group);
  }

  async findAll() {
    return await this.groupRepository.find();
  }

  async findOne(id: number) {
    return await this.groupRepository.findOne({where: {id}});
  }

  async update(id: number, dto: UpdateGroupDto) {
    return await this.groupRepository.update({id}, dto);
  }

  async remove(id: number) {
    return await this.groupRepository.softDelete({id});
  }
}
