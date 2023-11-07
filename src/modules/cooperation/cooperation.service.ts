import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCooperationDto } from './dto/create-cooperation.dto';
import { UpdateCooperationDto } from './dto/update-cooperation.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { RequestForCooperation } from "./entities/cooperation.entity";
import { Brackets, Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { RequestForCooperationStatus } from "../../core/cooperation/enums/request-for-cooperation-status.enum";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { FindRfcQueryDto } from "./dto/find-rfc-query.dto";
import { RespondCooperationDto } from "./dto/respond-cooperation.dto";
import { SchoolService } from "../school/school.service";
import { SchoolManagerRoles } from "../../common/constants/school-role-groups";

@Injectable()
export class CooperationService {
  constructor(
      @InjectRepository(RequestForCooperation) private readonly requestForCooperationRepository: Repository<RequestForCooperation>,
      private readonly userService: UserService,
      private readonly schoolService: SchoolService,
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
    try {
      return await this.requestForCooperationRepository.findOneOrFail({where: {id}});
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async update(id: number, dto: UpdateCooperationDto) {
    return await this.requestForCooperationRepository.update({id}, dto);
  }

  async respond(id: number, user: AuthUser, dto: RespondCooperationDto) {
    const cooperation = await this.requestForCooperationRepository.findOne({where: {id}});
    if (!cooperation) {
      throw new NotFoundException();
    }
    if (cooperation.recipient_id !== user.id) {
      throw new ForbiddenException();
    }
    const {approve} = dto;

    if (!approve) {
      return await this.requestForCooperationRepository.save({
        ...cooperation,
        status: RequestForCooperationStatus.REJECTED
      })
    }
    return await this.handleApproveCooperation(cooperation, user, cooperation.sender_id);
  }

  async handleApproveCooperation(cooperation: RequestForCooperation, recipient: AuthUser, sender_id: number) {
    const responder = await this.userService.findOne(recipient.id);
    const sender = await this.userService.findOne(sender_id);
    const is_sender_school_manager = SchoolManagerRoles.includes(sender.role.type);
    const is_responder_school_manager = SchoolManagerRoles.includes(responder.role.type);

    if (!is_responder_school_manager && !is_sender_school_manager) {
      throw new BadRequestException();
    }

    await this.schoolService.addCandidate(
        is_sender_school_manager ? responder : sender,
        is_sender_school_manager ? sender : responder
    );
    return this.requestForCooperationRepository.save({...cooperation, status: RequestForCooperationStatus.APPROVED})
  }


  async remove(id: number) {
    return await this.requestForCooperationRepository.softDelete({id});
  }
}
