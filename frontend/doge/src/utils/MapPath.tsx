import React from "react";

const importSvg = (floor: string, folder: string, fileName: number) => {
  try {
    const importPath = `/map/${encodeURIComponent(floor)}/${encodeURIComponent(
      folder
    )}/${fileName}.svg`;
    return importPath;
  } catch (error) {
    console.error(`Error importing SVG ${fileName}`, error);
    return null;
  }
};

interface MyComponentProps {
  floor: string;
  shelfname: string;
  shelfnum: number;
}

const MapPath: React.FC<MyComponentProps> = ({
  floor,
  shelfname,
  shelfnum,
}) => {
  const svgPath = importSvg(floor, shelfname, shelfnum);

  return (
    <>
      {svgPath && (
        <img src={svgPath} alt={`SVG for ${floor}/${shelfname}/${shelfnum}`} />
      )}
    </>
  );
};

export default MapPath;
