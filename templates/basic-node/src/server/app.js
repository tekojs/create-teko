import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TekoRenderer } from '@tekojs/ssr';
import { createNodeTekoHandler } from '@tekojs/http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renderer = new TekoRenderer({
  viewsPath: path.resolve(__dirname, '../views')
});

const server = http.createServer(createNodeTekoHandler(renderer));

server.listen(3333, () => {
  console.log('Teko app rodando em http://localhost:3333');
});
