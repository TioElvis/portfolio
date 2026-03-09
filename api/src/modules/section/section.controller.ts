import { Types } from 'mongoose';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { SectionService } from './section.service';

import { CreateSectionDto } from './dto/create-section.dto';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('create')
  async create(@Body() body: CreateSectionDto) {
    return await this.sectionService.create(body);
  }

  @Get('find-by-id/:id')
  async findById(@Param('id') id: Types.ObjectId) {
    return await this.sectionService.findById(id);
  }
}
