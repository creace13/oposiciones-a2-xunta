import os
import zlib
import re

pdf_path = r"f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\documentos\troncal\galicia\ley-6-1984-valedor-pueblo.pdf"
out_dir = r"f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\tmp\streams"
os.makedirs(out_dir, exist_ok=True)

with open(pdf_path, 'rb') as f:
    data = f.read()

idx = 0
stream_count = 0
while True:
    start = data.find(b'stream', idx)
    if start == -1:
        break
    data_start = start + 6
    if data[data_start:data_start+2] == b'\r\n':
        data_start += 2
    elif data[data_start] == 10:
        data_start += 1
        
    end = data.find(b'endstream', data_start)
    if end == -1:
        break
        
    stream_data = data[data_start:end]
    
    dict_start = data.rfind(b'<<', 0, start)
    dict_end = data.find(b'>>', dict_start, start)
    is_flate = False
    if dict_start != -1 and dict_end != -1:
        dict_text = data[dict_start:dict_end]
        if b'/FlateDecode' in dict_text:
            is_flate = True
            
    if is_flate:
        try:
            decompressed = zlib.decompress(stream_data)
            with open(os.path.join(out_dir, f"stream_{stream_count}.bin"), 'wb') as f_out:
                f_out.write(decompressed)
        except Exception:
            pass
    else:
        with open(os.path.join(out_dir, f"stream_{stream_count}_raw.bin"), 'wb') as f_out:
            f_out.write(stream_data)
            
    stream_count += 1
    idx = end + 9

print(f"Dumped {stream_count} streams.")
