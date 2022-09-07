import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvs } from './shared/configs/env/helper/env.helper';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/configs/db/typeorm.service';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SpotsModule } from "./spots/spots.module";
import { VaccinationsModule } from "./vaccinations/vaccinations.module";


const envFilePath: string | any = getEnvs(join(__dirname, '..')) || process.env;

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UsersModule,
    AuthModule,
    SpotsModule,
    VaccinationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
