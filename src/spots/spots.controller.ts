import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  SetMetadata,
  UseGuards
} from "@nestjs/common";
import { SpotsService } from './spots.service';
import { CreateSpotDto } from './dto/create-spot.dto';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/guards/role.guard";


@ApiTags('Spots')
@ApiBearerAuth()
@Controller('spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'Create spot',
  })
  @ApiResponse({ status: 201, description: 'on success' })
  create(@Body() createSpotDto: CreateSpotDto) {
    return this.spotsService.create(createSpotDto);
  }

  @Get()
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'Find all spots',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  findAll() {
    return this.spotsService.findAll();
  }

  @Get('/spot/pending')
  @ApiOperation({
    summary: 'Get Pending spot',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  findAvailableSpots() {
    return this.spotsService.findAvailableSpots();
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Get one spot by id',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.spotsService.findOne(id);
  }

  @Patch(':id')
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'Update spot',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateSpotDto: CreateSpotDto) {
    return this.spotsService.update(id, updateSpotDto);
  }

  @Delete(':id')
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'Delete spot',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.spotsService.remove(id);
  }
}
