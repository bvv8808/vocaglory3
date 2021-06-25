import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import CustomHeader from '~/components/CustomHeader';
import axios from 'axios';
import {TSettings, TWord, TWordInDict} from '~/lib/types';
import AsyncStorage from '@react-native-community/async-storage';
import {getVocasInDict} from '~/lib/storage';
// import db from '~/DB';

interface prop {
  navigation: any;
  route: any;
}

const StudyScreen = ({navigation, route}: prop) => {
  const [words, setWords] = useState(new Array());
  const [curWord, setCurWord] = useState<TWord>({
    voca: '',
    pronounce: '',
    mean: '',
  });
  const [curIdx, setCurIdx] = useState(-1);
  const [shownMean, setShownMean] = useState(false);
  // const [notShowInDict, setNotShowInDict] = useState(false);

  useEffect(() => {
    let notShowInDict = false;

    AsyncStorage.getItem('settings')
      .then(settings => {
        if (settings) {
          const s: TSettings = JSON.parse(settings);
          notShowInDict = s.notShowWordInDict;
        }
        return AsyncStorage.getItem(route.params.title);
      })
      .then(cached => {
        if (cached) {
          return {
            data: JSON.parse(cached),
          };
        } else
          return axios.get(
            `https://vokaglorywords.firebaseio.com/${route.params.title}.json`,
          );
      })

      .then(async (words: any) => {
        const existedVoca = await getVocasInDict();
        return notShowInDict
          ? words.data.filter((word: any) => !existedVoca.includes(word.voca))
          : words.data;
      })
      .then((words: any) => {
        const sortedWords = words.sort((a: any, b: any) => {
          if (a.voca < b.voca) return -1;
          else return 1;
        });
        setWords(sortedWords);
        setCurWord(sortedWords[0]);
        setCurIdx(0);
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={s.wrap}>
        <CustomHeader title={`단어 공부 - ${route.params.rootVoca}`} />
        <TouchableOpacity
          style={s.wordContainer}
          onPressOut={() => {
            if (shownMean === false) {
              setShownMean(true);
            } else {
              if (curIdx !== -1 && curIdx <= words.length - 1) {
                if (curIdx === words.length - 1) {
                  Platform.OS === 'android'
                    ? ToastAndroid.show(
                        '해당 어원의 단어 공부가 끝났습니다',
                        ToastAndroid.SHORT,
                      )
                    : Toast.show(
                        '해당 어원의 단어 공부가 끝났습니다',
                        Toast.SHORT,
                      );
                  navigation.goBack();
                } else {
                  setShownMean(false);

                  const nextIdx = curIdx + 1;
                  setCurWord(words[nextIdx]);
                  setCurIdx(nextIdx);
                }
              }
            }
          }}>
          <Text style={s.txtVoca}>
            {curIdx < words.length ? curWord.voca : ''}
          </Text>
          <Text style={s.txtPronounce}>
            {curIdx < words.length ? curWord.pronounce : ''}
          </Text>
          <Text style={s.txtMean}>
            {curIdx < words.length && shownMean ? curWord.mean : ''}
          </Text>
        </TouchableOpacity>

        <View style={s.btnContainer}>
          <TouchableOpacity
            style={s.btnAdd}
            onPressOut={() => {
              // # 단어장에 추가
              AsyncStorage.getItem('dict')
                .then(dict => {
                  if (dict) {
                    const d: TWordInDict[] = JSON.parse(dict);
                    return [
                      !!d.find(w => w.word.voca === curWord.voca),
                      d || [],
                    ];
                  }
                  return [false, []];
                })
                .then((already: any) => {
                  if (already[0]) {
                    Toast.show('이미 단어장에 추가된 단어입니다', 0.7);
                    return;
                  }
                  const now = new Date();

                  let d = already[1];
                  d.push({
                    id: d.length ? d[d.length - 1].id + 1 : 0,
                    pushedAt: `${now.getFullYear()}.${(now.getMonth() + 1)
                      .toString()
                      .padStart(2, '0')}.${now
                      .getDate()
                      .toString()
                      .padStart(2, '0')}`,
                    word: curWord,
                    title: route.params.title,
                    rootVoca: route.params.rootVoca,
                  });

                  return AsyncStorage.setItem('dict', JSON.stringify(d));
                })
                .then(() => {
                  Toast.show('단어장에 추가되었습니다', 0.7);
                })
                .catch(e => {
                  Toast.show('알 수 없는 오류가 발생했습니다', 1);
                  console.error('Error (Add to Dict)', e);
                });
              // db.isInDict(curWord.voca)
              //   .then((isExist: any) => {
              //     if (isExist) {
              //       Platform.OS === 'android'
              //         ? ToastAndroid.show(
              //             '이미 단어장에 존재합니다',
              //             ToastAndroid.SHORT,
              //           )
              //         : Toast.show('이미 단어장에 존재합니다', Toast.SHORT);
              //       return null;
              //     } else {
              //       return db.saveToDict(
              //         route.params.title,
              //         curWord.voca,
              //         curWord.mean,
              //         route.params.rootVoca,
              //       );
              //     }
              //   })
              //   .then((res: any) => {
              //     if (res !== null) {
              //       console.log('## saveToDict RESPONSE ## ', res);
              //       Platform.OS === 'android'
              //         ? ToastAndroid.show(
              //             '단어장에 추가되었습니다',
              //             ToastAndroid.SHORT,
              //           )
              //         : Toast.show('단어장에 추가되었습니다', Toast.SHORT);
              //     }
              //   });
            }}>
            <Text style={s.txtAdd}>단어장에 추가</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  wordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 8,
  },
  txtVoca: {
    fontSize: 45,
    margin: 8,
    marginTop: 50,
  },
  txtPronounce: {
    fontFamily: Platform.OS === 'ios' ? 'WinDicFont' : 'wdpron',
    fontSize: 23,
    margin: 8,
  },
  txtMean: {
    fontSize: 30,
    marginVertical: 8,
    textAlign: 'center',
  },
  btnContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btnAdd: {
    width: '55%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 5,
    backgroundColor: '#E36473',
  },
  txtAdd: {
    fontSize: 26,
    fontFamily:
      Platform.OS === 'ios' ? 'AppleSDGothicNeo-Medium' : 'sd_gothic_m',
    alignSelf: 'center',
    color: '#FBFBFB',
  },
});

export default StudyScreen;
