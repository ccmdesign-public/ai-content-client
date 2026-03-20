import { describe, it, expect } from 'vitest';
import { normalizeMarkdown, normalizeMarkdownPostFix } from '~/server/utils/markdown-normalizer';

describe('normalizeMarkdown (Phase 1 - pre-fixer)', () => {
  describe('before-heading spacing', () => {
    it('adds triple newline before heading preceded by single newline', () => {
      expect(normalizeMarkdown('Some text\n### Heading')).toBe('Some text\n\n\n### Heading');
    });

    it('adds triple newline before heading glued to text (no newline)', () => {
      expect(normalizeMarkdown('Some text### Heading')).toBe('Some text\n\n\n### Heading');
    });

    it('preserves already-correct spacing (double newline before heading)', () => {
      // When there's already a blank line before the heading, the lookbehind (?<!\n)\n
      // does not match because the char before the second \n IS a \n.
      // The after-heading regex on the previous content line would have handled it.
      expect(normalizeMarkdown('Some text\n\n### Heading')).toBe('Some text\n\n### Heading');
    });

    it('does not add spacing when heading is at start of text', () => {
      const result = normalizeMarkdown('### First Heading');
      expect(result).toBe('### First Heading');
    });
  });

  describe('after-heading spacing', () => {
    it('adds triple newline after heading with single newline', () => {
      expect(normalizeMarkdown('### Heading\nContent')).toBe('### Heading\n\n\nContent');
    });

    it('upgrades double newline after heading to triple', () => {
      expect(normalizeMarkdown('### Heading\n\nContent')).toBe('### Heading\n\n\nContent');
    });

    it('preserves heading at end of text (no content after)', () => {
      // Double newline already present, lookbehind doesn't add more
      const result = normalizeMarkdown('Content\n\n### Final Heading');
      expect(result).toBe('Content\n\n### Final Heading');
    });
  });

  describe('all heading levels', () => {
    const headingLevels = ['#', '##', '###', '####', '#####', '######'];

    for (const level of headingLevels) {
      it(`adds spacing around ${level} heading`, () => {
        const input = `Text before\n${level} Heading\nContent after`;
        const result = normalizeMarkdown(input);
        expect(result).toContain(`\n\n\n${level} Heading`);
        expect(result).toContain(`${level} Heading\n\n\n`);
      });
    }
  });

  describe('does not corrupt higher-level headings', () => {
    it('preserves #### (h4) headings intact', () => {
      const result = normalizeMarkdown('Text\n#### Subheading\nContent');
      expect(result).toContain('#### Subheading');
      expect(result).not.toContain('#\n\n\n###');
    });

    it('preserves ##### (h5) headings intact', () => {
      const result = normalizeMarkdown('Text\n##### Deep Dive\nContent');
      expect(result).toContain('##### Deep Dive');
      expect(result).not.toContain('##\n\n\n###');
    });

    it('preserves ###### (h6) headings intact', () => {
      const result = normalizeMarkdown('Text\n###### Detail\nContent');
      expect(result).toContain('###### Detail');
    });
  });

  describe('consecutive headings', () => {
    it('handles consecutive headings', () => {
      const result = normalizeMarkdown('### First\n### Second\n### Third');
      expect(result).toContain('### First\n\n\n### Second\n\n\n### Third');
    });

    it('handles mixed heading levels in sequence', () => {
      const result = normalizeMarkdown('## Main\n### Sub\n#### Deep');
      expect(result).toContain('## Main\n\n\n### Sub\n\n\n#### Deep');
    });
  });

  describe('edge cases', () => {
    it('returns empty string for empty input', () => {
      expect(normalizeMarkdown('')).toBe('');
    });

    it('returns empty string for null input', () => {
      expect(normalizeMarkdown(null as unknown as string)).toBe('');
    });

    it('returns empty string for undefined input', () => {
      expect(normalizeMarkdown(undefined as unknown as string)).toBe('');
    });

    it('does not match inline ### in content', () => {
      const input = 'Use ### for subheadings in your document';
      // The inline ### has a space before it, so [^\s#] won't match
      expect(normalizeMarkdown(input)).toBe('Use ### for subheadings in your document');
    });

    it('handles heading with trailing whitespace', () => {
      const result = normalizeMarkdown('### Heading   \nContent');
      expect(result).toContain('### Heading   \n\n\n');
    });

    it('handles empty heading (### followed by space only)', () => {
      // "### " has a space after ###, but .+ requires at least one non-newline char
      // The before-heading regex matches but the after-heading regex needs .+ content
      const result = normalizeMarkdown('Text\n### \nContent');
      expect(result).toContain('### ');
    });

    it('handles line ending with # followed by heading', () => {
      // "C#\n### Tools" - the # at end is not a newline, so lookbehind (?<!\n) matches
      const result = normalizeMarkdown('Written in C#\n### Tools');
      expect(result).toContain('\n\n\n### Tools');
    });

    it('does not match # in URLs or hashtags', () => {
      const input = 'Visit https://example.com/page#section for details';
      // The # after "page" is followed by "section" not " " so it won't match #{1,6} followed by space
      expect(normalizeMarkdown(input)).toBe(input);
    });
  });

  describe('idempotency', () => {
    it('is idempotent when run twice', () => {
      const inputs = [
        '### Heading\nContent',
        'Text\n### Heading\nContent',
        '### First\n### Second\n### Third',
        '## Main\n\n### Sub\n\nContent',
        'Text\n#### Sub\nMore',
        '### Heading\n\n\nContent',
      ];

      for (const input of inputs) {
        const once = normalizeMarkdown(input);
        const twice = normalizeMarkdown(once);
        expect(twice).toBe(once);
      }
    });
  });
});

describe('normalizeMarkdownPostFix (Phase 2 - post-fixer)', () => {
  describe('before-heading spacing', () => {
    it('adds double newline before heading preceded by single newline', () => {
      expect(normalizeMarkdownPostFix('Some text\n### Heading')).toBe('Some text\n\n### Heading');
    });

    it('adds double newline before heading glued to text', () => {
      expect(normalizeMarkdownPostFix('text### Heading')).toBe('text\n\n### Heading');
    });
  });

  describe('after-heading spacing', () => {
    it('adds double newline after heading with single newline', () => {
      expect(normalizeMarkdownPostFix('### Heading\nContent')).toBe('### Heading\n\nContent');
    });
  });

  describe('all heading levels', () => {
    const headingLevels = ['#', '##', '###', '####', '#####', '######'];

    for (const level of headingLevels) {
      it(`handles ${level} heading`, () => {
        const result = normalizeMarkdownPostFix(`Text\n${level} Heading\nContent`);
        expect(result).toContain(`\n\n${level} Heading`);
        expect(result).toContain(`${level} Heading\n\n`);
      });
    }
  });

  describe('does not corrupt higher-level headings', () => {
    it('preserves #### headings intact', () => {
      const result = normalizeMarkdownPostFix('Text\n#### Sub\nContent');
      expect(result).toContain('#### Sub');
      expect(result).not.toContain('#\n\n###');
    });
  });

  describe('edge cases', () => {
    it('returns empty string for empty input', () => {
      expect(normalizeMarkdownPostFix('')).toBe('');
    });

    it('returns empty string for null input', () => {
      expect(normalizeMarkdownPostFix(null as unknown as string)).toBe('');
    });
  });

  describe('idempotency', () => {
    it('is idempotent when run twice', () => {
      const inputs = [
        '### Heading\nContent',
        'Text\n### Heading\nContent',
        '### First\n### Second',
        'Text\n#### Sub\nMore',
      ];

      for (const input of inputs) {
        const once = normalizeMarkdownPostFix(input);
        const twice = normalizeMarkdownPostFix(once);
        expect(twice).toBe(once);
      }
    });
  });
});

describe('normalizeMarkdown + normalizeMarkdownPostFix integration', () => {
  it('full pipeline produces correct heading spacing', () => {
    const input = '### Key Points\nThe first point is important.';
    const afterPre = normalizeMarkdown(input);
    // After pre-fixer: triple newline after heading
    expect(afterPre).toBe('### Key Points\n\n\nThe first point is important.');

    // After post-fixer (simulating post-fix on already-protected text)
    const afterPost = normalizeMarkdownPostFix(afterPre);
    expect(afterPost).toBe('### Key Points\n\n\nThe first point is important.');
  });

  it('heading + content with single newline before and after', () => {
    const input = 'Some text\n### Heading\nContent after';
    const afterPre = normalizeMarkdown(input);
    expect(afterPre).toBe('Some text\n\n\n### Heading\n\n\nContent after');
  });

  it('full pipeline is idempotent', () => {
    const pipeline = (text: string) => {
      let result = normalizeMarkdown(text);
      result = normalizeMarkdownPostFix(result);
      return result;
    };

    const inputs = [
      '### Heading\nContent',
      'Text\n### Heading\nContent',
      '### First\n### Second\n### Third',
      '## Main\n\n### Sub\n\nContent',
      'Already\n\n### Correct\n\nSpacing',
    ];

    for (const input of inputs) {
      const once = pipeline(input);
      const twice = pipeline(once);
      expect(twice).toBe(once);
    }
  });
});
