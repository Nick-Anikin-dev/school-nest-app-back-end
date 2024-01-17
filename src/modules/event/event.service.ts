import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { Any, Repository } from "typeorm";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { UserService } from "../user/user.service";

@Injectable()
export class EventService {
  constructor(
      @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
      private readonly userService: UserService,
  ) {
  }

  async create(dto: CreateEventDto, user: AuthUser) {
    const new_event = this.eventRepository.create(dto);
    return await this.eventRepository.save(new_event);
  }

  async findAll(user: AuthUser, school_id: number) {
    const member = await this.userService.findOne(user.id);
    return await this.eventRepository.find({
      where: {
        school_id,
        // guests: {
        //   id: Any([ member.role.id ])
        // }
      },
      relations: [ 'guests.user' ]
    });
  }

  async findOne(id: number, user: AuthUser) {
    return await this.eventRepository.findOne({
      where: {
        id,
      },
      relations: [ 'guests.user' ]
    })
  }

  async update(id: number, dto: UpdateEventDto, user: AuthUser) {
    return await this.eventRepository.update({id}, dto);
  }

  async remove(id: number) {
    return await this.eventRepository.softDelete({id});
  }
}
