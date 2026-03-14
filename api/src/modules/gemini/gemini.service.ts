import { GoogleGenAI } from '@google/genai';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';

import { GEMINI_INITIAL_PROMPT } from 'src/lib/constants';
import { Project } from 'src/modules/project/project.schema';
import { GithubService } from 'src/modules/github/github.service';

export interface SectionGenerationResponse {
  title: string;
  slug: string;
  content: string;
  sections?: SectionGenerationResponse[];
}

export interface ProjectGenerationResponse extends Project {
  sections: SectionGenerationResponse[];
}

@Injectable()
export class GeminiService implements OnModuleInit {
  private genAI: GoogleGenAI;
  private model: string;

  constructor(
    private configService: ConfigService,
    private githubService: GithubService,
  ) {}

  onModuleInit() {
    this.genAI = new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_KEY'),
    });
    this.model = this.configService.get<string>('GEMINI_MODEL')!;
  }

  async generateProject(name: string) {
    const files = await this.githubService.findRepoFiles(name);

    const prompt = `${GEMINI_INITIAL_PROMPT}\\n\\nRepository:\\n\\${JSON.stringify(files.data)}`;

    const response = await this.genAI.models.generateContent({
      model: this.model,
      contents: prompt,
      config: {
        temperature: 0.3,
      },
    });

    const raw = response.text?.trim() ?? '';
    const cleaned = raw.replace(/^```json\n?/, '').replace(/\n?```$/, '');

    try {
      const parsed = JSON.parse(cleaned) as ProjectGenerationResponse;

      return { message: 'Project generated successfully', data: parsed };
    } catch (error) {
      console.error('Error generating project:', error);
      throw new BadRequestException('Failed to generate project');
    }
  }
}
