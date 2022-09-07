import { Controller, Get, Post, Body, Param, Delete, SetMetadata, UseGuards } from "@nestjs/common";
import { UsersService } from './users.service';
import { SignupDto } from "../auth/dto/signup.dto";
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/guards/role.guard";

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'create Admin user',
  })
  @ApiResponse({ status: 201, description: 'on success' })
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createUserDto: SignupDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all Users',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one user by id',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one User',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
