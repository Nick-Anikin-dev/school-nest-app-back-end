import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "./entities/lesson.entity";
import { Repository } from "typeorm";

@Injectable()
export class LessonService {
  constructor(@InjectRepository(Lesson) private readonly lessonRepository: Repository<Lesson>) {}

  async create(dto: CreateLessonDto) {
    const new_lesson = this.lessonRepository.create(dto);
    return await this.lessonRepository.save(new_lesson);
  }

  async findAll() {
    return await this.lessonRepository.find();
  }

  async findOne(id: number) {
    return await this.lessonRepository.findOne({where: {id}});
  }

  async update(id: number, dto: UpdateLessonDto) {
    return await this.lessonRepository.update({id}, dto)
  }

  async remove(id: number) {
    return await this.lessonRepository.softDelete({id});
  }
}
