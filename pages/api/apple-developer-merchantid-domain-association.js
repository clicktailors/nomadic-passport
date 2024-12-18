import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const filePath = join(process.cwd(), 'public', '.well-known', 'apple-developer-merchantid-domain-association');
  const fileContents = readFileSync(filePath, 'utf8');
  res.setHeader('Content-Type', 'text/plain');
  res.send(fileContents);
}
