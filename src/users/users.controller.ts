import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserDto, UserLoginDto, UserGetDto } from './dto/user.dto';
import { Public } from './users.decorator';

@Controller('api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.getById(id);
  }

  @Public()
  @Post('login')
  signIn(@Body() signInDto: UserLoginDto) {
    return this.usersService.signIn(signInDto.email, signInDto.password);
  }

  @Post()
  @Public()
  async create(@Body() createDto: UserDto) {
    return this.usersService.create(createDto);
  }
}
