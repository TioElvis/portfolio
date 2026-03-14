import { Module } from '@nestjs/common';

import { GeminiService } from './gemini.service';
import { GithubModule } from 'src/modules/github/github.module';

@Module({
  imports: [GithubModule],
  providers: [GeminiService],
  exports: [GeminiService],
})
export class GeminiModule {}
