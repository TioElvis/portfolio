import { AuthGuard } from '@nestjs/passport';
import { Controller, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}
}
