import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserRoleService } from "../user-role/user-role.service";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

@Injectable()
export class UserService {
  constructor(
      private readonly userRoleService: UserRoleService,
      @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(dto: CreateUserDto) {
    const {role, ...partial} = dto;
    const new_user = this.userRepository.create(partial);
    const user = await this.userRepository.save(new_user);
    const user_role = await this.userRoleService.create({
      user_id: user.id,
      type: role,
    })

    return await this.userRepository.save({
      ...user,
      role: user_role,
    })
  }

  async findOneWhere(options: FindOptionsWhere<User>) {
    return await this.userRepository.findOne({
      where: options,
    })
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {id}, relations: [
        'role'
      ]
    });
  }
}
