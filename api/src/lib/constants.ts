import { Languages } from 'src/modules/project/project.schema';

export const MAX_JWT_AGE = 7 * 24 * 60 * 60;
export const MAX_COOKIE_AGE = 7 * 24 * 60 * 60;

export const IGNORED_PATHS = [
  '.gitignore',
  '.prettierrc',
  '.eslintrc',
  '.editorconfig',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  '.vscode',
  '.idea',
  'node_modules',
  'dist',
  'build',
  '.git',
];

export const GEMINI_INITIAL_PROMPT = `
You are a technical writer. Analyze the following repository files and generate complete documentation.

Return ONLY a valid JSON object (no markdown, no backticks) with the following structure:
{
  "project": {
    "title": "",
    "slug": "",        
    "content": "",
    "languages": [],
    "repositoryUrl": "",
    "demoUrl": ""
  },
  "sections": [...]
}

Rules:
- The project title MUST be the same as the repository
- The project slug MUST be exactly the repository name provided in kebab-case
- languages must only contain values from: ${Object.values(Languages).join(', ')}
- content fields must be valid Markdown
- section slugs must be kebab-case
- sections should cover: Overview, Getting Started, Project Structure, Features, Usage, and any other relevant topics
- analyze the actual code to write meaningful, accurate documentation
- In the project content, explain the problem this project solves and what makes it interesting
- In each section, include real code examples extracted from the repository files when relevant
- The tone should be professional but approachable, as if writing for other developers discovering your work
- For the Features section, explain WHY each feature is useful, not just what it does
`;
