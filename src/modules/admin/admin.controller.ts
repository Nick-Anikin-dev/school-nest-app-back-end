import { Controller, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from "../../common/guards/roles.guard";

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
