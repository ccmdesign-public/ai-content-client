import { describe, it, expect } from 'vitest';
import {
  fixBrokenWords,
  fixBrokenSentences,
  normalizeText,
  normalizeSingleLine
} from '~/server/utils/text-normalizer';

describe('fixBrokenWords', () => {
  it('fixes CamelCase breaks with double newline', () => {
    expect(fixBrokenWords('Whats\n\nApp')).toBe('WhatsApp');
    expect(fixBrokenWords('Door\n\nDash')).toBe('DoorDash');
  });

  it('fixes CamelCase breaks with single newline', () => {
    expect(fixBrokenWords('Whats\nApp')).toBe('WhatsApp');
    expect(fixBrokenWords('Door\nDash')).toBe('DoorDash');
  });

  it('fixes name prefix breaks', () => {
    expect(fixBrokenWords('Mc\nKinsey')).toBe('McKinsey');
    expect(fixBrokenWords('Mac\nDonald')).toBe('MacDonald');
  });

  it('fixes word + acronym breaks', () => {
    expect(fixBrokenWords('Open\nAI')).toBe('OpenAI');
    expect(fixBrokenWords('Chat\nGPT')).toBe('ChatGPT');
    expect(fixBrokenWords('Deep\nSeek')).toBe('DeepSeek');
  });

  it('fixes tech compound breaks', () => {
    expect(fixBrokenWords('Dev\nOps')).toBe('DevOps');
    expect(fixBrokenWords('Git\nHub')).toBe('GitHub');
    expect(fixBrokenWords('Linked\nIn')).toBe('LinkedIn');
    expect(fixBrokenWords('You\nTube')).toBe('YouTube');
  });

  it('fixes apostrophe breaks', () => {
    expect(fixBrokenWords("Linked\nIn's")).toBe("LinkedIn's");
  });

  it('fixes mid-word lowercase breaks (4+ chars each side)', () => {
    expect(fixBrokenWords('infor\nmation')).toBe('information');
    expect(fixBrokenWords('trans\naction')).toBe('transaction');
  });

  it('preserves short word breaks (conservative matching)', () => {
    // Short words are intentionally NOT joined to avoid false positives
    expect(fixBrokenWords('pro\ncess')).toBe('pro\ncess');
    expect(fixBrokenWords('one\ntwo')).toBe('one\ntwo');
  });

  it('preserves intentional paragraph breaks', () => {
    const input = 'First paragraph.\n\nSecond paragraph.';
    expect(fixBrokenWords(input)).toBe('First paragraph.\n\nSecond paragraph.');
  });

  it('preserves regular sentence line breaks', () => {
    const input = 'Line one\nLine two';
    expect(fixBrokenWords(input)).toBe('Line one\nLine two');
  });

  it('preserves bullet points', () => {
    const input = '* First item\n* Second item';
    expect(fixBrokenWords(input)).toBe('* First item\n* Second item');
  });

  it('handles empty string', () => {
    expect(fixBrokenWords('')).toBe('');
  });
});

describe('fixBrokenSentences', () => {
  it('fixes comma-broken sentences', () => {
    expect(fixBrokenSentences('First item,\nsecond item')).toBe('First item, second item');
  });

  it('fixes article-broken sentences', () => {
    expect(fixBrokenSentences('This is a\ntest')).toBe('This is a test');
    expect(fixBrokenSentences('This is the\nresult')).toBe('This is the result');
  });

  it('fixes preposition-broken sentences', () => {
    expect(fixBrokenSentences('Part of\nthe solution')).toBe('Part of the solution');
    expect(fixBrokenSentences('Located in\nNew York')).toBe('Located in New York');
  });

  it('preserves intentional sentence breaks', () => {
    const input = 'First sentence.\n\nSecond sentence.';
    expect(fixBrokenSentences(input)).toBe('First sentence.\n\nSecond sentence.');
  });
});

describe('normalizeText', () => {
  it('handles complex broken text from production', () => {
    const input = 'The Mc\nKinsey report on Whats\n\nApp usage...';
    const expected = 'The McKinsey report on WhatsApp usage...';
    expect(normalizeText(input)).toBe(expected);
  });

  it('normalizes literal \\n to actual newlines', () => {
    const input = 'Line one\\nLine two';
    expect(normalizeText(input)).toBe('Line one\nLine two');
  });

  it('normalizes Windows line endings', () => {
    const input = 'Line one\r\nLine two';
    expect(normalizeText(input)).toBe('Line one\nLine two');
  });

  it('collapses excessive blank lines', () => {
    const input = 'Paragraph one.\n\n\n\n\nParagraph two.';
    expect(normalizeText(input)).toBe('Paragraph one.\n\nParagraph two.');
  });

  it('removes repetitive punctuation patterns', () => {
    const input = 'End of text......';
    expect(normalizeText(input)).toBe('End of text.');
  });

  it('trims trailing whitespace per line', () => {
    const input = 'Line one   \nLine two  ';
    expect(normalizeText(input)).toBe('Line one\nLine two');
  });

  it('handles empty input', () => {
    expect(normalizeText('')).toBe('');
    expect(normalizeText(null as unknown as string)).toBe('');
    expect(normalizeText(undefined as unknown as string)).toBe('');
  });

  it('preserves markdown formatting', () => {
    const input = '**Bold text** and *italic text*\n\n* Bullet one\n* Bullet two';
    expect(normalizeText(input)).toBe('**Bold text** and *italic text*\n\n* Bullet one\n* Bullet two');
  });

  it('adds blank line after ### heading with single newline', () => {
    const input = '### Key Points\nThe first point is important.';
    expect(normalizeText(input)).toBe('### Key Points\n\nThe first point is important.');
  });

  it('adds blank line before ### heading when preceded by text', () => {
    const input = 'Some text### Heading';
    expect(normalizeText(input)).toBe('Some text\n\n### Heading');
  });

  it('preserves already-correct ### heading spacing', () => {
    const input = '### Key Points\n\nThe first point is important.';
    expect(normalizeText(input)).toBe('### Key Points\n\nThe first point is important.');
  });

  it('handles ### heading at start of text with missing blank line after', () => {
    const input = '### Overview\nThis is the overview content.';
    expect(normalizeText(input)).toBe('### Overview\n\nThis is the overview content.');
  });

  it('handles multiple ### headings with mixed spacing', () => {
    const input = '### First\nContent one.\n\n### Second\n\nContent two.';
    expect(normalizeText(input)).toBe('### First\n\nContent one.\n\n### Second\n\nContent two.');
  });

  it('does not affect bullet points after ### heading', () => {
    const input = '### Tools\n* Tool A\n* Tool B';
    expect(normalizeText(input)).toBe('### Tools\n\n* Tool A\n* Tool B');
  });

  it('collapses excessive blank lines after ### heading', () => {
    const input = '### Heading\n\n\n\nContent after excessive blanks.';
    expect(normalizeText(input)).toBe('### Heading\n\nContent after excessive blanks.');
  });

  it('handles ### heading followed by another ### heading', () => {
    const input = '### First Heading\n### Second Heading\nContent here.';
    expect(normalizeText(input)).toBe('### First Heading\n\n### Second Heading\n\nContent here.');
  });

  it('handles ### heading at end of text', () => {
    const input = 'Some content.\n\n### Final Heading';
    expect(normalizeText(input)).toBe('Some content.\n\n### Final Heading');
  });

  it('preserves heading boundary when heading ends with article "The"', () => {
    const input = '### The\ncontent here';
    expect(normalizeText(input)).toBe('### The\n\ncontent here');
  });

  it('preserves heading boundary when heading ends with preposition "to"', () => {
    const input = '### Guide to\nmastering skills';
    expect(normalizeText(input)).toBe('### Guide to\n\nmastering skills');
  });

  it('preserves heading boundary when heading ends with "and"', () => {
    const input = '### Pros and\ncons of AI';
    expect(normalizeText(input)).toBe('### Pros and\n\ncons of AI');
  });

  it('preserves heading boundary when heading ends with "for"', () => {
    const input = '### Items for\nreview of the code';
    expect(normalizeText(input)).toBe('### Items for\n\nreview of the code');
  });

  it('does not corrupt #### headings into # + ### split', () => {
    // Regression test for Finding 2: #### must not be split into "#\n\n### "
    // Note: fixBrokenWords may join CamelCase patterns (Subheading+Content),
    // but the heading level (####) must remain intact -- no stray # on previous line.
    const result = normalizeText('#### Subheading\nContent here');
    expect(result).toContain('####');
    expect(result).not.toMatch(/^#\n/); // No stray # followed by newline
    expect(result).not.toContain('#\n\n###'); // No split into # + ###
  });

  it('does not corrupt #### headings preceded by text', () => {
    const result = normalizeText('Some text\n#### Subheading\nContent here');
    expect(result).toContain('####');
    expect(result).not.toContain('#\n\n###'); // No split into # + ###
  });

  it('does not treat inline ### in content as a heading', () => {
    const input = 'Use ### for subheadings in your document';
    expect(normalizeText(input)).toBe('Use ### for subheadings in your document');
  });

  it('collapses whitespace-only lines after heading without leaving triple newlines', () => {
    const input = '### Heading\n   \nContent';
    expect(normalizeText(input)).toBe('### Heading\n\nContent');
  });
});

describe('normalizeSingleLine', () => {
  it('converts newlines to spaces', () => {
    expect(normalizeSingleLine('First\nSecond')).toBe('First Second');
    expect(normalizeSingleLine('First\n\nSecond')).toBe('First Second');
  });

  it('converts literal \\n to spaces', () => {
    expect(normalizeSingleLine('First\\nSecond')).toBe('First Second');
  });

  it('collapses multiple spaces', () => {
    expect(normalizeSingleLine('Too   many   spaces')).toBe('Too many spaces');
  });

  it('trims leading and trailing whitespace', () => {
    expect(normalizeSingleLine('  trimmed  ')).toBe('trimmed');
  });

  it('handles empty input', () => {
    expect(normalizeSingleLine('')).toBe('');
    expect(normalizeSingleLine(null as unknown as string)).toBe('');
  });
});

describe('real-world examples from production', () => {
  it('fixes the WhatsApp agents example', () => {
    const input = `New AI tools include Google's **Gmail agent 'CC'**, 11 Labs' **Whats

App agents**, and Door

Dash's conversational discovery app **Zesty**.`;

    const result = normalizeText(input);

    expect(result).toContain('WhatsApp agents');
    expect(result).toContain('DoorDash');
    expect(result).not.toContain('Whats\n\nApp');
    expect(result).not.toContain('Door\n\nDash');
  });

  it('handles LinkedIn possessive', () => {
    const input = "Linked\nIn's new feature";
    expect(normalizeText(input)).toBe("LinkedIn's new feature");
  });

  it('handles DevOps compound', () => {
    const input = 'Modern Dev\nOps practices';
    expect(normalizeText(input)).toBe('Modern DevOps practices');
  });
});
