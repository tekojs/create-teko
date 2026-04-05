import { mkdir, writeFile, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const projectName = process.argv[2] || 'my-teko-app';
  const targetDir = resolve(process.cwd(), projectName);

  if (existsSync(targetDir)) {
    console.error(`A pasta "${projectName}" já existe.`);
    process.exit(1);
  }

  await mkdir(targetDir, { recursive: true });

  const templatesDir = resolve(__dirname, '../templates/basic-node');
  await cp(templatesDir, targetDir, { recursive: true });

  const pkgPath = join(targetDir, 'package.json');
  const pkgRaw = await (await import('node:fs/promises')).readFile(pkgPath, 'utf8');
  const pkg = JSON.parse(pkgRaw);
  pkg.name = projectName;
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

  console.log(`Projeto Teko criado em: ${targetDir}`);
  console.log('Próximos passos:');
  console.log(`  cd ${projectName}`);
  console.log('  npm install');
  console.log('  npm run dev');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
