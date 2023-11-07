import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Topic } from "./entities/topic.entity";
import { In, Repository } from "typeorm";
import { ExerciseService } from "../exercise/exercise.service";
import { TeacherService } from "../teacher/teacher.service";

@Injectable()
export class TopicService {
  constructor(
      @InjectRepository(Topic) private readonly topicRepository: Repository<Topic>,
      private readonly exerciseService: ExerciseService,
      private readonly teacherService: TeacherService,
  ) {}

  async create(dto: CreateTopicDto, user: AuthUser) {
    const {exercise_ids, ...partial} = dto;
    const additional_payload: Partial<Pick<Topic, 'exercises'>> = {};
    if (exercise_ids) {
      additional_payload.exercises = await this.exerciseService.findWhere({
        id: In(exercise_ids)
      })
    }
    const teacher = await this.teacherService.findOneWhere({
      user_role: {
        user_id: user.id
      }
    })
    const new_topic = await this.topicRepository.create({...partial, ...additional_payload, teacher});
    return await this.topicRepository.save(new_topic);
  }

  async findAll() {
    return await this.topicRepository.find();
  }

  async findOne(id: number) {
    return await this.topicRepository.findOne({where: {id}});
  }

  async update(id: number, dto: UpdateTopicDto) {
    return await this.topicRepository.update({id}, dto);
  }

  async remove(id: number) {
    return await this.topicRepository.softDelete({id});
  }
}
