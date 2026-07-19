import re
from pypdf import PdfReader

pdf_path = r"f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\documentos\troncal\boe\ley-9-2017-contratos-sector-publico.pdf"
output_path = r"f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\tmp\articles_extracted.txt"

reader = PdfReader(pdf_path)

print(f"Total pages: {len(reader.pages)}")

pages_text = []
for idx, page in enumerate(reader.pages):
    text = page.extract_text()
    pages_text.append((idx + 1, text))

with open(output_path, "w", encoding="utf-8") as out:
    def write_article(art_num):
        out.write(f"\n==================================================\n")
        out.write(f"ARTÍCULO {art_num}\n")
        out.write(f"==================================================\n")
        
        # Matches 'Artículo 44.' or 'Artículo 44 ' or 'Articulo 44'
        pattern = re.compile(rf"Art[íi]culo\s+{art_num}\b", re.IGNORECASE)
        matches = []
        for page_num, text in pages_text:
            if pattern.search(text):
                matches.append(page_num)
        
        out.write(f"Found in pages: {matches}\n")
        for page_num in matches:
            out.write(f"\n--- Page {page_num} ---\n")
            text = pages_text[page_num - 1][1]
            out.write(text)
            out.write("\n")

    # Search for the specified articles
    for art in [12, 13, 14, 15, 16, 17, 44, 45, 46, 47, 48, 49, 50, 115, 145, 146, 147, 148, 203, 204, 205]:
        write_article(art)

print("Done! Extracted to", output_path)
