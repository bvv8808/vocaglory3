export type TWordInDict = {
  id: number;
  rootVoca: string; // 어원
  title: string; // 어원이름?
  word: TWord;
  pushedAt: string; // 추가된 날짜
};

export type TWord = {
  voca: string; // 영단어
  mean: string; // 뜻
  pronounce: string; // 발음기호
};

export type TRoot = {
  id: number;
  title: string;
  rootVoca: string;
  rootMean?: string;
  bgColor: string;
  vocaColor: string;
  changedColor: string;
  meanColor: string;
  changed?: string;
};

export type TSettings = {
  isRandom: boolean;
  notShowWordInDict: boolean;
  // isFirst: number;
};
