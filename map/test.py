import xml.etree.ElementTree as ET
import os

def x_y(svg_file_path):
    # SVG 파일을 파싱합니다.
    tree = ET.parse(svg_file_path)
    root = tree.getroot()
    y = []
    for rect in root:
        y.append(rect.get("y"))
    print(set(y))

x_y("sorted_svg_output.svg")