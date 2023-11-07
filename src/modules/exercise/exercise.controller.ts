import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { RolesGuard } from "../../common/guards/roles.guard";

@Controller('test-task')
@UseGuards(RolesGuard)
export class ExerciseController {
  constructor(private readonly testTaskService: ExerciseService) {}

  @Post()
  async create(@Body() dto: CreateExerciseDto) {
    return await this.testTaskService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.testTaskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.testTaskService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTestTaskDto: UpdateExerciseDto) {
    return await this.testTaskService.update(+id, updateTestTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.testTaskService.remove(+id);
  }
}
