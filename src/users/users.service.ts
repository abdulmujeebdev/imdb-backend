import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  // find by id
  async getById(id) {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });
    if (user) {
      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  // find by email
  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });
    if (user) {
      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.getByEmail(email);
    const isMatch = await bcrypt.compare(pass, user.password)
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // // create
  async create(createDto: UserDto) {
    const data = await this.userRepository.create(createDto);
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    await this.userRepository.save(data);

    return data;
  }

}