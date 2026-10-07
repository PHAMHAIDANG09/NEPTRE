import { spawn } from 'node:child_process';
import { createServer } from 'vite';

// Keep Vite in this process so it closes reliably on Windows after the tests.
const server = process.env.PLAYWRIGHT_BASE_URL ? null : await createServer({
  server: { host: 'localhost', port: 4173, strictPort: true },
});

try {
  await server?.listen();
  const runner = spawn(process.execPath, [
    'node_modules/@playwright/test/cli.js', 'test', ...process.argv.slice(2),
  ], { stdio: 'inherit', env: process.env });
  process.exitCode = await new Promise((resolve, reject) => {
    runner.once('error', reject);
    runner.once('exit', code => resolve(code ?? 1));
  });
} finally {
  await server?.close();
}
