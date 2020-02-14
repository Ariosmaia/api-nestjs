import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';

// nest generate module backoffice
@Module({
  imports: [BackofficeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
