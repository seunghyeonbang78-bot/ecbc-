import { mkdir, copyFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const output = new URL('public/', root);
await mkdir(output, { recursive: true });
// Only public website assets are uploaded; backend source and settings stay out.
for (const name of ['index.html', 'style.css', 'app.js']) {
  await copyFile(new URL(name, root), new URL(name, output));
}
console.log('Prepared ECBC public assets.');
