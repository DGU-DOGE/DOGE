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
floor = 1
bookshelf_name = "법학참고도서"
name_int = 6


low_check_x = 350
check_x = 380

target_y = [78,81.0638,90,93.0638,102,105.064,114,117.064,126,129.064,138,141.064,150,153.064,162,165.064,174,177.064,186,189.064,198,201.064,210,213.064,222,225.064,234,237.064,246,249.064,258,261.064,270,273.064,282,285.064,294,297.064,306,309.064,318,321.064,330,333.064,342,345.064,354,357.064,366,369.064,378,381.064,390,393.064,402,405.064]
up_target_y = []
down_target_y = []
i = 0
for y in target_y :
    if (i % 2 == 0) :
        up_target_y.append(y)
        i += 1
    else :
        down_target_y.append(y)
        i += 1
down_start_num = 0

def createDirectory(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print("Error: Failed to create the directory.")

# 찾은 rect 요소들을 출력합니다.
for i in range (0, len(up_target_y)) :
    output_file_path = "./" + str(floor) + "/" + bookshelf_name + str(name_int) + "/" 
    createDirectory(output_file_path)
    pin_down(svg_file_path,down_target_y[i],output_file_path, down_start_num-1, check_x, low_check_x)
    pin_up(svg_file_path, up_target_y[i], output_file_path, up_start_num+1, check_x, low_check_x) 

    name_int -= 1