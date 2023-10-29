import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
  create(dto: CreateTestDto) {
    return 'This action adds a new testTask';
  }

  findAll() {
    return `This action returns all testTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testTask`;
  }

  update(id: number, dto: UpdateTestDto) {
    return `This action updates a #${id} testTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} testTask`;
  }
}
