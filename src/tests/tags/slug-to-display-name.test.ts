import { describe, it, expect } from 'vitest'
import { slugToDisplayName } from '../../../scripts/sync-tags'

describe('slugToDisplayName', () => {
  it('capitalizes simple single-word slugs', () => {
    expect(slugToDisplayName('agents')).toBe('Agents')
    expect(slugToDisplayName('analytics')).toBe('Analytics')
  })

  it('capitalizes multi-word slugs', () => {
    expect(slugToDisplayName('web-development')).toBe('Web Development')
    expect(slugToDisplayName('open-source')).toBe('Open Source')
  })

  it('correctly handles AI/ML acronyms', () => {
    expect(slugToDisplayName('ai-general')).toBe('AI General')
    expect(slugToDisplayName('ai-coding')).toBe('AI Coding')
    expect(slugToDisplayName('ml')).toBe('ML')
    expect(slugToDisplayName('nlp')).toBe('NLP')
    expect(slugToDisplayName('llm')).toBe('LLM')
    expect(slugToDisplayName('llms')).toBe('LLMs')
    expect(slugToDisplayName('rag')).toBe('RAG')
    expect(slugToDisplayName('mcp')).toBe('MCP')
  })

  it('correctly handles infrastructure acronyms', () => {
    expect(slugToDisplayName('aws')).toBe('AWS')
    expect(slugToDisplayName('gcp')).toBe('GCP')
    expect(slugToDisplayName('ci-cd')).toBe('CI CD')
    expect(slugToDisplayName('devops')).toBe('DevOps')
  })

  it('correctly handles web/API acronyms', () => {
    expect(slugToDisplayName('api-design')).toBe('API Design')
    expect(slugToDisplayName('html')).toBe('HTML')
    expect(slugToDisplayName('css')).toBe('CSS')
    expect(slugToDisplayName('sql')).toBe('SQL')
    expect(slugToDisplayName('graphql')).toBe('GraphQL')
  })

  it('correctly handles platform-specific casing', () => {
    expect(slugToDisplayName('ios')).toBe('iOS')
    expect(slugToDisplayName('nextjs')).toBe('Next.js')
    expect(slugToDisplayName('nodejs')).toBe('Node.js')
    expect(slugToDisplayName('vuejs')).toBe('Vue.js')
    expect(slugToDisplayName('openai')).toBe('OpenAI')
  })

  it('correctly handles SaaS/PaaS/IaaS casing', () => {
    expect(slugToDisplayName('saas')).toBe('SaaS')
    expect(slugToDisplayName('paas')).toBe('PaaS')
    expect(slugToDisplayName('iaas')).toBe('IaaS')
  })

  it('handles mixed slugs with acronyms and regular words', () => {
    expect(slugToDisplayName('ai-coding')).toBe('AI Coding')
    expect(slugToDisplayName('api-design')).toBe('API Design')
    expect(slugToDisplayName('ui-design')).toBe('UI Design')
  })
})
