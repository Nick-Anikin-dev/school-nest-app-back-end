import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CooperationService } from './cooperation.service';
import { CreateCooperationDto } from './dto/create-cooperation.dto';
import { UpdateCooperationDto } from './dto/update-cooperation.dto';

@Controller('cooperation')
export class CooperationController {
  constructor(private readonly requestForCooperationService: CooperationService) {}

  @Post()
  create(@Body() createRequestForCooperationDto: CreateCooperationDto) {
    return this.requestForCooperationService.create(createRequestForCooperationDto);
  }

  @Get()
  findAll() {
    return this.requestForCooperationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestForCooperationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestForCooperationDto: UpdateCooperationDto) {
    return this.requestForCooperationService.update(+id, updateRequestForCooperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestForCooperationService.remove(+id);
  }
}
