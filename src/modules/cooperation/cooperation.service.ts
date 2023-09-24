import { Injectable } from '@nestjs/common';
import { CreateCooperationDto } from './dto/create-cooperation.dto';
import { UpdateCooperationDto } from './dto/update-cooperation.dto';

@Injectable()
export class CooperationService {
  create(createRequestForCooperationDto: CreateCooperationDto) {
    return 'This action adds a new requestForCooperation';
  }

  findAll() {
    return `This action returns all requestForCooperation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestForCooperation`;
  }

  update(id: number, updateRequestForCooperationDto: UpdateCooperationDto) {
    return `This action updates a #${id} requestForCooperation`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestForCooperation`;
  }
}
