interface IFloor {
  [key: string]: string;
}
interface IShelfName {
  [key: string]: string;
}

const floors: IFloor = {
  지하2층: "B2",
  지하1층: "B1",
  "1층": "1F",
  "3층": "3F",
};
const shelfNames: IShelfName = {
  일반도서1: "normal1",
  일반도서2: "normal2",
};

export const formatFloor = (floor: string) => {
  return floors[floor];
};

export const formatShelfName = (shelfName: string) => {
  return shelfNames[shelfName];
};
