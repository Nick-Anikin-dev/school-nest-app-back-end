import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { School } from "./entities/school.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";

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
    return await this.schoolRepository.findOne({where: {id}});
  }

  async update(id: number, dto: UpdateSchoolDto) {
    return await this.schoolRepository.update({id}, dto);
  }

  async remove(id: number) {
    return await this.schoolRepository.softDelete({id});
  }
}
