import { Controller, Get, Post, Body, Patch, Param, SetMetadata, UseGuards } from "@nestjs/common";
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/guards/role.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('notifications')
@ApiTags('Notifications')
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'find all notification',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'Find one notification',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Patch(':id')
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'Read one spot',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Patch()
  @SetMetadata('role', 'ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'Real all notification',
  })
  @ApiResponse({ status: 200, description: 'on success' })
  read() {
    return this.notificationsService.readAll();
  }
}
