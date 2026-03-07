import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Project, ProjectDocument } from './project.schema';

import { SectionService } from 'src/modules/section/section.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @Inject(forwardRef(() => SectionService))
    private sectionService: SectionService,
  ) {}
}
