import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from "../../common/decorators/user.decorator";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/role.decorator";
import { Role } from "../../common/types/enums/role.enum";

@Controller('event')
@UseGuards(RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createEventDto: CreateEventDto, @User() user: AuthUser) {
    return await this.eventService.create(createEventDto, user);
  }

  @Get('school/:id')
  @Roles(Role.ADMIN)
  async findAll(@User() user: AuthUser) {
    return await this.eventService.findAll(user);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async findOne(@Param('id') id: string, @User() user: AuthUser) {
    return await this.eventService.findOne(+id, user);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @User() user: AuthUser) {
    return await this.eventService.update(+id, updateEventDto, user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string, @User() user: AuthUser) {
    return await this.eventService.remove(+id, user);
  }
}
