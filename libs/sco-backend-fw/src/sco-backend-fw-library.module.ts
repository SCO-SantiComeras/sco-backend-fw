
import { Module } from '@nestjs/common';
import { ScoBackendFwModule } from './sco-backend-fw/sco-backend-fw.module';

@Module({
  imports: [
    ScoBackendFwModule,
  ],
  exports: [
    ScoBackendFwModule,
  ],
})

export class ScoBackendFwLibraryModule {}
