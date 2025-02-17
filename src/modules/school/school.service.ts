import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { School } from "./entities/school.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { UserRoleSchoolMap } from "../../common/constants/user-role-school-map";
import { IUser } from "../../core/user/user.interface";
import * as bcrypt from 'bcryptjs';
import { JoinSchoolDto } from "./dto/join-school.dto";
import { UserRoleService } from "../user-role/user-role.service";

@Injectable()
export class SchoolService {
  constructor(
      @InjectRepository(School) private readonly schoolRepository: Repository<School>,
      private readonly userService: UserService,
      private readonly userRoleService: UserRoleService,
  ) {
  }

  async create(dto: CreateSchoolDto, user: AuthUser) {
    const candidate = await this.userService.findOne(user.id);
    const new_school = this.schoolRepository.create({...dto, owner_role_id: candidate.role.id});
    const school = await this.schoolRepository.save(new_school);
    const invitation_code = await bcrypt.hash(`${school.name}-${school.created_at}`, 5);
    await this.schoolRepository.update({id: school.id}, {invitation_code});
    return school;
  }

  async findAll(user: IUser) {
    return await this.schoolRepository.find({
      where: {
        // owner: {
        //   user_id: user.id
        // }
      },
      relations: [ "owner" ]
    });
  }

  async findOne(id: number) {
    return await this.schoolRepository.findOne({where: {id}, relations: [ 'students' ]});
  }

  async update(id: number, dto: UpdateSchoolDto) {
    return await this.schoolRepository.update({id}, dto);
  }

  async addCandidate(candidate: User, manager: User) {
    const school = await this.schoolRepository.findOne(
        {
          where: {id: manager.role[manager.role.type].school_id},
          relations: [ 'teachers', 'students', 'administrators' ]
        }
    );

    if (!school) {
      throw new BadRequestException();
    }
    const school_property = UserRoleSchoolMap[candidate.role.type];

    if (!school_property) {
      throw new BadRequestException()
    }
    return await this.schoolRepository.save({
      ...school,
      [school_property]: [ ...school[school_property], candidate.role[candidate.role.type] ]
    })
  }


  async remove(id: number, user: AuthUser) {
    const is_user_school_owner = await this.isUserSchoolOwner(user, id);
    if (!is_user_school_owner) {
      throw new ForbiddenException();
    }
    return await this.schoolRepository.softDelete({id});
  }

  async isUserSchoolOwner(user: AuthUser, school_id: number): Promise<boolean> {
    const school = await this.schoolRepository.findOne({
      where: {
        id: school_id,
        owner: {
          user_id: user.id,
        }
      }
    });
    return Boolean(school)
  }

  async joinSchool(user: AuthUser, dto: JoinSchoolDto) {
    const {invitation_code} = dto;
    const school = await this.schoolRepository.findOne({
      where: {
        invitation_code
      }
    })
    if(!school){
      throw new NotFoundException();
    }
    return await this.userRoleService.joinSchool(user, school);
  }
}
