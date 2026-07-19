import os
import sys
import win32com.client

def pdf_to_txt(pdf_path, txt_path):
    print(f"Converting {pdf_path} to {txt_path}...")
    try:
        word = win32com.client.Dispatch("Word.Application")
    except Exception as e:
        print("Failed to dispatch Word:", e)
        return
        
    word.Visible = False
    # Disable all alerts/dialogs
    word.DisplayAlerts = 0 
    
    abs_pdf = os.path.abspath(pdf_path)
    abs_txt = os.path.abspath(txt_path)
    
    try:
        doc = word.Documents.Open(abs_pdf, ConfirmConversions=False, ReadOnly=True)
        doc.SaveAs2(abs_txt, FileFormat=7, Encoding=65001) # UTF-8 (65001)
        doc.Close()
        print("Success!")
    except Exception as e:
        print("Error during conversion:", e)
    finally:
        try:
            word.Quit()
        except Exception:
            pass

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: convert_pdf_no_alerts.py <pdf_path> <txt_path>")
        sys.exit(1)
    pdf_to_txt(sys.argv[1], sys.argv[2])
