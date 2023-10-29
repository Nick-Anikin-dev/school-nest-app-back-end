import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CooperationService } from './cooperation.service';
import { CreateCooperationDto } from './dto/create-cooperation.dto';
import { UpdateCooperationDto } from './dto/update-cooperation.dto';

@Controller('cooperation')
export class CooperationController {
  constructor(private readonly requestForCooperationService: CooperationService) {}

  @Post()
  async create(@Body() createRequestForCooperationDto: CreateCooperationDto) {
    return await this.requestForCooperationService.create(createRequestForCooperationDto);
  }

  @Get()
  async findAll() {
    return await this.requestForCooperationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.requestForCooperationService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRequestForCooperationDto: UpdateCooperationDto) {
    return await this.requestForCooperationService.update(+id, updateRequestForCooperationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.requestForCooperationService.remove(+id);
  }
}
