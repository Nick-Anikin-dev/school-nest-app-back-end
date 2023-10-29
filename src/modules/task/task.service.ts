import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  async create(dto: CreateTaskDto) {
    return await Promise.resolve();
  }

  async findAll() {
    return await Promise.resolve();
  }

  async findOne(id: number) {
    return await Promise.resolve();
  }

  async update(id: number, dto: UpdateTaskDto) {
    return await Promise.resolve();
  }

  async remove(id: number) {
    return await Promise.resolve();
  }
}
