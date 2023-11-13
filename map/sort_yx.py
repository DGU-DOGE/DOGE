import xml.etree.ElementTree as ET

def sort_rects_by_yx(svg_file_path, output_file_path):
    # SVG 파일을 파싱합니다.
    tree = ET.parse(svg_file_path)
    root = tree.getroot()

    # x 좌표를 기준으로 rect 요소를 정렬합니다.
    sorted_rects = sorted(root.findall(".//{http://www.w3.org/2000/svg}rect"), key=lambda rect: (float(rect.get('y', 0)), float(rect.get('x', 0))))


    # 정렬된 rect 요소를 SVG에 추가합니다.
    for rect in sorted_rects:
        root.remove(rect)
    for rect in sorted_rects:
        root.append(rect)

    # 변경된 내용을 새로운 파일에 저장합니다.
    tree.write(output_file_path)

# SVG 파일 경로와 새로운 파일 경로를 전달하여 함수를 호출합니다.
sort_rects_by_yx('Frame1.svg', 'sorted_svg_output.svg')
