import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Controller('test-task')
export class TestController {
  constructor(private readonly testTaskService: TestService) {}

  @Post()
  create(@Body() createTestTaskDto: CreateTestDto) {
    return this.testTaskService.create(createTestTaskDto);
  }

  @Get()
  findAll() {
    return this.testTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestTaskDto: UpdateTestDto) {
    return this.testTaskService.update(+id, updateTestTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testTaskService.remove(+id);
  }
}
