import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./entities/admin.entity";

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private readonly adminRepository: Repository<Admin>) {
  }

  async create(user_role_id: number) {
    const new_admin = await this.adminRepository.create({user_role_id})
    return await this.adminRepository.save(new_admin);
  }
}
