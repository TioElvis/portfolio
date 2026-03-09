import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Section, SectionDocument } from './section.schema';

import { CreateSectionDto } from './dto/create-section.dto';

import { Project, ProjectDocument } from 'src/modules/project/project.schema';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(body: CreateSectionDto) {
    const existingSection = await this.sectionModel.findOne({
      slug: body.slug,
      project: body.projectId,
      parent: body.parentId ?? null,
    });

    if (existingSection) {
      throw new BadRequestException(
        'A section with this slug already exists at the same level',
      );
    }
    const payload: Section = {
      ...body,
      project: new Types.ObjectId(body.projectId),
      parent: body.parentId ? new Types.ObjectId(body.parentId) : undefined,
    };

    const section = new this.sectionModel(payload);

    if (body.parentId) {
      const { data: parent } = await this.findById(body.parentId);

      if (parent?.slug === body.slug) {
        throw new BadRequestException(
          'Parent have the same slug as the new section',
        );
      }
    }

    const project = await this.projectModel
      .findById(body.projectId)
      .select({ _id: 1 })
      .lean()
      .exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    try {
      await section.save();
      return { message: 'Section created successfully', data: section };
    } catch (error) {
      console.error('Error creating section:', error);
      throw new BadRequestException('Failed to create section');
    }
  }

  async findById(id: Types.ObjectId) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid section id');
    }

    const section = await this.sectionModel.findById(id).exec();

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    return { message: 'Section found', data: section };
  }
}
