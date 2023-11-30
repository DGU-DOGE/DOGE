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

  //왼쪽이 백에서 받는거, 오른쪽은 public/map/폴더명
  //B2
  "대형예술700": "largeArt700",
  "대형예술700좌측아래": "largeArt700LeftBottom",
  "법학단행본1": "lawSingle1",
  "법학단행본2": "lawSingle2",
  "법학단행본3": "lawSingle3",
  "법학단행본4": "lawSingle4",
  "법학단행본5": "lawSingle5",
  "법학단행본6": "lawSingle6",
  "법학단행본7": "lawSingle7",
  "법학단행본8": "lawSingle8",
  "법학단행본9": "lawSingle9",
  "법학단행본10": "lawSingle10",
  "법학단행본11": "lawSingle11",
  "법학단행본12": "lawSingle12",
  "법학단행본13": "lawSingle13",
  "법학단행본14": "lawSingle14",
  "법학단행본15": "lawSingle15",
  "법학단행본16": "lawSingle16",
  "법학단행본17": "lawSingle17",
  "법학단행본18": "lawSingle18",
  "법학단행본19": "lawSingle19",
  "법학단행본20": "lawSingle20",
  "법학단행본21": "lawSingle21",
  "법학단행본22": "lawSingle22",
  "법학단행본23": "lawSingle23",
  "법학단행본24": "lawSingle24",
  "법학단행본25": "lawSingle25",
  "법학단행본26": "lawSingle26",
  "법학단행본27": "lawSingle27",
  "법학단행본28": "lawSingle28",
  "법학단행본29": "lawSingle29",
  "법학단행본30": "lawSingle30",
  "법학정간물1": "lawJournals1",
  "법학정간물2": "lawJournals2",
  "법학정간물3": "lawJournals3",
  "법학정간물4": "lawJournals4",
  "법학정간물5": "lawJournals5",
  "법학정간물6": "lawJournals6",
  "일반도서1" : "normal1",
  "일반도서2" : "normal2",
  "일반도서3" : "normal3",
  "일반도서4" : "normal4",
  "일반도서5" : "normal5",
  "일반도서6" : "normal6",
  "일반도서7" : "normal7",
  "일반도서8" : "normal8",
  "일반도서9" : "normal9",
  "일반도서10" : "normal10",
  "일반도서11" : "normal11",
  "일반도서12" : "normal12",
  "일반도서13" : "normal13",
  "일반도서14" : "normal14",
  "일반도서15" : "normal15",
  "일반도서16" : "normal16",
  "일반도서17" : "normal17",
  "일반도서18" : "normal18",
  "일반도서19" : "normal19",
  "일반도서20" : "normal20",
  "일반도서21" : "normal21",
  "일반도서22" : "normal22",
  "일반도서23" : "normal23",
  "일반도서24" : "normal24",
  "일반도서25" : "normal25",
  "일반도서26" : "normal26",
  "일반도서27" : "normal27",
  "일반도서27C" : "normal27C",
  "일반도서28" : "normal28",
  "일반도서29" : "normal29",
  "일반도서30" : "normal30",
  "일반도서31" : "normal31",
  "일반도서32" : "normal32",
  "일반도서33" : "normal33",
  "일반도서34" : "normal34",
  "일반도서35" : "normal35",
  "일반도서36" : "normal36",
  "일반도서37" : "normal37",
  "일반도서38" : "normal38",
  "일반도서39" : "normal39",
  "일반도서40" : "normal40",
  "일반도서41" : "normal41",
  "일반도서42" : "normal42",
  "일반도서43" : "normal43",
  "일반도서44" : "normal44",
  "일반도서45" : "normal45",
  "일반도서46" : "normal46",
  "일반도서47" : "normal47",
  "일반도서48" : "normal48",
  "일반도서49" : "normal49",
  "일반도서50" : "normal50",
  "일반도서51" : "normal51",
  "일반도서52" : "normal52",
  "일반도서53" : "normal53",
  "일반도서54" : "normal54",
  "일반도서55" : "normal55",
  "정기간행물1" : "periodicals1",
  "정기간행물2" : "periodicals2",
  "정기간행물3" : "periodicals3",
  "정기간행물4" : "periodicals4",
  "정기간행물5" : "periodicals5",
  "정기간행물6" : "periodicals6",
  "정기간행물7" : "periodicals7",
  "정기간행물8" : "periodicals8",
  "정기간행물9" : "periodicals9",
  "정기간행물10" : "periodicals10",
  "정기간행물11" : "periodicals11",
  "정기간행물12" : "periodicals12",
  "정기간행물13" : "periodicals13",
  "정기간행물14" : "periodicals14",
  "정기간행물15" : "periodicals15",
  "정기간행물16" : "periodicals16",
  "정기간행물17" : "periodicals17",
  "정기간행물18" : "periodicals18",
  "정기간행물19" : "periodicals19",
  "정기간행물20" : "periodicals20",
  "정기간행물21" : "periodicals21",
  "정기간행물22" : "periodicals22",
  "정기간행물23" : "periodicals23",
  "정기간행물24" : "periodicals24",
  "정기간행물25" : "periodicals25",
  "정기간행물26" : "periodicals26",
  "정기간행물27" : "periodicals27",
  "정기간행물28" : "periodicals28",
  "정기간행물29" : "periodicals29",
  "정기간행물30" : "periodicals30",
  "정기간행물31" : "periodicals31",
  "정기간행물32" : "periodicals32",
  "정기간행물33" : "periodicals33",
  "정기간행물34" : "periodicals34",
  "정기간행물35" : "periodicals35",
  "정기간행물36" : "periodicals36",
  "정기간행물37" : "periodicals37",
  "정기간행물38" : "periodicals38",
  "정기간행물39" : "periodicals39",
  "정기간행물40" : "periodicals40",
  "참고도서" : "referenceBooks",
  "참고도서C" : "referenceBooksC",

  //B1
  "법학참고도서1":"lawReference1",
  "법학참고도서2":"lawReference2",
  "법학참고도서3":"lawReference3",
  "법학참고도서4":"lawReference4",
  "법학참고도서5":"lawReference5",
  "법학참고도서6":"lawReference6",
  "일반도서56":"normal56",
  "일반도서57":"normal57",
  "일반도서58":"normal58",
  "일반도서59":"normal59",
  "일반도서60":"normal60",
  "일반도서61":"normal61",
  "일반도서62":"normal62",
  "일반도서63":"normal63",
  "일반도서64":"normal64",
  "일반도서65":"normal65",
  "일반도서66":"normal66",
  "일반도서67":"normal67",
  "일반도서68":"normal68",
  "일반도서69":"normal69",
  "일반도서70":"normal70",
  "일반도서71":"normal71",
  "일반도서72":"normal72",
  "일반도서73":"normal73",
  "일반도서74":"normal74",

  //1F
  "1층이름없는책장0":"1stFloorNoNameShelf0",
  "1층이름없는책장1":"1stFloorNoNameShelf1",
  "1층이름없는책장10":"1stFloorNoNameShelf10",
  "1층이름없는책장2":"1stFloorNoNameShelf2",
  "1층이름없는책장3":"1stFloorNoNameShelf3",
  "1층이름없는책장4":"1stFloorNoNameShelf4",
  "1층이름없는책장5":"1stFloorNoNameShelf5",
  "1층이름없는책장6":"1stFloorNoNameShelf6",
  "1층이름없는책장7":"1stFloorNoNameShelf7",
  "1층이름없는책장8":"1stFloorNoNameShelf8",
  "1층이름없는책장9":"1stFloorNoNameShelf9",
  "기타종교1":"otherReligion1",
  "대장경1":"greatScripture1",
  "대장경2":"greatScripture2",
  "대장경3":"greatScripture3",
  "대장경4":"greatScripture4",
  "봄산문고1":"springMountainBookstore1",
  "봄산문고2":"springMountainBookstore2",
  "봄산문고3":"springMountainBookstore3",
  "봄산문고4":"springMountainBookstore4",
  "봄산문고5":"springMountainBookstore5",
  "봄산문고6":"springMountainBookstore6",
  "불교일반도서1":"buddhismGeneralBooks1",
  "불교일반도서2":"buddhismGeneralBooks2",
  "불교일반도서3":"buddhismGeneralBooks3",
  "불교일반도서4":"buddhismGeneralBooks4",
  "불교일반도서5":"buddhismGeneralBooks5",
  "불교일반도서6":"buddhismGeneralBooks6",
  "불교일반도서7":"buddhismGeneralBooks7",
  "불교정간물1,대장경5":"buddhismPeriodicals1_GreatScripture5",
  "불교정간물2":"buddhismPeriodicals2",
  "불교정간물3":"buddhismPeriodicals3",
  "불교정간물4":"buddhismPeriodicals4",
  "불교정간물5":"buddhismPeriodicals5",
  "불교정간물6":"buddhismPeriodicals6",
  "불교정간물7":"buddhismPeriodicals7",
  "불교정간물8":"buddhismPeriodicals8",
  "불교참고도서1":"buddhismReferenceBooks1",
  "불교참고도서2":"buddhismReferenceBooks2",
  "예술체육일반도서1":"artSportsGeneralBooks1",
  "예술체육일반도서2":"artSportsGeneralBooks2",
  "예술체육일반도서3":"artSportsGeneralBooks3",
  "예술체육일반도서4":"artSportsGeneralBooks4",
  "철학일반도서1":"philosophyGeneralBooks1",
  "철학일반도서2":"philosophyGeneralBooks2",
  "철학일반도서3":"philosophyGeneralBooks3",
  "철학일반도서4":"philosophyGeneralBooks4",
  "철학일반도서5":"philosophyGeneralBooks5",
  "학위논문1":"thesis1",
  "학위논문2":"thesis2",

  //3F - 전부 normal이라서 겹침

};

export const formatFloor = (floor: string) => {
  return floors[floor];
  
};
export const formatShelfName = (shelfName: string) => {
  return shelfNames[shelfName];
};
