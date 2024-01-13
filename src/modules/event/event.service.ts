import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { Repository } from "typeorm";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>) {
  }

  async create(dto: CreateEventDto, user: AuthUser) {
    return await 'This action adds a new event';
  }

  async findAll(user: AuthUser) {
    return await `This action returns all event`;
  }

  async findOne(id: number, user: AuthUser) {
    return await `This action returns a #${id} event`;
  }

  async update(id: number, dto: UpdateEventDto, user: AuthUser) {
    return await `This action updates a #${id} event`;
  }

  async remove(id: number, user: AuthUser) {
    return await `This action removes a #${id} event`;
  }
}
