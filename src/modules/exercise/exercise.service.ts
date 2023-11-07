import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Exercise } from "./entities/exercise.entity";
import { Repository } from "typeorm";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

@Injectable()
export class ExerciseService {
  constructor(@InjectRepository(Exercise) private readonly exerciseRepository: Repository<Exercise>) {
  }

  async create(dto: CreateExerciseDto) {
    const new_exercise = this.exerciseRepository.create(dto);
    return await this.exerciseRepository.save(new_exercise);
  }

  async findAll() {
    return await this.exerciseRepository.find();
  }

  async findOne(id: number) {
    return await this.exerciseRepository.findOne({where: {id}});
  }

  async update(id: number, dto: UpdateExerciseDto) {
    return await this.exerciseRepository.update({id}, dto);
  }

  async remove(id: number) {
    return await this.exerciseRepository.softDelete({id});
  }

  async findWhere(options: FindOptionsWhere<Exercise>) {
    return await this.exerciseRepository.find({
      where: options,
    });
  }
}
