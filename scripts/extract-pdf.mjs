// scripts/extract-pdf.mjs
// NoteCollate PDF 鎻愬彇鑴氭湰

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import pdf from 'pdf-parse';

export async function extractPdfText(pdfPath) {
  const buf = readFileSync(pdfPath);
  const data = await pdf(buf);
  return {
    text: data.text,
    numPages: data.numpages,
  };
}

export async function quickExtract(pdfPath) {
  const result = await extractPdfText(pdfPath);
  console.log(`Pages: ${result.numPages}, Text length: ${result.text.length}`);
  return result.text;
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain && process.argv[2]) {
  extractPdfText(process.argv[2]).then(result => {
    console.log(result.text);
  }).catch(err => {
    console.error('Error:', err);
  });
}
