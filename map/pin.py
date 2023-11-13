import xml.etree.ElementTree as ET

def find_rects_by_y(svg_file_path, target_y, output_file_path, start_num):
    # SVG 파일을 파싱합니다.
    tree = ET.parse(svg_file_path)
    root = tree.getroot()

    # y 좌표가 target_y와 동일한 rect 요소를 찾습니다.
    matching_rects = [rect for rect in root.findall(".//{http://www.w3.org/2000/svg}rect") if float(rect.get('y', 0)) == target_y]

    for rect in matching_rects :
        print(rect.get("x"))
        if (rect.get("fill") == "#D9D9D9") : 
            rect.set("fill", "#FF0000")
            start_num -= 1
            tree.write(output_file_path + str(start_num) + ".svg")
            rect.set("fill", "#D9D9D9")

# SVG 파일 경로와 찾을 y 좌표를 전달하여 함수를 호출합니다.
svg_file_path = 'sorted_svg_output.svg'
target_y = 89.1464
output_file_path = "./0/대형예술700/" 
start_num = 21

# 찾은 rect 요소들을 출력합니다.
find_rects_by_y(svg_file_path, target_y, output_file_path, start_num)