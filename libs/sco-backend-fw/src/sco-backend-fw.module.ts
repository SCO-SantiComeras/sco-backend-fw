
import { Module } from '@nestjs/common';
import { ScoBackendModule } from './sco-backend/sco-backend.module';

@Module({
  imports: [
    ScoBackendModule,
  ],
  exports: [
    ScoBackendModule,
  ],
})

export class ScoBackendFwModule {}
