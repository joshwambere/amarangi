import { Controller, Get, Post, Body, Param, Delete, SetMetadata, UseGuards } from "@nestjs/common";
import { UsersService } from './users.service';
import { SignupDto } from "../auth/dto/signup.dto";
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/guards/role.guard";

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiProperty({
    deprecated: true,
    description: 'Create Admin user',
  })
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createUserDto: SignupDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiProperty({
    deprecated: true,
    description: 'Find all s',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiProperty({
    deprecated: true,
    description: 'Find one user',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiProperty({
    deprecated: true,
    description: 'Delete user',
  })
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
