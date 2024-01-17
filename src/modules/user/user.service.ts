import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserRoleService } from "../user-role/user-role.service";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ConfigService } from "@nestjs/config";
import { FindUsersForCooperationQuery } from "./dto/find-users-for-cooperation.query";


@Injectable()
export class UserService {
  constructor(
      private readonly userRoleService: UserRoleService,
      private readonly configService: ConfigService,
      @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
  }

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
    const user = await this.userRepository.findOne({
      where: {id}, relations: [
        'role'
      ]
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updatePassword(user_id, password) {
    return await this.userRepository.update({id: user_id}, {password})
  }

  async find() {
    return await this.userRepository.find({
      relations: [ 'role' ],
    })
  }

  async updateProfile(user: AuthUser, dto: UpdateProfileDto, avatar: Express.Multer.File) {
    let payload = dto;
    if (avatar) {
      const avatar_url = `${this.configService.get('SERVER_URL')}:${this.configService.get('PORT')}/${avatar.filename}`;
      payload = {...payload, avatar_url}
    }
    return await this.userRepository.update({id: user.id}, payload);
  }

  async getProfileData(user: AuthUser) {
    return await this.userRepository.findOne({
      select: [ 'id', 'first_name', 'last_name', 'email', 'interests', 'created_at', 'self_presentation', 'avatar_url' ],
      where: {
        id: user.id,
      },
      relations: [ 'role.student.school', 'role.teacher.school', 'role.admin.school' ]
    })
  }

    async findUsersForCooperation(query: FindUsersForCooperationQuery) {
        const {search, role} = query;
        return await this.userRepository.createQueryBuilder('user')
            .leftJoin('user.role', 'role')
            .leftJoin('user.role', 'role')
            .where('')
            .getMany()
    }
}
