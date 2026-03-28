export default defineEventHandler(async (event) => {
  const diagnostics: Record<string, unknown> = {
    message: 'API routes are working!',
    timestamp: new Date().toISOString(),
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    tmpWritable: false,
    betterSqlite3: 'not tested',
    contentQuery: 'not tested',
  }

  // Test /tmp write access
  try {
    const fs = await import('node:fs')
    fs.writeFileSync('/tmp/test-write', 'ok')
    fs.unlinkSync('/tmp/test-write')
    diagnostics.tmpWritable = true
  } catch (e: any) {
    diagnostics.tmpWritable = e.message
  }

  // Test better-sqlite3 loading
  try {
    const Database = (await import('better-sqlite3')).default
    const db = new Database(':memory:')
    db.exec('CREATE TABLE test (id INTEGER)')
    db.close()
    diagnostics.betterSqlite3 = 'working'
  } catch (e: any) {
    diagnostics.betterSqlite3 = e.message
  }

  // Test content query
  try {
    const result = await event.$fetch('/__nuxt_content/summaries/sql_dump.txt?v=test', {
      headers: { 'content-type': 'text/plain' },
    })
    diagnostics.contentQuery = `dump size: ${String(result).length} chars`
  } catch (e: any) {
    diagnostics.contentQuery = e.message || String(e)
  }

  return diagnostics
})
