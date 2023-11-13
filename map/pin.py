import xml.etree.ElementTree as ET
import os

def pin_up(svg_file_path, target_y, output_file_path, start_num, check_x, low_check_x):
    # SVG 파일을 파싱합니다.
    tree = ET.parse(svg_file_path)
    root = tree.getroot()

    # y 좌표가 target_y와 동일한 rect 요소를 찾습니다.
    matching_rects = [rect for rect in root.findall(".//{http://www.w3.org/2000/svg}rect") if (float(rect.get('y', 0)) == target_y) and(float(rect.get('x',0)) >= low_check_x)]
    for rect in matching_rects :
        if (rect.get("fill") == "#D9D9D9") : 
            if (float(rect.get("x")) >= check_x) : break
            pin_x = float(rect.get("x")) - 3.0
            pin_y = float(rect.get("y")) - 16
            rect.set("fill", "#FF0000")
            start_num -= 1
            for img in root.findall(".//{http://www.w3.org/2000/svg}rect") :
                if (img.get("fill") == "url(#pattern1)") :
                    img.set("x", str(pin_x))
                    img.set("y", str(pin_y))
                    root.remove(img)
                    root.append(img)
            tree.write(output_file_path + str(start_num) + ".svg")
            print(start_num)
            rect.set("fill", "#D9D9D9")

def pin_down(svg_file_path, target_y, output_file_path, start_num, check_x, low_check_x):
    # SVG 파일을 파싱합니다.
    tree = ET.parse(svg_file_path)
    root = tree.getroot()

    # y 좌표가 target_y와 동일한 rect 요소를 찾습니다.
    matching_rects = [rect for rect in root.findall(".//{http://www.w3.org/2000/svg}rect") if (float(rect.get('y', 0)) == target_y)and(float(rect.get('x',0)) >= low_check_x)]
    for rect in matching_rects :
        if (rect.get("fill") == "#D9D9D9") : 
            if (float(rect.get("x")) >= check_x) : break
            pin_x = float(rect.get("x")) - 3.0
            pin_y = float(rect.get("y")) - 16
            rect.set("fill", "#FF0000")
            start_num += 1
            for img in root.findall(".//{http://www.w3.org/2000/svg}rect") :
                if (img.get("fill") == "url(#pattern1)") :
                    img.set("x", str(pin_x))
                    img.set("y", str(pin_y))
                    root.remove(img)
                    root.append(img)
            tree.write(output_file_path + str(start_num) + ".svg")
            print(start_num)
            rect.set("fill", "#D9D9D9")
    global up_start_num 
    up_start_num = start_num * 2 + 1

# SVG 파일 경로와 찾을 y 좌표를 전달하여 함수를 호출합니다.
svg_file_path = 'sorted_svg_output.svg'
floor = 0
bookshelf_name = "법학정간물2"

check_x = 500
low_check_x = 300

up_target_y = 420.029

down_target_y = 423.093
down_start_num = 0

output_file_path = "./" + str(floor) +"/" + bookshelf_name + "/" 


def createDirectory(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print("Error: Failed to create the directory.")

# 찾은 rect 요소들을 출력합니다.
createDirectory(output_file_path)
pin_down(svg_file_path, down_target_y, output_file_path, down_start_num-1, check_x, low_check_x)

pin_up(svg_file_path, up_target_y, output_file_path, up_start_num+1, check_x, low_check_x) 