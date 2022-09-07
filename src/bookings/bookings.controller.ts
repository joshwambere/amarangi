import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
  UseGuards,
  ParseUUIDPipe
} from "@nestjs/common";
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { GetUser } from "../auth/decorators/user.decorator";
import { User } from "../users/entities/user.entity";
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/guards/role.guard";

@Controller('bookings')
@ApiTags('Bookings')
@ApiBearerAuth()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Book a spot',
  })
  @ApiResponse({ status: 201, description: 'on success' })
  create(@Body() createBookingDto: CreateBookingDto, @GetUser() user:User) {
    return this.bookingsService.create(createBookingDto,user);
  }

  @Get()
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'Get all bookings',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one booking',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update one spot booking status',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }
}
