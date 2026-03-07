import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Project, ProjectDocument } from './project.schema';

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
}
