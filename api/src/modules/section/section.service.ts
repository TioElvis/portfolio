import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Section, SectionDocument } from './section.schema';

import { ProjectService } from 'src/modules/project/project.service';

import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    @Inject(forwardRef(() => ProjectService))
    private projectService: ProjectService,
  ) {}

  async create(body: CreateSectionDto) {
    if (body.projectId && body.parentId) {
      throw new BadRequestException(
        'A section cannot have both projectId and parentId',
      );
    }

    if (!body.projectId && !body.parentId) {
      throw new BadRequestException(
        'The projectId or parentId must be provided',
      );
    }

    const payload: Section = { ...body };
    const section = new this.sectionModel(payload);

    if (body.projectId) {
      const { data: project } = await this.projectService.findById(
        body.projectId,
        true,
      );

      const existingSection = (project.sections as Section[]).some(
        (v) => v.slug === body.slug,
      );

      if (existingSection) {
        throw new BadRequestException('Section with this slug already exists');
      }

      await project
        .updateOne(
          { $addToSet: { sections: section._id } },
          { runValidators: true },
        )
        .exec();
    }

    if (body.parentId) {
      const { data: parent } = await this.findById(body.parentId);

      const existingSection = (parent.sections as Section[]).some(
        (v) => v.slug === body.slug,
        true,
      );

      if (existingSection) {
        throw new BadRequestException('Section with this slug already exists');
      }

      await parent
        .updateOne(
          { $addToSet: { sections: section._id } },
          { runValidators: true },
        )
        .exec();
    }

    try {
      await section.save();

      return { message: 'Section created successfully', data: section };
    } catch (error) {
      console.error('Error creating section:', error);
      throw new BadRequestException('Failed to create section');
    }
  }

  async findById(id: Types.ObjectId, populate: boolean = false) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid section id');
    }

    const section = populate
      ? await this.sectionModel.findById(id).populate('sections').exec()
      : await this.sectionModel.findById(id).exec();

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    return { message: 'Section found', data: section };
  }
}
