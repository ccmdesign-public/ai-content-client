# Component Development Skills

Streamlined Claude skills for rapid, standards-driven component development.

## Philosophy: Build → Validate → Document

**New approach**: Build components quickly with standards baked in, then validate and document.

**Old approach** ❌: Draft spec → Review → Approve → Build → Validate → Document
**New approach** ✅: Build → Quick self-check → (Optional) Validate → (Optional) Document

This reduces time-to-working-component from 30+ minutes to 10-15 minutes.

---

## Available Skills

### 1. Building Components (`building-components`)
**Purpose**: Fast component creation with build-first approach

**Use when:**
- Creating any new component (DS, Wrapper, Content)
- User asks "should I compose or create?"
- User provides component name or reference implementation
- Need to build something quickly

**What it does:**
- Quick 2-minute analysis
- Determines component type (DS/Wrapper/Content)
- Scaffolds with standards-compliant template
- Implements features with standards enforced
- Quick self-check validation
- Done - ready to test

**Philosophy:**
- Start coding immediately, not after 30min spec
- Standards compliance from start, not bolted on
- Minimal upfront planning (5-10 min total)
- Iterate based on usage, not speculation

**Time:** 10-20 minutes to working component

**Invoke with:** Claude automatically uses when you mention creating components

---

### 2. Validating Components (`validating-components`)
**Purpose**: Comprehensive standards audit with detailed fixes

**Use when:**
- After building (optional quality check)
- Migrating old components to new standards
- Code review before merging
- Component has suspicious behavior
- User explicitly requests validation

**What it does:**
- Reads component file
- Validates all applicable standards (10 for DS, 6 for Wrapper, 4 for Content)
- Generates detailed report with score
- Provides specific code fixes with before/after
- Offers to apply fixes if approved

**Important:** This is OPTIONAL after building. The self-check in building-components is usually sufficient.

**Time:** 5 minutes for report + fixes

**Invoke with:** "Validate ccmButton" or "Run validating-components on ccmCard"

---

### 3. Documenting Components (`documenting-components`)
**Purpose**: Complete documentation with markdown docs + demo page

**Use when:**
- After building and testing component
- Component is working and ready to share
- Updating docs for existing component
- User explicitly requests documentation

**What it does:**
- Analyzes component API (props, slots, events)
- Creates markdown documentation (`src/content/docs/components/`)
- Creates interactive demo page (`src/pages/docs/`)
- Ensures consistency between both
- Links them together
- Includes realistic examples and use cases

**Creates two files:**
1. Markdown docs with API reference, usage, accessibility
2. Interactive demo page with live examples

**Time:** 10-15 minutes for complete documentation

**Invoke with:** "Document ccmButton" or "Create docs for ccmCard"

---

## Typical Workflows

### Workflow 1: Fast Component Creation (Most Common)

```
1. User: "Create a badge component"
2. Claude uses building-components skill
   - Quick analysis (2 min)
   - Scaffold component (2 min)
   - Implement features (10 min)
   - Self-check (2 min)
3. Done! Component ready to test
4. Optional: User can request validation or documentation
```

**Total time:** 15 minutes to working, testable component

---

### Workflow 2: Component with Documentation

```
1. User: "Create a badge component and document it"
2. Claude uses building-components skill
   - Builds component (15 min)
3. Claude uses documenting-components skill
   - Creates markdown docs (5 min)
   - Creates demo page (10 min)
4. Done! Component + docs + demo
```

**Total time:** 30 minutes to fully documented component

---

### Workflow 3: Validate Existing Component

```
1. User: "Validate ccmButton against standards"
2. Claude uses validating-components skill
   - Reads component
   - Runs all checks
   - Generates report with score
   - Provides specific fixes
3. Optional: Claude applies fixes if approved
```

**Total time:** 5-10 minutes

---

### Workflow 4: Document Existing Component

```
1. User: "Document the chip component"
2. Claude uses documenting-components skill
   - Analyzes ccmChip
   - Creates markdown docs
   - Creates demo page
   - Links them together
3. Done! Complete documentation
```

**Total time:** 15 minutes

---

## What Changed?

### Old Workflow (Removed)
- ❌ `drafting-components` - Created 20-section spec before building
- ❌ `building-demo-pages` - Separate skill for demos only
- ❌ Slow: 30+ min spec → review → build → validate
- ❌ Heavy upfront planning with specs often wrong

### New Workflow
- ✅ `building-components` - Build immediately with standards
- ✅ `documenting-components` - Complete docs + demos together
- ✅ Fast: 15 min to working component
- ✅ Light planning, quick iteration

### Why?
- Specs are often wrong until you build it
- Standards compliance is easier to enforce during build
- Faster feedback loop = better components
- Documentation after building is more accurate

---

## Component Tiers

All skills understand these three tiers:

### Tier 1: DS Components (`src/components/ds/ccm*.vue`)
- Pure presentation components
- Minimal logic, CSS variable-driven
- Must pass all 10 standards
- Reusable across entire project
- Examples: ccmButton, ccmCard, ccmChip

### Tier 2: Wrappers (`src/components/*.vue`)
- Wrap exactly one DS component
- Add business logic and data transformation
- Explicit prop forwarding (no v-bind="$attrs")
- Minimal custom CSS
- Examples: projectCard, blogPostCard

### Tier 3: Content Components (`src/components/content/*.vue`)
- Orchestrate multiple components
- Content structure patterns
- Light composition logic
- Use Tailwind utility classes
- Examples: ArticleCard, SummaryCard

---

## Standards Enforced

### Component Standards

1. **Tailwind Utility Classes** - Use Tailwind v4 classes for all styling
2. **Accessibility** - ARIA labels, focus-visible rings, semantic HTML
3. **Prop Organization** - Grouped by category with TypeScript types
4. **Prop Validation** - All defined props used
5. **Default Values** - Production-ready defaults
6. **Graceful Degradation** - Functional slot fallbacks
7. **Transitions** - Use specific properties with `motion-safe:` prefix

### Wrapper Standards (6 Checks)
- Location: `src/components/` root
- Wraps exactly one DS component
- Explicit prop forwarding
- Data transformation in computed
- Uses composables
- Minimal custom CSS

### Content Standards (4 Checks)
- Location: `src/components/content/`
- Composes multiple components
- Light orchestration only
- Uses Tailwind utility classes

---

## Available Resources

### Existing DS Components (13)
ccmButton, ccmCard, ccmChip, ccmFormField, ccmToggleButton, ccmMenu, ccmMenuItem, ccmMenuButton, ccmSection, ccmHero, ccmTopbar, ccmFooter, ccmByLine

### Composables
- `useSlugify()` - URL slugs
- `useTruncate()` - Text truncation
- `useContentStream()` - Multiple items
- `useContentItem()` - Single item

### Layout Utilities
- Composition primitives in `src/public/css/composition/` (box, center, cluster, container, cover, frame, grid, imposter, reel, stack, switcher)
- Tailwind utility classes for spacing, colors, typography

### Design Tokens
- **Colors**: shadcn/ui theme tokens via CSS variables (`--primary`, `--secondary`, `--muted`, etc.)
- **Spacing/Typography/Radius**: Tailwind v4 built-in utilities
- **Transitions**: `duration-150`, `duration-200`, `duration-300` (Tailwind built-in)

---

## Decision Trees

### Should I compose or create?

**✅ Compose existing components when:**
- 80%+ achievable with existing components
- Fewer than 5-6 CSS variable overrides
- Context-specific customization
- Not a reusable pattern

**🔨 Create new component when:**
- No existing component fits
- Pattern reused across contexts
- Complex business logic needed
- More than 5-6 variable overrides

### Which tier?

**DS Component (Tier 1)** when:
- Visual design pattern
- Reusable across project
- No business logic

**Wrapper (Tier 2)** when:
- Wrapping one DS component
- Adding business logic
- Transforming data

**Content Component (Tier 3)** when:
- Orchestrating multiple components
- Content structure
- Page-level composition

---

## How to Use

### Automatic (Recommended)

Claude automatically invokes skills based on context:

```
"Create a badge component"
→ Uses building-components

"Validate ccmButton"
→ Uses validating-components

"Document the chip component"
→ Uses documenting-components
```

### Explicit

You can explicitly request skills:

```
"Use building-components skill to create a badge"
"Use validating-components skill on ccmCard"
"Use documenting-components skill for ccmButton"
```

---

## Related Documentation

- [Component Standards](../src/content/docs/guidelines/component-standards.md) - All 10 standards explained
- [Component Design Decisions](../src/content/docs/guidelines/component-design-decisions.md) - Architecture rationale
- [General Implementation Guidelines](../src/content/docs/guidelines/general-implementation-guidelines.md) - Overall approach
- [Component Development Guide](../src/content/docs/guidelines/component-development-guide.md) - Detailed guide
- [Component Architecture Quick Reference](../src/content/docs/guidelines/component-architecture-quick-reference.md) - Quick lookup

---

## FAQ

**Q: Do I need to validate every component?**
A: No. The self-check in building-components is usually sufficient. Use validating-components for complex components, migrations, or when requested.

**Q: Do I need to document every component?**
A: Only document DS components or components you plan to reuse. Internal/one-off components don't need docs.

**Q: Can I still create specs?**
A: Yes, for complex components you can still document specifications in `_process/spec-drafts/`, but it's no longer required or part of the main workflow.

**Q: What happened to drafting-components?**
A: Merged into building-components. We now build first instead of spec first.

**Q: What happened to building-demo-pages?**
A: Merged into documenting-components along with markdown documentation.

**Q: How do I migrate old components?**
A: Use validating-components skill. It will audit and provide specific fixes.

---

**Last Updated:** 2025-10-25
**Version:** 2.0.0 (Build-first workflow)
**Status:** Active