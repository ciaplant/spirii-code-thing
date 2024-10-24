import { Controller, Get, Param, Post } from '@nestjs/common';
import { PayoutsUser, UserService } from '../services/user.service';
import { User } from '../clients/database.client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('updateTransactions')
  updateTransactions() {
    this.userService.updateTransactions();
  }

  @Get(':userId')
  findUser(@Param('userId') userId: UserId): User {
    return this.userService.getUser(userId);
  }

  @Post('requestedPayouts')
  getRequestedPayouts(): PayoutsUser[] {
    return this.userService.getRequestedPayouts();
  }

  @Get()
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }
}
