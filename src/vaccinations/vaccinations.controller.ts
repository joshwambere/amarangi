import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards } from "@nestjs/common";
import { VaccinationsService } from './vaccinations.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/guards/role.guard";

@ApiTags('Vaccination')
@ApiBearerAuth()
@Controller('vaccinations')
export class VaccinationsController {
  constructor(private readonly vaccinationsService: VaccinationsService) {}

  @ApiProperty({
    deprecated: true,
    description: 'Create vaccination',
  })
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  create(@Body() createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationsService.create(createVaccinationDto);
  }

  @Get()
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiProperty({
    deprecated: true,
    description: 'Find all vaccination',
  })
  findAll() {
    return this.vaccinationsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiProperty({
    deprecated: true,
    description: 'Find all vaccination',
  })
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.vaccinationsService.findOne(code);
  }

  @Patch(':id')
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiProperty({
    deprecated: true,
    description: 'update vaccination',
  })
  update(@Param('id') id: string, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    return this.vaccinationsService.update(id, updateVaccinationDto);
  }

  @Delete(':id')
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiProperty({
    deprecated: true,
    description: 'delete vaccination',
  })
  remove(@Param('id') id: string) {
    return this.vaccinationsService.remove(id);
  }
}
