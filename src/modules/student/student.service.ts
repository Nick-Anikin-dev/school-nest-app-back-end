import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Brackets, In, Repository } from "typeorm";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { FindStudentQueryDto } from "./dto/find-student-query.dto";
import { IPaginated } from "../../common/types/interfaces/paginated.interface";
import { FindStudentResponseDto } from "./dto/find-student-response.dto";
import { findUserRolesTransformer } from "../../common/utils/find-user-roles-transformer";
import { AssignTeachersDto } from "./dto/assign-teachers.dto";
import { TeacherService } from "../teacher/teacher.service";
import { transformUserRoles } from "../../common/utils/transform-user-roles";
import { transformStudent } from "./transformers/transform-student";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
        @Inject(forwardRef(() => TeacherService))
        private readonly teacherService: TeacherService,
    ) {
    }

    async create(user_role_id: number) {
        const new_student = await this.studentRepository.create({user_role_id})
        return await this.studentRepository.save(new_student);
    }

    async find(school_id: number, query: FindStudentQueryDto): Promise<IPaginated<FindStudentResponseDto>> {
        const {page, per_page, search} = query;
        const [ students, total ] = await this.studentRepository.createQueryBuilder('student')
            .select([
                'student.id',
                'user.id',
                'user.first_name as first_name',
                'user.last_name as last_name',
                'user.email as email',
            ])
            .leftJoinAndSelect('student.user_role', 'user_role', 'user_role.id = student.user_role_id')
            .leftJoinAndSelect('user_role.user', 'user', 'user.id = user_role.user_id')
            .offset((page - 1) * per_page)
            .limit(per_page)
            .where('student.school_id = :school_id', {school_id})
            .andWhere(
                !!search &&
                new Brackets(qb =>
                    qb.where('user.first_name=:search').orWhere('user.last_name=:search')), {
                    search,
                })
            .getManyAndCount();
        return {
            data: findUserRolesTransformer(students),
            total,
            per_page,
            page,
            last_page: Math.ceil(total / per_page)
        };
    }

    async findWhere(options: FindOptionsWhere<Student>) {
        return await this.studentRepository.find({
            where: options,
        });
    }

    async findStudentsList(school_id: number, query: FindStudentQueryDto) {
        const {search} = query;
        const qb = this.studentRepository.createQueryBuilder('student')
            .select([
                'student.id as id',
                'user.first_name as first_name',
                'user.last_name as last_name'
            ])
            .where('student.school_id=:school_id', {school_id})
            .leftJoin('student.user_role', 'user_role')
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
        const student = await this.studentRepository.findOne({
            relations: [ 'user_role.user', 'teachers.user_role.user', 'groups.students', 'groups.teachers' ],
            where: {id},
        });
        return transformStudent(student)
    }

    async assignTeachers(id: number, dto: AssignTeachersDto) {
        const student = await this.studentRepository.findOne({
            where: {
                id,
            },
            relations: [ 'teachers' ],
        })
        if (!student) {
            throw new NotFoundException();
        }
        const {teacher_ids} = dto;
        const teachers = await this.teacherService.findWhere({
            id: In(teacher_ids)
        })
        return await this.studentRepository.save({...student, teachers: [ ...student.teachers, ...teachers ]});
    }
}
