import { Module } from '@nestjs/common';
import { CooperationService } from './cooperation.service';
import { CooperationController } from './cooperation.controller';

@Module({
  controllers: [CooperationController],
  providers: [CooperationService]
})
export class CooperationModule {}
