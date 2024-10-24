import { Module } from '@nestjs/common';
import { TransactionClient } from './clients/transaction.client';
import { DatabaseClient } from './clients/database.client';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [TransactionClient, DatabaseClient, UserService],
})
export class AppModule {}
