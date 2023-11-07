import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { RolesGuard } from "../../common/guards/roles.guard";
import { User } from "../../common/decorators/user.decorator";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { Roles } from "../../common/decorators/role.decorator";
import { Role } from "../../common/types/enums/role.enum";

@Controller('topic')
@UseGuards(RolesGuard)
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @Roles(Role.TEACHER)
  async create(@Body() dto: CreateTopicDto, @User() user: AuthUser) {
    return await this.topicService.create(dto, user);
  }

  @Get()
  @Roles(Role.TEACHER)
  async findAll() {
    return await this.topicService.findAll();
  }

  @Get(':id')
  @Roles(Role.TEACHER)
  async findOne(@Param('id') id: string) {
    return await this.topicService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.TEACHER)
  async update(@Param('id') id: string, @Body() dto: UpdateTopicDto) {
    return await this.topicService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(Role.TEACHER)
  async remove(@Param('id') id: string) {
    return await this.topicService.remove(+id);
  }
}
