import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { RolesGuard } from "../../common/guards/roles.guard";
import { User } from "../../common/decorators/user.decorator";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { Roles } from "../../common/decorators/role.decorator";
import { Role } from "../../common/types/enums/role.enum";
import { GroupParamsDto } from "./dto/group-params.dto";

@Controller('group')
@UseGuards(RolesGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() dto: CreateGroupDto, @User() user: AuthUser) {
    return await this.groupService.create(dto);
  }

  @Get('/school/:school_id')
  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT)
  async findAll(@Param('school_id') school_id: string) {
    return await this.groupService.findAll(+school_id);
  }

  @Get(':id/school/:school_id')
  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT)
  async findOne(@Param() params: GroupParamsDto) {
    return await this.groupService.findOne(params.id, params.school_id);
  }

  @Patch(':id/school/:school_id')
  @Roles(Role.ADMIN)
  async update(@Param() params: GroupParamsDto, @Body() dto: UpdateGroupDto) {
    return await this.groupService.update(+params.id, +params.school_id, dto);
  }

  @Delete(':id/school/:school_id')
  @Roles(Role.ADMIN)
  async remove(@Param() params: GroupParamsDto) {
    return await this.groupService.remove(params.id, params.school_id);
  }
}
