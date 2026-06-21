// scripts/extract-pdf.mjs
// NoteCollate PDF 提取脚本
// 用法: 在 Node REPL 中 import 此文件，传入 PDF 路径
// 返回: { text, numPages }
//
// 依赖安装:
//   npm install pdf-parse
//   然后将 node_modules 目录添加到 REPL 搜索路径:
//   nodeRepl.js_add_node_module_dir("path/to/node_modules");

import { readFileSync } from 'node:fs';
import { PDFParse } from 'pdf-parse';

/**
 * 从 PDF 文件提取全文文字
 * @param {string} pdfPath - PDF 文件的绝对路径
 * @param {object} [opts] - 可选参数
 * @param {number[]} [opts.pages] - 指定提取的页码（从1开始），不传则提取全部
 * @returns {Promise<{text: string, numPages: number, pages: Array}>}
 */
export async function extractPdfText(pdfPath, opts = {}) {
  const buf = readFileSync(pdfPath);
  const parser = new PDFParse({ data: buf });

  const params = {};
  if (opts.pages) {
    params.partial = opts.pages;
  }

  const result = await parser.getText(params);
  return {
    text: result.text,
    numPages: result.total,
    pages: result.pages,
  };
}

/**
 * 在 Node REPL 中快速使用的便捷函数
 * 用法示例:
 *   var pdfText = await extractPdfText("D:/path/to/file.pdf");
 *   nodeRepl.write(pdfText.text);
 */
export async function quickExtract(pdfPath) {
  const result = await extractPdfText(pdfPath);
  console.log(Pages: , Text length: );
  return result.text;
}

// CLI 模式：直接运行脚本时使用
// 用法: node extract-pdf.mjs <pdf路径>
const isMain = process.argv[1] === import.meta.url;
if (isMain && process.argv[2]) {
  const result = await extractPdfText(process.argv[2]);
  console.log(result.text);
}
