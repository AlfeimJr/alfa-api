import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findOne(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ email: email });
    }
}
