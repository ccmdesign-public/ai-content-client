# Gemini Agent Instructions

**Last Updated**: 2025-12-31

**For complete project documentation, read [CLAUDE.md](CLAUDE.md).**

This file contains Gemini-specific notes and references. All core project information, standards, and guidelines are maintained in CLAUDE.md as the single source of truth.

## Primary Documentation

→ **[CLAUDE.md](CLAUDE.md)** - Read this for complete project details

CLAUDE.md contains:
- Full project snapshot and framework details
- Complete command reference
- Directory structure and organization
- Configuration notes
- Styling architecture (Tailwind CSS)
- Component development standards
- Testing discipline
- Checklist for changes
- Project management guidelines

## Gemini-Specific Notes

### Working with this Repository

1. **Start by reading [CLAUDE.md](CLAUDE.md)** - it's the authoritative source
2. This is a **boilerplate repository** - content files are examples, not requirements
3. Check `package.json` for scripts available in your specific project
4. Verify file existence before referencing (not all guideline files exist in every fork)

### Quick Commands Reference

See CLAUDE.md for the complete command list. Most commonly used:

```bash
npm run dev                      # Start development server
npm run build                    # Build for production
npx vitest run                   # Run tests
npx eslint src --ext .ts,.vue    # Lint code
npm run lint:css                 # Lint styles (if script exists)
```

### Key Principles from CLAUDE.md

- All application code lives in `src/`
- Tailwind CSS utility classes for styling
- Use composition API: `<script setup lang="ts">`
- Tests mirror source structure in `src/tests/`
- Content in `src/content/` is optional/example

### Additional Resources

- **Agent directory**: [.gemini/](.gemini/) - Gemini-specific workflows
- **Other agents**: [AGENTS.md](AGENTS.md) - Links to all agent resources
- **Guidelines**: `src/content/docs/guidelines/` - Project-specific standards (if exist)

## Important Reminder

**Don't duplicate documentation.**

When you need information about this project, **read [CLAUDE.md](CLAUDE.md)** rather than maintaining parallel documentation here.

This keeps information:
- ✅ Consistent across all AI assistants
- ✅ Easier to maintain (single file to update)
- ✅ Always up-to-date and accurate

---

**Single Source of Truth**: [CLAUDE.md](CLAUDE.md)
