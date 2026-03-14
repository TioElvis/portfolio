import { Octokit } from '@octokit/rest';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';

import { IGNORED_PATHS } from 'src/lib/constants';

@Injectable()
export class GithubService implements OnModuleInit {
  private owner: string;
  private octokit: Octokit;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.octokit = new Octokit({
      auth: this.configService.get<string>('GITHUB_TOKEN'),
    });
    this.owner = this.configService.get<string>('GITHUB_OWNER')!;
  }

  async findAllRepos() {
    try {
      const { data } = await this.octokit.repos.listForAuthenticatedUser();

      return {
        message: 'Repositories fetched successfully',
        data: data.map((repo) => ({
          name: repo.name,
          description: repo.description,
          owner: repo.owner.login,
          url: repo.html_url,
        })),
      };
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw new BadRequestException('Failed to fetch repositories');
    }
  }

  async findRepoFiles(name: string, branch: string = 'main') {
    try {
      const { data } = await this.octokit.rest.git.getTree({
        owner: this.owner,
        repo: name,
        tree_sha: branch,
        recursive: '1',
      });

      const files = data.tree
        .filter((item) => item.type === 'blob')
        .map((item) => item.path)
        .filter(
          (path) => !IGNORED_PATHS.some((ignored) => path?.startsWith(ignored)),
        );

      return { message: 'Repository files found successfully', data: files };
    } catch (error) {
      console.error('Error fetching repository files:', error);
      throw new BadRequestException('Failed to fetch repository files');
    }
  }

  async findRepoFileContent(name: string, path: string) {
    try {
      const { data } = await this.octokit.rest.repos.getContent({
        owner: this.owner,
        repo: name,
        path,
      });

      if (!('content' in data)) {
        throw new BadRequestException('File content not found');
      }

      return {
        message: 'Repository file content found successfully',
        data: {
          content: (data.content = Buffer.from(data.content, 'base64').toString(
            'utf-8',
          )),
        },
      };
    } catch (error) {
      console.error('Error fetching repository file content:', error);
      throw new BadRequestException('Failed to fetch repository file content');
    }
  }
}
