import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    
    ) {}

  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar usuários' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  
  @ApiOperation({ summary: 'Editar usuário pelo id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }


  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover usuário pelo id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Pegar Usuario Atual' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  findOne(@Request() req) {
    const id = req.user.userId
    return this.userService.getMe(id);
  }

}
