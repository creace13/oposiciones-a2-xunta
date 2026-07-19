import pypdf
import sys

def extract_pdf(pdf_path, out_path):
    reader = pypdf.PdfReader(pdf_path)
    text = ""
    for idx, page in enumerate(reader.pages):
        page_text = page.extract_text()
        if page_text:
            text += f"\n--- Page {idx + 1} ---\n" + page_text
    
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Extracted {len(reader.pages)} pages, {len(text)} characters to {out_path}")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: extract_pypdf.py <pdf_path> <out_path>")
        sys.exit(1)
    extract_pdf(sys.argv[1], sys.argv[2])
