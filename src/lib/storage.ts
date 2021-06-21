import AsyncStorage from '@react-native-community/async-storage';
import {TWordInDict} from './types';

export const getVocasInDict = async (): Promise<string[]> => {
  const strDict = await AsyncStorage.getItem('dict');
  if (!strDict) return [];

  const dict: TWordInDict[] = JSON.parse(strDict);
  return dict.map(d => d.word.voca);
};

export default AsyncStorage;
