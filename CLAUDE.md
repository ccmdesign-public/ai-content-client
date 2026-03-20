# CLAUDE.md

Guidance for Claude Code when collaborating on this YouTube Summarizer MVP repository.

## Project Snapshot
- **Framework**: Nuxt 3/4 (Vue 3.5, SSR enabled)
- **Source Root**: All application code lives in `src/`
- **Content System**: `@nuxt/content` for Markdown collections (optional)
- **Styling**: shadcn-vue components with Tailwind CSS v4. Composition layout utilities for structural patterns.
- **Testing**: Vitest via `@nuxt/test-utils`

## Essential Commands
```bash
npm install                      # install dependencies
npm run postinstall              # regenerate .nuxt types (nuxt prepare)
npm run dev                      # start HMR dev server
npm run build                    # build production bundle into .output/
npm run preview                  # serve latest build via node .output/server/index.mjs
npm run docs:generate            # generate component documentation
npx vitest run                   # run test suite
npx vitest run --coverage        # run tests with coverage (requires @vitest/coverage-v8)
npx eslint src --ext .ts,.vue    # lint application code
npm run lint:css                 # lint CSS/Vue files with stylelint
npm run lint:css:fix             # auto-fix CSS lint issues
npm run validate:tokens          # validate design token consistency
npm run validate:tokens:fix      # auto-fix token issues where possible
```

## Directory Overview
- `src/pages/`: File-based routes; keep orchestration only, delegate UI to components
- `src/layouts/`: Shell layouts that wrap page content
- `src/components/ui/`: shadcn-vue primitives (auto-registered via shadcn-nuxt module)
- `src/components/content/`: Content components built on shadcn-vue primitives
- `src/composables/`: Composition utilities
- `src/content/`: Markdown sources (if using @nuxt/content)
- `src/public/`: Static assets + layered CSS directory structure
- `src/server/`: Nitro API routes
- `src/tests/`: Vitest specs organized by feature
- `_process/`: Planning, specs, and project management (current project only)
- `_archive/`: Archived/historical files (ignored by version control)
- `.nuxt/`, `.output/`, `dist/`: Generated artefacts (ignored by git)

## Configuration Notes
- Nuxt config may be at `nuxt.config.ts` or `src/nuxt.config.ts` depending on setup
- PostCSS plugins configured in `nuxt.config.ts`
- `content.config.ts` (if exists) defines collections using paths to `src/content/`
- ESLint config lives at repo root (`eslint.config.mjs`)
- `tsconfig.json` may set `baseUrl = "./src"`

## Styling Architecture
- shadcn-vue components with Tailwind CSS v4 utility classes
- Composition layout utilities (stack, cluster, center, container, grid, switcher, box, cover, frame, reel, imposter) in `src/assets/css/tailwind.css`
- Rose Pine theme via CSS custom properties
- Icons: Lucide (tree-shakeable, imported individually from `lucide-vue-next`)
- No scoped `<style>` blocks in content components -- all styling via Tailwind utilities

## Component Development

When working with UI components:

1. Use shadcn-vue primitives from `src/components/ui/` as building blocks
2. Install new shadcn-vue components with `pnpm dlx shadcn-vue@latest add <component>`
3. Style with Tailwind utility classes -- avoid scoped CSS
4. Use Lucide icons (individual imports for tree-shaking)
5. Configuration in `components.json` (style: new-york, icon: lucide)

## Testing Discipline
- Tests live in `src/tests/` organized by feature area
- Coverage provider: V8
- Run tests with `npx vitest run`
- Add specs when updating composables or runtime logic

## Checklist for Changes
1. Update or create relevant specs in `src/tests/` before implementing significant logic
2. Run `npx vitest run --coverage` to verify tests pass with adequate coverage
3. Run `npx eslint src --ext .ts,.vue` to catch linting issues
4. Run `npm run lint:css` for CSS/style validation (if script exists)
5. If touching tokens, run `npm run validate:tokens` to ensure consistency (if script exists)
6. For production verification: `npm run build` followed by `npm run preview`

## Agent-Specific Directories
- `.claude/` - Claude Code commands and skills (see `.claude/README.md` if exists)
- `.codex/` - Codex prompts and workflows
- `.gemini/` - Gemini-specific instructions
- `.cursor/` - Cursor IDE configuration

## Project Management
- Plans and specs: `docs/plans/`
- Brainstorms: `docs/brainstorms/`
- Past solutions: `docs/solutions/`
- Archived documentation: `_archive/` (ignored by version control)

## Important Notes

**This is a boilerplate repository:**
- The core value is the Nuxt + Nuxt Content setup, not the content files
- Content files in `src/content/` are examples and can be removed for new projects
- Focus on the technical setup: configuration, structure, and tooling
- Adapt the content structure to your specific project needs

**Guidelines and documentation:**
- Check `src/content/docs/guidelines/` for available documentation
- Not all guideline files may exist in every project
- Always verify file existence before referencing in instructions

---

## Revision Summary

**Date**: 2025-12-31

**Key Updates:**
1. ✅ Removed references to non-existent files
2. ✅ Made file references conditional ("if exists")
3. ✅ Updated for boilerplate nature of repository
4. ✅ Clarified that content files are optional examples
5. ✅ Simplified project management section
6. ✅ Added note about _archive directory
7. ✅ Removed specific component counts and file lists
8. ✅ Made guidelines conditional based on what exists in each project
