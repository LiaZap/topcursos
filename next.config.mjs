import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output for a small production Docker image (server.js + minimal node_modules).
  output: 'standalone',
  reactStrictMode: true,
  // Ancora o rastreamento de arquivos na raiz do projeto (evita subir para
  // diretórios pais quando há outros lockfiles na máquina).
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
