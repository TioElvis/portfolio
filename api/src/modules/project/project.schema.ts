import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Section, SectionDocument } from 'src/modules/section/section.schema';

export type ProjectDocument = HydratedDocument<Project>;

export enum Languages {
  TYPESCRIPT = 'TypeScript',
  JAVASCRIPT = 'JavaScript',
  C = 'C',
  GO = 'Go',
  CPP = 'C++',
  RUST = 'Rust',
  JAVA = 'Java',
  PYTHON = 'Python',
}

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true, unique: true })
  slug: string;

  @Prop({ type: String, required: true })
  content: string; // Markdown content

  @Prop({ type: Array, required: true, enum: Languages })
  languages: Languages[];

  @Prop({ type: String })
  repositoryUrl?: string;

  @Prop({ type: String })
  demoUrl?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Section.name }] })
  sections?: Types.ObjectId[] | SectionDocument[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.pre('deleteOne', { document: true }, async function () {
  if (this.sections && this.sections.length > 0) {
    const SectionModel = this.model(Section.name);

    for (const sectionId of this.sections) {
      const section = await SectionModel.findById(sectionId);

      if (section) {
        await section.deleteOne();
      }
    }
  }
});
