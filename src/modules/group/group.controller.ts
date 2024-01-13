import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { RolesGuard } from "../../common/guards/roles.guard";
import { User } from "../../common/decorators/user.decorator";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { Roles } from "../../common/decorators/role.decorator";
import { Role } from "../../common/types/enums/role.enum";
import { GroupParamsDto } from "./dto/group-params.dto";
import { FindGroupQueryDto } from "./dto/find-group-query.dto";

@Controller('group')
//@UseGuards(RolesGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() dto: CreateGroupDto, @User() user: AuthUser) {
    return await this.groupService.create(dto);
  }

  @Get('/school/:school_id')
  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT)
  async find(@Param('school_id') school_id: string, @Query() query: FindGroupQueryDto) {
    return await this.groupService.find(+school_id, query);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT)
  async findOne(@Param('id') id: string) {
    return await this.groupService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() dto: UpdateGroupDto) {
    return await this.groupService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.groupService.remove(+id);
  }
}
