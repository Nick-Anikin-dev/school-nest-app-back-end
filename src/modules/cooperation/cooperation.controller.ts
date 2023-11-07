import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CooperationService } from './cooperation.service';
import { CreateCooperationDto } from './dto/create-cooperation.dto';
import { UpdateCooperationDto } from './dto/update-cooperation.dto';
import { User } from "../../common/decorators/user.decorator";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { FindRfcQueryDto } from "./dto/find-rfc-query.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RespondCooperationDto } from "./dto/respond-cooperation.dto";

@Controller('cooperation')
@UseGuards(JwtAuthGuard)
export class CooperationController {
  constructor(private readonly requestForCooperationService: CooperationService) {}

  @Post()
  async create(@Body() createRequestForCooperationDto: CreateCooperationDto, @User() user: AuthUser) {
    return await this.requestForCooperationService.create(createRequestForCooperationDto, user);
  }

  @Get()
  async findAll(@Query() dto: FindRfcQueryDto, @User() user: AuthUser) {
    return await this.requestForCooperationService.findAll(dto, user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.requestForCooperationService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRequestForCooperationDto: UpdateCooperationDto) {
    return await this.requestForCooperationService.update(+id, updateRequestForCooperationDto);
  }

  @Patch(':id/respond')
  async respond(@Param('id') id: string, @User() user: AuthUser, @Body() dto: RespondCooperationDto){
    return await this.requestForCooperationService.respond(+id, user, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.requestForCooperationService.remove(+id);
  }
}
