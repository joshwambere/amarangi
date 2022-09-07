import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards } from "@nestjs/common";
import { VaccinationsService } from './vaccinations.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
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
  @ApiOperation({
    summary: 'create vaccination',
  })
  @ApiResponse({ status: 201, description: 'on success' })
  create(@Body() createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationsService.create(createVaccinationDto);
  }

  @Get()
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'Find all vaccinations',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  findAll() {
    return this.vaccinationsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':code')
  @ApiOperation({
    summary: 'Get vaccination status by code',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  findOne(@Param('code') code: string) {
    return this.vaccinationsService.findOne(code);
  }

  @Patch(':id')
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'Update vaccination',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  update(@Param('id') id: string, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    return this.vaccinationsService.update(id, updateVaccinationDto);
  }

  @Delete(':id')
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'Delete vaccination',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  remove(@Param('id') id: string) {
    return this.vaccinationsService.remove(id);
  }
}
