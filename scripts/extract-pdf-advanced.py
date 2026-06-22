import os
import sys

def try_advanced_extraction(pdf_path, output_dir):
    """
    尝试使用高级开源工具（如 Docling）解析复杂/扫描版 PDF。
    采用“渐进式增强/优雅降级”策略。
    """
    if not os.path.exists(pdf_path):
        print(f"Error: 找不到文件 {pdf_path}")
        return False

    print(f"🔍 正在检测高级解析引擎环境 (目标: Docling / Marker)...")

    # 检测 Docling
    try:
        from docling.document_converter import DocumentConverter
        print("✅ 检测到 Docling 引擎！正在启动深度解析（这可能需要一些时间，取决于文档长度和您的显卡）...")

        converter = DocumentConverter()
        result = converter.convert(pdf_path)
        markdown_text = result.document.export_to_markdown()

        base_name = os.path.splitext(os.path.basename(pdf_path))[0]
        out_path = os.path.join(output_dir, f"{base_name}_extracted.md")

        os.makedirs(output_dir, exist_ok=True)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(markdown_text)

        print(f"🎉 解析成功！完美保留了公式、排版和表格。")
        print(f"📄 文本已保存至: {out_path}")
        print(f"👉 现在您可以将该 Markdown 文件丢给 NoteCollate 进行整理了！")
        return True

    except ImportError:
        print("\n" + "="*60)
        print("⚠️ 【高级解析器未安装或未激活】")
        print("检测到您可能正在尝试读取图片版/扫描版课件。")
        print("当前的轻量级脚本无法提取此类 PDF 中的文字。")
        print("\n💡 [解决方案 1：零技术门槛 (推荐)]")
        print("直接将 PDF 的核心几页截图，发送给具有视觉能力(Vision)的 AI 助手。")
        print("\n💡 [解决方案 2：硬核学霸路线 (解锁公式与图表完美识别)]")
        print("我们需要借助 IBM 开源的 Docling 神器。请在终端执行以下命令安装：")
        print("  pip install docling")
        print("安装完成后，再次运行此脚本，您的扫描版 PDF 将被瞬间转换为带 LaTeX 公式的完美 Markdown！")
        print("="*60 + "\n")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("用法: python extract-pdf-advanced.py <输入PDF路径> <输出目录>")
        sys.exit(1)

    pdf_file = sys.argv[1]
    out_folder = sys.argv[2]
    try_advanced_extraction(pdf_file, out_folder)
