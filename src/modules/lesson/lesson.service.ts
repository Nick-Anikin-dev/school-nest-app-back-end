import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "./entities/lesson.entity";
import { In, Repository } from "typeorm";
import { StudentService } from "../student/student.service";
import { TeacherService } from "../teacher/teacher.service";
import { GroupService } from "../group/group.service";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { FindLessonsQueryDto } from "./dto/find-lessons-query.dto";

@Injectable()
export class LessonService {
  constructor(
      @InjectRepository(Lesson) private readonly lessonRepository: Repository<Lesson>,
      private readonly studentService: StudentService,
      private readonly teacherService: TeacherService,
      private readonly groupService: GroupService,
  ) {
  }

  async create(dto: CreateLessonDto, user: AuthUser) {
    const {teacher_ids, student_ids, group_id, ...partial} = dto;
    const partial_participants: Partial<Pick<Lesson, 'teachers' | 'students' | 'group'>> = {};
    if (student_ids) {
      partial_participants.students = await this.studentService.findWhere({
        id: In(student_ids),
      });
    }

    if (teacher_ids) {
      partial_participants.teachers = await this.teacherService.findWhere({
        id: In(teacher_ids),
      });
    }

    if (group_id) {
      partial_participants.group = await this.groupService.findOneById(group_id);
    }

    const new_lesson = this.lessonRepository.create({...partial, ...partial_participants});
    return await this.lessonRepository.save(new_lesson);
  }

  async findAll(user: AuthUser, query: FindLessonsQueryDto) {
    return await this.lessonRepository.find();
  }

  async findOne(id: number) {
    return await this.lessonRepository.findOne({where: {id}});
  }

  async update(id: number, dto: UpdateLessonDto) {
    const {teacher_ids, student_ids, group_id, ...partial} = dto;
    const lesson = await this.lessonRepository.findOne({
      where: {
        id
      }
    })
    if (!lesson) {
      throw new NotFoundException();
    }
    const partial_participants: Partial<Pick<Lesson, 'teachers' | 'students' | 'group'>> = {};
    if (student_ids) {
      partial_participants.students = await this.studentService.findWhere({
        id: In(student_ids),
      });
    }

    if (teacher_ids) {
      partial_participants.teachers = await this.teacherService.findWhere({
        id: In(teacher_ids),
      });
    }

    if (group_id) {
      partial_participants.group = await this.groupService.findOneById(group_id);
    }

    return await this.lessonRepository.save({...lesson, ...partial, ...partial_participants})
  }

  async remove(id: number) {
    return await this.lessonRepository.softDelete({id});
  }
}
