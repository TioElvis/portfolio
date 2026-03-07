import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

import { ProjectService } from './project.service';

import { QueryProjectDto } from './dto/query-project.dio';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: CreateProjectDto) {
    return await this.projectService.create(body);
  }

  @Get('find')
  async find(@Query() query: QueryProjectDto) {
    return await this.projectService.find(query);
  }

  @Get('find-by-id/:id')
  async findById(@Param('id') id: Types.ObjectId) {
    return await this.projectService.findById(id, true);
  }
}
