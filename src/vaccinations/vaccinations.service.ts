import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Vaccination } from "./entities/vaccination.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { RoleType } from "../shared/enums/user.role.enum";

@Injectable()
export class VaccinationsService {
  constructor(@InjectRepository(Vaccination) private readonly vaccinationsRepository: Repository<Vaccination>, @InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async create(createVaccinationDto: CreateVaccinationDto) {
    const code  = await this.vaccinationsRepository.findOne({ where:{code: createVaccinationDto.code} });
    if(code) throw new BadRequestException('Code already exists');
    const user = await this.userRepo.findOne({ where:{id: createVaccinationDto.user,role:RoleType.USER} });
    if (!user) throw new BadRequestException('User not found');
    const vacData = { code: createVaccinationDto.code, user: user };
    const vaccination = await this.vaccinationsRepository.create(vacData);
    return await this.vaccinationsRepository.save(vaccination );
  }


  async findAll():Promise<Vaccination[]> {
    return await this.vaccinationsRepository.find({ relations: ['user'] });
  }

  async findOne(code: string) {
    const vaccination = await this.vaccinationsRepository.findOne(
      {
        relations: ['user'],
        where: { code }
      }
    );
    if(!vaccination) throw new BadRequestException('Vaccination not found');
    return vaccination;
  }

  async update(id: string, updateVaccinationDto: UpdateVaccinationDto):Promise<Vaccination> {
    const vaccination = await this.vaccinationsRepository.findOne(
      {
        relations: ['user'],
        where: { id }
      }
    );
    if(!vaccination) throw new BadRequestException('Vaccination not found');

    return await this.vaccinationsRepository.save({ ...vaccination, status: updateVaccinationDto.status });
  }

  async remove(id: string): Promise<Vaccination> {
    const vaccination = await this.vaccinationsRepository.findOne(
      {
        relations: ['user'],
        where: { id }
      }
    );
    if(!vaccination) throw new BadRequestException('Vaccination not found');
    return await this.vaccinationsRepository.remove(vaccination);
  }
}
