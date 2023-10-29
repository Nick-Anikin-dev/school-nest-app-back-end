import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCooperationDto } from './dto/create-cooperation.dto';
import { UpdateCooperationDto } from './dto/update-cooperation.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { RequestForCooperation } from "./entities/cooperation.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { RequestForCooperationStatus } from "../../core/cooperation/enums/request-for-cooperation-status.enum";

@Injectable()
export class CooperationService {
  constructor(
      @InjectRepository(RequestForCooperation) private readonly requestForCooperationRepository: Repository<RequestForCooperation>,
      private readonly userService: UserService,
  ) {}

  async create(dto: CreateCooperationDto) {
    const {sender_id, recipient_id} = dto;

    const sender = await this.userService.findOne(sender_id);
    const recipient = await this.userService.findOne(recipient_id);

    if (!sender || !recipient) {
      throw new NotFoundException();
    }

    const new_request = this.requestForCooperationRepository.create({
      ...dto,
      status: RequestForCooperationStatus.PENDING
    });

    return await this.requestForCooperationRepository.save(new_request);
  }

  async findAll() {
    return await this.requestForCooperationRepository.find();
  }

  async findOne(id: number) {
    return await this.requestForCooperationRepository.findOne({where: {id}});
  }

  async update(id: number, dto: UpdateCooperationDto) {
    return await this.requestForCooperationRepository.update({id}, dto);
  }

  async remove(id: number) {
    return await this.requestForCooperationRepository.softDelete({id});
  }
}
