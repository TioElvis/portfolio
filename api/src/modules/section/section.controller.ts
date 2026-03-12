import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { SectionService } from './section.service';

import { QuerySectionDto } from './dto/query-section.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('create')
  async create(@Body() body: CreateSectionDto) {
    return await this.sectionService.create(body);
  }

  @Get('find')
  async find(@Query() query: QuerySectionDto) {
    return await this.sectionService.find(query);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() body: UpdateSectionDto,
  ) {
    return await this.sectionService.update(id, body);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: Types.ObjectId) {
    return await this.sectionService.delete(id);
  }
}
