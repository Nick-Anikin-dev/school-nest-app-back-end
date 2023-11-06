import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/role.decorator";
import { Role } from "../../common/types/enums/role.enum";
import { User } from "../../common/decorators/user.decorator";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";

@Controller('school')
@UseGuards(RolesGuard)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  async create(@Body() dto: CreateSchoolDto, @User() user: AuthUser) {
    return await this.schoolService.create(dto, user);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN)
  async findAll() {
    return await this.schoolService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async findOne(@Param('id') id: string) {
    return await this.schoolService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async update(@Param('id') id: string, @Body() dto: UpdateSchoolDto) {
    return await this.schoolService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  async remove(@Param('id') id: string) {
    return await this.schoolService.remove(+id);
  }
}
