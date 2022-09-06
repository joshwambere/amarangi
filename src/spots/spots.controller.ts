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
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
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
  @ApiProperty({
    deprecated: true,
    description: 'Create spot',
  })
  create(@Body() createSpotDto: CreateSpotDto) {
    return this.spotsService.create(createSpotDto);
  }

  @Get()
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiProperty({
    deprecated: true,
    description: 'Create spot',
  })
  findAll() {
    return this.spotsService.findAll();
  }

  @Get('/spot/pending')
  @ApiProperty({
    deprecated: true,
    description: 'Get Pending spot',
  })
  findAvailableSpots() {
    return this.spotsService.findAvailableSpots();
  }


  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.spotsService.findOne(id);
  }

  @Patch(':id')
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiProperty({
    deprecated: true,
    description: 'update spot',
  })
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateSpotDto: CreateSpotDto) {
    return this.spotsService.update(id, updateSpotDto);
  }

  @Delete(':id')
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiProperty({
    deprecated: true,
    description: 'Delete spot',
  })
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.spotsService.remove(id);
  }
}
