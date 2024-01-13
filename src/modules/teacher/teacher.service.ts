import { forwardRef, Inject, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { Brackets, In, Repository } from "typeorm";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { RolesGuard } from "../../common/guards/roles.guard";
import { StudentService } from "../student/student.service";
import { AssignStudentsDto } from "./dto/assign-students.dto";
import { IPaginated } from "../../common/types/interfaces/paginated.interface";
import { findUserRolesTransformer } from "../../common/utils/find-user-roles-transformer";
import { BaseFindQuery } from "../../common/types/base-find-query";
import { FindTeacherResponseDto } from "./dto/find-teacher-response.dto";
import { transformTeacher } from "./transformers/transform-teacher";

@Injectable()
@UseGuards(RolesGuard)
export class TeacherService {
    constructor(
        @InjectRepository(Teacher) private readonly teacherRepository: Repository<Teacher>,
        @Inject(forwardRef(() => StudentService))
        private readonly studentService: StudentService,
    ) {
    }

    async create(user_role_id: number) {
        const new_teacher = await this.teacherRepository.create({user_role_id})
        return await this.teacherRepository.save(new_teacher);
    }

    async find(school_id: number, query: BaseFindQuery): Promise<IPaginated<FindTeacherResponseDto>> {
        const {page, per_page, search} = query;
        const [ students, total ] = await this.teacherRepository.createQueryBuilder('teacher')
            .select([
                'teacher.id',
                'user.id',
                'user.first_name as first_name',
                'user.last_name as last_name',
                'user.email as email',
            ])
            .leftJoinAndSelect('teacher.user_role', 'user_role', 'user_role.id = teacher.user_role_id')
            .leftJoinAndSelect('user_role.user', 'user', 'user.id = user_role.user_id')
            .offset((page - 1) * per_page)
            .limit(per_page)
            .where('teacher.school_id = :school_id', {school_id})
            .andWhere(
                !!search &&
                new Brackets(qb =>
                    qb.where(`user.first_name ILIKE '%${search}%'`).orWhere(`user.last_name ILIKE '${search}'`)))
            .getManyAndCount();
        return {
            data: findUserRolesTransformer(students),
            total,
            per_page,
            page,
            last_page: Math.ceil(total / per_page)
        };
    }

    async findOneWhere(options: FindOptionsWhere<Teacher>) {
        return await this.teacherRepository.findOne({
            where: options,
        });
    }

    async findWhere(options: FindOptionsWhere<Teacher>) {
        return await this.teacherRepository.find({
            where: options,
        });
    }

    async assignStudents(id: number, dto: AssignStudentsDto) {
        const teacher = await this.teacherRepository.findOne({
            where: {
                id,
            },
            relations: [ 'students' ],
        })
        if (!teacher) {
            throw new NotFoundException();
        }
        const {student_ids} = dto;
        const students = await this.studentService.findWhere({
            id: In(student_ids)
        })
        return await this.teacherRepository.save({...teacher, students: [ ...teacher.students, ...students ]});
    }

    async findTeachersList(school_id: number, query: BaseFindQuery) {
        const {search} = query;
        const qb = this.teacherRepository.createQueryBuilder('teacher')
            .select([
                'teacher.id as id',
                'user.first_name as first_name',
                'user.last_name as last_name'
            ])
            .where('teacher.school_id=:school_id', {school_id})
            .leftJoin('teacher.user_role', 'user_role')
            .leftJoin('user_role.user', 'user')

        if (search) {
            qb.andWhere(
                new Brackets(qb =>
                    qb.where('user.first_name ILike :search', {search: `%${search}%`})
                        .orWhere('user.last_name ILike :search', {search: `%${search}%`})))
        }

        return await qb.getRawMany();
    }

    async findOne(id: number) {

        const teacher = await this.teacherRepository.findOne({
            relations: [ 'user_role.user', 'students.user_role.user', 'groups.students', 'groups.teachers' ],
            where: {id},
        });
        return transformTeacher(teacher)
    }
}
