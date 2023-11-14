import xml.etree.ElementTree as ET

def sort_rects_by_yx(svg_file_path, output_file_path):
    # SVG 파일을 파싱합니다.
    tree = ET.parse(svg_file_path)
    root = tree.getroot()

    # y,x 좌표를 기준으로 rect 요소를 정렬합니다.
    sorted_rects = sorted(root.findall(".//{http://www.w3.org/2000/svg}rect"), key=lambda rect: (float(rect.get('y', 0)), float(rect.get('x', 0))))
    # 정렬된 rect 요소를 SVG에 추가합니다.
    temp = root.findall(".//{http://www.w3.org/2000/svg}path")
    # pin_x = []
    # pin_y = []
    
    for rect in sorted_rects:
        root.remove(rect)
    for path in temp:
        root.remove(path)

    for rect in sorted_rects:
        root.append(rect)
        # pin_x.append(rect.get("x"))
        # pin_y.append(rect.get("y"))
    for path in temp:
        root.append(path)

    # 변경된 내용을 새로운 파일에 저장합니다.
    tree.write(output_file_path)
    # print(set(pin_x))
    # print(set(pin_y))

# SVG 파일 경로와 새로운 파일 경로를 전달하여 함수를 호출합니다.
sort_rects_by_yx('B1_map.svg', 'sorted_svg_output.svg')
