import re
import zlib
import sys

def extract_pdf_text(pdf_path):
    with open(pdf_path, 'rb') as f:
        data = f.read()
    
    streams = []
    idx = 0
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
                streams.append(decompressed)
            except Exception as e:
                try:
                    # try with negative wbits in case of raw stream
                    decompressed = zlib.decompress(stream_data, -15)
                    streams.append(decompressed)
                except Exception:
                    pass
        else:
            streams.append(stream_data)
            
        idx = end + 9
        
    all_text = []
    for s in streams:
        in_parens = False
        current = []
        i = 0
        while i < len(s):
            c = s[i]
            if c == 40: # '('
                if not in_parens:
                    in_parens = True
                    current = []
                else:
                    current.append(c)
            elif c == 41: # ')'
                if in_parens:
                    in_parens = False
                    txt = bytes(current).decode('latin-1', errors='ignore')
                    all_text.append(txt)
            elif c == 92: # '\\'
                if in_parens and i + 1 < len(s):
                    next_c = s[i+1]
                    if next_c in [40, 41, 92]:
                        current.append(next_c)
                        i += 1
                    elif next_c >= 48 and next_c <= 55:
                        octal_bytes = s[i+1:i+4]
                        m = re.match(br'^[0-7]{1,3}', octal_bytes)
                        if m:
                            val = int(m.group(0), 8)
                            current.append(val)
                            i += len(m.group(0))
                        else:
                            current.append(92)
                    else:
                        current.append(92)
            else:
                if in_parens:
                    current.append(c)
            i += 1
            
    return "\n".join(all_text)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: extract_pdf.py <pdf_path> <out_path>")
        sys.exit(1)
    text = extract_pdf_text(sys.argv[1])
    with open(sys.argv[2], 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"Extracted {len(text)} chars to {sys.argv[2]}")
