import { GoogleGenAI } from '@google/genai';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class GeminiService implements OnModuleInit {
  private genAI: GoogleGenAI;
  private model: string;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.genAI = new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_KEY'),
    });
    this.model = this.configService.get<string>('GEMINI_MODEL')!;
  }
}
