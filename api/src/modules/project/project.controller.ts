import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CreateProjectDto } from './dto/create-project.dto';

import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: CreateProjectDto) {
    return await this.projectService.create(body);
  }
}
