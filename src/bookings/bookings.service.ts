import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "./entities/booking.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Spot } from "../spots/entities/spot.entity";
import { SpotStatus } from "../shared/enums/spot.status.enum";

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Spot) private spotRepository: Repository<Spot>,
  ) {}

  async create(createBookingDto: CreateBookingDto,user:User) {
    const { spotId } = createBookingDto;
    const spot = await this.spotRepository.findOne({ where: { id: spotId } });
    if (!spot) throw new Error('Spot does not exist');

    if (spot.status !== SpotStatus.AVAILABLE) throw new BadRequestException('Spot is not available');
    const bookings = await this.bookingRepository.save({ ...createBookingDto, user, spot });
    if (bookings) {
      await this.spotRepository.save({ ...spot, status: SpotStatus.BOOKED });
    }
    return bookings;
  }

  async findAll() {
    return await this.bookingRepository.find({relations:['user','spot']});
  }

  async findOne(id: string) {
    const booking = await this.bookingRepository.findOne({ where: { id },relations:['user','spot'] });
    if (!booking) throw new BadRequestException('Booking does not exist');
    return booking
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const booking = await this.spotRepository.findOne({ where: { id } });
    if (!booking) throw new BadRequestException('spot does not exist');

    if (booking.status === SpotStatus.AVAILABLE) throw new BadRequestException('Spot is not booked');
    return await this.spotRepository.save({ ...booking, status: updateBookingDto.status });
  }

}
