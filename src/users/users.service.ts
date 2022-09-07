import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { SignupDto } from "../auth/dto/signup.dto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo:Repository<User>,
    private readonly authService:AuthService,

  ){}

  async create(createUserDto: SignupDto) {
    const admin= await this.authService.signUpAdmin(createUserDto);
    return {
      message: 'Admin created successfully',
      tokens: admin.tokens,
      data: {
        ...admin.data,
        password: null,
        refreshToken: null,
        accessToken: null,
      },
    }
  }

  async findAll():Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: string):Promise<User> {
    return await this.userRepo.findOne({ where:{id} });
  }


  async remove(id: string):Promise<User> {
    const user = await this.userRepo.findOne({ where:{id} });
    if (!user) throw new BadRequestException('User not found');
    return await this.userRepo.remove(user);
  }
}
