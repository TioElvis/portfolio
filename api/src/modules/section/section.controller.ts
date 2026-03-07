import { Body, Controller, Post } from '@nestjs/common';

import { SectionService } from './section.service';

import { CreateSectionDto } from './dto/create-section.dto';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('create')
  async create(@Body() body: CreateSectionDto) {
    return await this.sectionService.create(body);
  }
}
