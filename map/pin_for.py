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
bookshelf_name = "정기간행물"
name_int = 24

check_x = 500
low_check_x = 300

target_y = [101.401,104.465,113.656,116.72,125.911,128.975,138.166,141.23,150.421,153.485,162.676,165.74,174.931,177.995,187.186,190.25,199.441,202.504,211.696,214.759,223.951,227.014,236.205,239.269,248.46,251.524,260.715,263.779,272.97,276.034,285.225,288.289,297.48,300.544,309.735,312.799,321.99,325.054,334.245,337.309,346.5,349.564,358.755,361.819,371.01,374.073,383.265,386.328,395.52,398.583,407.775,410.838]
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
    output_file_path = "./" + str(floor) +"/E/" + bookshelf_name + str(name_int) + "/" 
    createDirectory(output_file_path)
    pin_down(svg_file_path,down_target_y[i],output_file_path, down_start_num-1, check_x, low_check_x)
    pin_up(svg_file_path, up_target_y[i], output_file_path, up_start_num+1, check_x, low_check_x) 

    name_int -= 1