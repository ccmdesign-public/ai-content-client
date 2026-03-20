# Repository Guidelines

**For complete project documentation, see [CLAUDE.md](CLAUDE.md).**

This file provides quick links to agent-specific instructions. All agents should read CLAUDE.md as the primary source of truth.

## Agent-Specific Resources

- **[CLAUDE.md](CLAUDE.md)** - **Primary documentation** (read this first!)
- **[GEMINI.md](GEMINI.md)** - Gemini-specific notes (references CLAUDE.md)
- **[.cursorrules](.cursorrules)** - Cursor IDE quick reference (references CLAUDE.md)
- **[.claude/](.claude/)** - Claude Code commands and skills
- **[.gemini/](.gemini/)** - Gemini instructions and workflows
- **[.codex/](.codex/)** - Codex prompts and workflows
- **[.cursor/](.cursor/)** - Cursor IDE configuration

## Quick Reference

All information below is excerpted from CLAUDE.md. See CLAUDE.md for the complete and authoritative documentation.

### Essential Commands
```bash
npm run dev         # Start dev server
npm run build       # Production build
npx vitest run      # Run tests
npx eslint src --ext .ts,.vue    # Lint code
npm run lint:css    # Lint styles (if exists)
```

### Project Structure
- All application code in `src/`
- shadcn-vue UI primitives in `src/components/ui/`
- Content components in `src/components/content/` (built on shadcn-vue)
- Content in `src/content/` (examples, adapt as needed)
- Tests in `src/tests/`

### Important Notes
- **This is a boilerplate** - content files are examples
- Check `package.json` for available scripts in your project
- Verify file existence before referencing
- See CLAUDE.md for detailed standards and guidelines

## Single Source of Truth

**CLAUDE.md is the authoritative documentation.**

When in doubt or when you need detailed information about:
- Coding standards
- Component development
- Testing requirements
- Configuration details
- Project structure

→ **Read [CLAUDE.md](CLAUDE.md)**
