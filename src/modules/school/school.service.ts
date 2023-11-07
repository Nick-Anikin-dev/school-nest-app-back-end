import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { School } from "./entities/school.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { UserRoleSchoolMap } from "../../common/constants/user-role-school-map";

@Injectable()
export class SchoolService {
  constructor(
      @InjectRepository(School) private readonly schoolRepository: Repository<School>,
      private readonly userService: UserService,
  ) {
  }

  async create(dto: CreateSchoolDto, user: AuthUser) {
    const candidate = await this.userService.findOne(user.id);
    const new_school = this.schoolRepository.create({...dto, owner_role_id: candidate.role.id});
    return await this.schoolRepository.save(new_school);
  }

  async findAll() {
    return await this.schoolRepository.find();
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
}
