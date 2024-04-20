import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './User.entity';
import { parse } from 'path';
import { UpdateUserDto } from './dto/update.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('getrute')
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUser(id);
    }

    @Post()
    createUser(@Body() newUser: CreateUserDto) {
        return this.usersService.createUser(newUser);

    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id)
    }

    @Patch(':id')
    UpdateUser(@Param('id', ParseIntPipe) id: number, @Body()
    user:UpdateUserDto) {
        return this.usersService.updateUser(id, user)
    }
}


