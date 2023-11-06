import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCooperationDto } from './dto/create-cooperation.dto';
import { UpdateCooperationDto } from './dto/update-cooperation.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { RequestForCooperation } from "./entities/cooperation.entity";
import { Brackets, Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { RequestForCooperationStatus } from "../../core/cooperation/enums/request-for-cooperation-status.enum";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { FindRfcQueryDto } from "./dto/find-rfc-query.dto";

@Injectable()
export class CooperationService {
  constructor(
      @InjectRepository(RequestForCooperation) private readonly requestForCooperationRepository: Repository<RequestForCooperation>,
      private readonly userService: UserService,
  ) {
  }

  async create(dto: CreateCooperationDto, user: AuthUser) {
    const {recipient_id} = dto;

    const recipient = await this.userService.findOne(recipient_id);

    if (!recipient) {
      throw new NotFoundException();
    }

    const new_request = this.requestForCooperationRepository.create({
      ...dto,
      sender_id: user.id,
      status: RequestForCooperationStatus.PENDING
    });

    return await this.requestForCooperationRepository.save(new_request);
  }

  async findAll(dto: FindRfcQueryDto, user: AuthUser) {
    const {type, status, created_to, created_from} = dto;
    return await this.requestForCooperationRepository.createQueryBuilder('request')
        .where(
            new Brackets(qb => qb.where('request.sender_id=:id', {id: user.id})
                .orWhere('request.recipient_id=:id', {id: user.id})
            ))
        .andWhere(!!status && 'status IN (:...status)', {status})
        .andWhere(!!created_to && 'created_at >= :created_from', {created_to})
        .andWhere(!!created_from && 'created_at <= :created_to', {created_from})
        .getMany();
  }

  async findOne(id: number) {
    return await this.requestForCooperationRepository.findOne({where: {id}});
  }

  async update(id: number, dto: UpdateCooperationDto) {
    return await this.requestForCooperationRepository.update({id}, dto);
  }

  async applyCooperation() {
    return null;
  }

  async rejectCooperation() {
    return null;
  }

  async remove(id: number) {
    return await this.requestForCooperationRepository.softDelete({id});
  }
}
