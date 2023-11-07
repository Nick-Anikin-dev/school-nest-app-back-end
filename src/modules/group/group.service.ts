import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { In, Repository } from "typeorm";
import { TeacherService } from "../teacher/teacher.service";
import { StudentService } from "../student/student.service";

@Injectable()
export class GroupService {
  constructor(@InjectRepository(Group) private readonly groupRepository: Repository<Group>,
              private readonly teacherService: TeacherService,
              private readonly studentService: StudentService,
  ) {
  }

  async create(dto: CreateGroupDto) {
    const {student_ids, teacher_ids, name, school_id} = dto;
    const partial_participants: Partial<Pick<Group, 'teachers' | 'students'>> = {};
    if (student_ids) {
      partial_participants.students = await this.studentService.findWhere({
        id: In(student_ids),
        school_id,
      });
    }
    if (teacher_ids) {
      partial_participants.teachers = await this.teacherService.findWhere({
        id: In(teacher_ids),
        school_id,
      });
    }
    const new_group = this.groupRepository.create({
      name,
      school_id,
      ...partial_participants,
    });

    return await this.groupRepository.save(new_group);
  }

  async findAll(school_id: number) {
    return await this.groupRepository.find({
      where: {
        school_id,
      }
    });
  }

  async findOne(id: number, school_id: number) {
    return await this.groupRepository.findOne({where: {id, school_id}});
  }

  async findOneById(id: number){
    return await this.groupRepository.findOne({where: {id}})
  }

  async update(id: number, school_id: number, dto: UpdateGroupDto) {
    const group = await this.groupRepository.findOne({
      where: {
        id,
        school_id,
      }
    })
    if (!group) {
      throw new NotFoundException();
    }
    const {student_ids, teacher_ids, ...partial} = dto;
    const partial_participants: Partial<Pick<Group, 'teachers' | 'students'>> = {};

    if (student_ids) {
      partial_participants.students = await this.studentService.findWhere({
        id: In(student_ids),
        school_id,
      });
    }
    if (teacher_ids) {
      partial_participants.teachers = await this.teacherService.findWhere({
        id: In(teacher_ids),
        school_id,
      });
    }

    return await this.groupRepository.save({...group, ...partial, ...partial_participants});
  }

  async remove(id: number, school_id: number) {
    return await this.groupRepository.softDelete({id, school_id});
  }
}
