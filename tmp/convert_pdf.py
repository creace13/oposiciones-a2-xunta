import os
import sys
import win32com.client

def pdf_to_txt(pdf_path, txt_path):
    print(f"Converting {pdf_path} to {txt_path}...")
    word = win32com.client.Dispatch("Word.Application")
    word.Visible = False
    
    # Absolute paths are required for Word COM
    abs_pdf = os.path.abspath(pdf_path)
    abs_txt = os.path.abspath(txt_path)
    
    try:
        # ConfirmConversions=False avoids prompt
        doc = word.Documents.Open(abs_pdf, ConfirmConversions=False, ReadOnly=True)
        # 2 corresponds to wdFormatText (plain text)
        # 7 corresponds to wdFormatUnicodeText (Unicode text)
        doc.SaveAs2(abs_txt, FileFormat=7, Encoding=65001) # UTF-8 (65001)
        doc.Close()
        print("Success!")
    except Exception as e:
        print("Error during conversion:", e)
    finally:
        word.Quit()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: convert_pdf.py <pdf_path> <txt_path>")
        sys.exit(1)
    pdf_to_txt(sys.argv[1], sys.argv[2])
