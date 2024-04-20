import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm'
import { UpdateUserDto } from './dto/update.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly UserRepository: Repository<User>,
        @Inject('USER_SERVICE') private readonly clientMail?: ClientProxy,) { }

    getUsers() {
        return this.UserRepository.find()
    }

    async getUser(id: number) {
        const userFound = await this.UserRepository.findOne({
            where: {
                id
            }
        });

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return userFound;
    }

    async createUser(User: CreateUserDto) {
        const userFound = await this.UserRepository.findOne({ where: { UserName: User.UserName } });

        if (userFound) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }

        const newUser = this.UserRepository.create(User);
        const savedUser = await this.UserRepository.save(newUser);

        // Esto es para poder Emitir el evento 'user_created'
        this.clientMail.emit('user_created', savedUser);

        return savedUser;
    }

    async deleteUser(id: number) {
        const result = await this.UserRepository.delete({ id });
        if (result.affected === 0) {
            return new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }


    async updateUser(id: number, user: UpdateUserDto) {
        const userFound = await this.UserRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const updateUser = Object.assign(userFound, user);
        return this.UserRepository.save(updateUser);
    }
}
