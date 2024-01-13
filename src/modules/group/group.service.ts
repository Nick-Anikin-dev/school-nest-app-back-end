import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { In, Repository } from "typeorm";
import { TeacherService } from "../teacher/teacher.service";
import { StudentService } from "../student/student.service";
import { FindGroupQueryDto } from "./dto/find-group-query.dto";
import { transformGroup } from "./transformers/transform-group";

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


  async find(school_id: number, query: FindGroupQueryDto) {
    const {page, per_page, search} = query;
    const qb = this.groupRepository.createQueryBuilder('group')
        .select([
          'group.id as id',
          'group.name as name',
          'group.created_at as created_at',
          'count(students.id) as students_count',
          'count(teachers.id) as teachers_count'
        ])
        .leftJoin('group.students', 'students')
        .leftJoin('group.teachers', 'teachers')
        .offset((page - 1) * per_page)
        .limit(per_page)
        .where('group.school_id =:school_id', {school_id})
        .groupBy('group.id')

    if (search) {
      qb.andWhere('group.name ILike :search', {search: `%${search}%`})
    }

    const data = await qb.getRawMany();
    const total = await qb.getCount();
    return {
      data,
      total,
      per_page,
      page,
      last_page: Math.ceil(total / per_page)
    };
  }

  async findOne(id: number) {
    const group = await this.groupRepository.findOne({
      where: {id}, relations: [ 'students.user_role.user', 'teachers.user_role.user' ]
    });
    return transformGroup(group);
  }

  async findOneById(id: number) {
    return await this.groupRepository.findOne({where: {id}})
  }

  async update(id: number, dto: UpdateGroupDto) {
    const group = await this.groupRepository.findOne({
      where: {
        id,
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
        school_id: group.school_id,
      });
    }
    if (teacher_ids) {
      partial_participants.teachers = await this.teacherService.findWhere({
        id: In(teacher_ids),
        school_id: group.school_id,
      });

    }
    return await this.groupRepository.save({...group, ...partial, ...partial_participants});
  }

  async remove(id: number) {
    return await this.groupRepository.softDelete({id});
  }
}
