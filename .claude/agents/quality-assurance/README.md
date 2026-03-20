# Quality Assurance Agent

**Tier**: 2 (High Value)
**Priority**: ⭐⭐
**Type**: Agent
**Auto-trigger**: Yes

## Purpose

Run comprehensive quality checks before commits with consolidated error reporting. Executes multiple validation tools in parallel, auto-fixes safe issues, and provides a single consolidated report categorized by severity.

## Auto-Trigger Conditions

This agent activates automatically when the developer says:

- "I'm done with [feature]"
- "ready to commit"
- "run QA checks"
- "validate everything"
- "check quality"

## Workflow

1. **Load Configuration**
   - Read check definitions from `.claude/config/qa-checks.json`
   - Determine which checks can run in parallel
   - Identify auto-fixable issues

2. **Execute Parallel Checks**
   - Run independent checks concurrently:
     - Design Tokens validation
     - CSS Linting
     - ESLint
   - Maximum 3 concurrent processes

3. **Execute Sequential Checks**
   - Run dependent checks in order:
     - Tests with coverage
     - TypeScript type checking
     - Production build (optional)

4. **Auto-Fix Safe Issues**
   - If enabled, automatically fix non-breaking issues:
     - ESLint auto-fixable rules
     - CSS formatting issues
     - Token reference corrections

5. **Consolidate Results**
   - Aggregate all errors and warnings
   - Categorize by severity (error/warning/info)
   - Group related issues together

6. **Generate Report**
   - Summary: Pass/fail for each check
   - Blocking issues: Must fix before commit
   - Warnings: Review recommended
   - Auto-fixes: What was corrected
   - Recommendations: Next steps

7. **Return Exit Code**
   - `0`: All checks passed
   - `1`: Warnings only, safe to commit
   - `2`: Blocking errors, cannot commit

## QA Checks

### 1. CSS Linting ❌ (Blocking)

**Command**: `npm run lint:css`

**Validates**:
- CSS syntax and formatting
- Stylelint rules compliance
- Property ordering

**Auto-fix**: Yes (via `npm run lint:css:fix`)

### 3. ESLint ❌ (Blocking)

**Command**: `npx eslint src --ext .ts,.vue`

**Validates**:
- JavaScript/TypeScript code quality
- Vue component best practices
- Import/export consistency
- Code formatting

**Auto-fix**: Yes (via `npx eslint src --ext .ts,.vue --fix`)

### 4. Tests ❌ (Blocking)

**Command**: `npx vitest run --coverage`

**Validates**:
- All tests passing
- Minimum 80% code coverage
- No skipped tests
- Performance regressions

**Auto-fix**: No (requires manual test updates)

**Coverage Threshold**: 80%

### 5. TypeScript ❌ (Blocking)

**Command**: `npm run typecheck`

**Validates**:
- Type safety across codebase
- No `any` types without justification
- Proper type inference
- Generic type usage

**Auto-fix**: No (requires manual type corrections)

### 6. Build ⚠️ (Non-blocking)

**Command**: `npm run build`

**Validates**:
- Production build succeeds
- No build warnings
- Bundle size within limits
- Tree-shaking effectiveness

**Auto-fix**: No

## Example Output

### Scenario 1: All Checks Pass ✅

```
QA Report
=========

✅ Design Tokens: PASSED
✅ CSS Linting: PASSED
✅ ESLint: PASSED
✅ Tests: PASSED (coverage: 87%)
✅ TypeScript: PASSED
✅ Build: PASSED

Summary: All checks passed! Ready to commit.

Exit Code: 0
```

### Scenario 2: Warnings Only ⚠️

```
QA Report
=========

✅ Design Tokens: PASSED
⚠️  CSS Linting: 2 warnings
✅ ESLint: PASSED (3 warnings auto-fixed)
✅ Tests: PASSED (coverage: 84%)
✅ TypeScript: PASSED
⚠️  Build: PASSED with warnings (bundle size increased 5%)

Warnings (2):
--------------
CSS Linting:
- src/components/ds/molecules/ccmCard.vue:42 - Consider using shorthand property
- src/public/css/components/button.css:18 - Property order could be improved

Auto-fixes Applied (3):
-----------------------
ESLint:
- Fixed missing semicolons (2 files)
- Fixed unused imports (1 file)

Summary: Safe to commit. Review warnings at your convenience.

Exit Code: 1
```

### Scenario 3: Blocking Errors ❌

```
QA Report
=========

✅ Design Tokens: PASSED
⚠️  CSS Linting: 2 warnings
❌ ESLint: 1 error, 3 warnings
✅ Tests: PASSED (coverage: 87%)
✅ TypeScript: PASSED

Blocking Issues (1):
--------------------
ESLint:
- src/components/ds/molecules/ccmButton.vue:42
  Error: Unexpected console.log statement (no-console)
  Fix: Remove console.log or use proper logging

Warnings (5):
-------------
CSS Linting:
- [2 warnings as above]

ESLint:
- src/composables/usePlaylist.ts:15 - Prefer const over let
- src/pages/index.vue:8 - Unused variable 'computed'
- src/server/api/summarize.ts:22 - Missing error handling

Auto-fixes Applied (0):
-----------------------
(Cannot auto-fix blocking errors)

Recommendations:
----------------
1. Remove console.log from ccmButton.vue:42
2. Run 'npx eslint src --ext .ts,.vue --fix' to auto-fix warnings
3. Consider adding try/catch to summarize.ts:22

Summary: CANNOT COMMIT - Fix blocking errors first.

Exit Code: 2
```

### Scenario 4: Coverage Below Threshold ❌

```
QA Report
=========

✅ Design Tokens: PASSED
✅ CSS Linting: PASSED
✅ ESLint: PASSED
❌ Tests: FAILED (coverage: 76% - below 80% threshold)
✅ TypeScript: PASSED

Blocking Issues (1):
--------------------
Tests:
- Code coverage: 76% (minimum: 80%)

  Uncovered files:
  - src/composables/usePlaylistSync.ts (42% coverage)
  - src/components/custom/VideoSummaryCard.vue (68% coverage)

Recommendations:
----------------
1. Add tests for usePlaylistSync error handling
2. Test VideoSummaryCard edge cases (empty state, loading)
3. Run Test Generator skill to scaffold missing tests

Summary: CANNOT COMMIT - Increase test coverage to 80%+

Exit Code: 2
```

## Auto-Fix Capabilities

The QA Agent can automatically fix:

### Safe Auto-Fixes (Applied automatically)
- ESLint formatting issues (semicolons, spacing, quotes)
- CSS property ordering
- Unused imports
- Primitive-to-semantic token replacements

### Manual Fixes Required
- Logic errors
- Type mismatches
- Missing test coverage
- Console.log statements
- Missing error handling

## Parallel Execution

Independent checks run concurrently for speed:

```
Time without parallelization: ~90 seconds
├── Design Tokens: 5s
├── CSS Linting: 8s
├── ESLint: 15s
├── Tests: 45s
├── TypeScript: 12s
└── Build: 5s

Time with parallelization: ~52 seconds
├── [Parallel] Design Tokens + CSS Linting + ESLint: 15s
├── Tests: 45s
├── TypeScript: 12s
└── Build: 5s (skipped if non-blocking)
```

**Performance Improvement**: ~42% faster

## Configuration

**File**: `.claude/config/qa-checks.json`

Customize:
- Which checks are blocking vs warning
- Coverage thresholds
- Auto-fix behavior
- Parallel execution settings
- Report formatting

## Integration with Other Tools

The QA Agent works with:

1. **Test Generator (2.1)**: Suggests using Test Generator when coverage is low
2. **Design Token Validator (2.2)**: Runs token validation as part of checks
3. **Code Reviewer (1.2)**: Pre-commit QA catches issues Code Reviewer flags during development
4. **Git hooks**: Can be integrated into pre-commit hooks for automatic enforcement

## Best Practices

1. **Run before commits** - Always run QA checks before pushing code
2. **Fix blocking errors first** - Don't commit with exit code 2
3. **Review warnings** - Address warnings to maintain code quality
4. **Trust auto-fixes** - Automated fixes are safe and tested
5. **Maintain 80%+ coverage** - Don't let test coverage slip

## NPM Scripts Required

Ensure these scripts exist in `package.json`:

```json
{
  "scripts": {
    "lint:css": "stylelint 'src/**/*.{css,vue}'",
    "lint:css:fix": "stylelint 'src/**/*.{css,vue}' --fix",
    "typecheck": "vue-tsc --noEmit"
  }
}
```

## Success Metrics

- **Execution time**: <60 seconds for full QA suite
- **Auto-fix rate**: 60%+ of issues auto-fixed
- **False positive rate**: <5%
- **Developer satisfaction**: Reduces manual QA time by 80%+

## Exit Codes

- **0**: All checks passed - safe to commit
- **1**: Warnings only - safe to commit, review recommended
- **2**: Blocking errors - CANNOT commit until fixed

## Dependencies

- `npm run lint:css` - CSS linting
- `npx eslint` - JavaScript/TypeScript linting
- `npx vitest` - Test runner
- `npm run typecheck` - TypeScript compiler
- `npm run build` - Production build
- `.claude/config/qa-checks.json` - Check configuration

## Version History

- **1.0.0** (2025-12-31): Initial implementation with parallel execution and auto-fix
