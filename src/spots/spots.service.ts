import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Spot } from "./entities/spot.entity";
import { Repository } from "typeorm";
import { SpotStatus } from "../shared/enums/spot.status.enum";

@Injectable()
export class SpotsService {
  constructor(@InjectRepository(Spot) private spotsRepository: Repository<Spot>) {}


  async create(createSpotDto: CreateSpotDto):Promise<Spot> {
    const spot = await this.spotsRepository.findOne({ where: { name: createSpotDto.name } });
    if (spot) throw new BadRequestException('Spot already exists');
    return await this.spotsRepository.save(createSpotDto);
  }



  async findAll():Promise<Spot[]>{
    return await this.spotsRepository.find();
  }

  async findAvailableSpots():Promise<Spot[]>{
    return await this.spotsRepository.find({ where:{status:SpotStatus.AVAILABLE} });
  }

  async findOne(id: string):Promise<Spot> {
    return await this.spotsRepository.findOne({ where:{id} });
  }

  async update(id: string, updateSpotDto: UpdateSpotDto) {
    const spot = await this.spotsRepository.findOne({ where: { id } });

    if (!spot) throw new BadRequestException('Spot does not exist');
    return await this.spotsRepository.save({ ...spot, ...updateSpotDto });
  }

  async remove(id: string) {
    const spot = await this.spotsRepository.findOne({ where: { id } });
    if (!spot) throw new BadRequestException('Spot does not exist');
    return await this.spotsRepository.remove(spot);
  }
}
