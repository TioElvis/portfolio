import { Controller, Get, UseGuards } from '@nestjs/common';

import { GithubService } from './github.service';

@UseGuards()
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('find-all-repos')
  async findAllRepos() {
    return await this.githubService.findAllRepos();
  }
}
