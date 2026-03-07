import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Project, ProjectDocument } from './project.schema';

import { QueryProjectDto } from './dto/query-project.dio';
import { CreateProjectDto } from './dto/create-project.dto';

import { SectionService } from 'src/modules/section/section.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @Inject(forwardRef(() => SectionService))
    private sectionService: SectionService,
  ) {}

  async create(body: CreateProjectDto) {
    const existingProject = await this.projectModel
      .findOne({ slug: body.slug })
      .exec();

    if (existingProject) {
      throw new BadRequestException('Project with this slug already exists');
    }

    const payload: Project = { ...body };

    try {
      const project = await this.projectModel.create(payload);

      return { message: 'Project created successfully', data: project };
    } catch (error) {
      console.error('Error creating project:', error);
      throw new BadRequestException('Failed to create project');
    }
  }

  async find(query: QueryProjectDto) {
    const filter: Record<string, any> = {};

    if (query.slug) filter.slug = query.slug;
    if (query.title) filter.title = query.title;
    if (query.languages) filter.languages = { $in: query.languages };

    const page = Math.max(1, query.page ?? 1);
    const limit = Math.max(1, query.limit ?? 10);
    const skip = (page - 1) * limit;

    try {
      const [data, total] = await Promise.all([
        this.projectModel
          .find(filter, { sections: 0 })
          .skip(skip)
          .limit(limit)
          .lean<Project[]>()
          .exec(),
        this.projectModel.countDocuments(filter).exec(),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        message: 'Projects retrieved successfully',
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          next: page < totalPages ? page + 1 : null,
          prev: page > 1 ? page - 1 : null,
        },
      };
    } catch (error) {
      console.error('Error finding projects:', error);
      throw new BadRequestException('Failed to find projects');
    }
  }

  async findById(id: Types.ObjectId, populate: boolean = false) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid project id');
    }

    const project = populate
      ? await this.projectModel.findById(id).populate('sections').exec()
      : await this.projectModel.findById(id).exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return { message: 'Project retrieved successfully', data: project };
  }
}
