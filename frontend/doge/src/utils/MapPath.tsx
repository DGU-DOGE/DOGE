import React from 'react';

const importSvg = (floor: number, folder: string, fileName: number) => {
  try {
    const importPath = `/map/${floor}/${folder}/${fileName}.svg`;
    return importPath;
  } catch (error) {
    console.error(`Error importing SVG ${fileName}`, error);
    return null;  
  }
};

interface MyComponentProps {
  floor: number;
  shelfname: string;
  shelfnum: number;
}

const MapPath: React.FC<MyComponentProps> = ({ floor, shelfname, shelfnum }) => {
  const svgPath = importSvg(floor, shelfname, shelfnum);

  return (
    <>
      {svgPath && <img src={svgPath} alt={`SVG for ${floor}/${shelfname}/${shelfnum}`} />}
    </>
  );
};

export default MapPath;