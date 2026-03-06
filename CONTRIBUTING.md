# Contributing to Chrome Workspace Manager

Thank you for your interest in contributing. This document outlines the process for reporting issues and submitting changes.

## Reporting Issues

Before creating a new issue, please search existing issues to avoid duplicates. When reporting a bug, include:

- A clear description of the problem
- Steps to reproduce the issue
- Your environment details (Chrome version, OS, Node version)
- Any relevant error messages or logs

For feature requests, describe the desired functionality and use cases.

Use the issue templates provided in the .github/ISSUE_TEMPLATE directory when creating new issues.

## Development Workflow

1. Fork the repository
2. Create a feature branch from the main branch
3. Make your changes following the code style guidelines
4. Test your changes by building the project
5. Commit with a clear commit message
6. Push to your fork and submit a pull request

## Code Style

This project uses standard TypeScript conventions. Follow these guidelines:

- Use TypeScript strict mode
- Prefer explicit types over implicit any
- Use meaningful variable and function names
- Keep functions focused and small
- Add JSDoc comments for public APIs

Run the build to verify your code compiles:

```bash
npm run build
```

## Testing

Currently, this project does not have automated tests. When adding new functionality:

- Test manually in a Chrome extension environment
- Verify the build completes without errors
- Check that TypeScript strict mode passes

## License

By contributing to chrome-workspace-manager, you agree that your contributions will be licensed under the MIT License.
