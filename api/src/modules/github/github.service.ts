import { Octokit } from '@octokit/rest';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class GithubService implements OnModuleInit {
  private octokit: Octokit;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.octokit = new Octokit({
      auth: this.configService.get<string>('GITHUB_TOKEN'),
    });
  }
}
