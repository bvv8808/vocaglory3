export type TWordInDict = {
  id: number;
  rootVoca: string; // 어원
  voca: string; // 영단어
  mean: string; // 뜻
  title: string; // 어원이름?
  pushedAt: string; // 추가된 날짜
};

export type TSettings = {
  isRandom: number;
  notShowWordInDict: number;
  isFirst: number;
};
