import React, {useState, useEffect} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
// import db from '~/DB';
import CustomHeader from '~/components/CustomHeader';

import {TWordInDict} from '~/lib/types';

const screenWidth = Dimensions.get('screen').width;

interface prop {
  navigation: any;
  route: any;
}

interface AccordianProp {
  curKey: string;
  curWords: any;
  goExam: any;
}

const Accordian = ({curKey, curWords, goExam}: AccordianProp) => {
  const [opened, setOpened] = useState(false);
  return (
    <View style={s.accordian}>
      <TouchableOpacity
        style={{...s.accordianHeader}}
        onPressOut={() => {
          setOpened(!opened);
        }}>
        <View style={{width: 50}}></View>
        <Text style={s.headerKey}>{curKey}</Text>
        <TouchableOpacity style={s.btnExam} onPressOut={() => goExam()}>
          <Entypo name="pencil" size={30} color="#E36473" />
        </TouchableOpacity>
      </TouchableOpacity>
      <ScrollView style={[s.accordianBody, !opened && {height: 0}]}>
        {curWords.map((word: any) => {
          return (
            <View key={word.voca} style={s.bodyContainer}>
              <Text style={s.bodyVoca}>{word.voca}</Text>
              <Text style={s.bodyMean}>{word.mean}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const MyDictScreen = ({navigation}: prop) => {
  const [showByDate, setShowByDate] = useState(true);
  const [dateDict, setDateDict] = useState<any>({});
  const [rootDict, setRootDict] = useState<any>({});
  const [dateKeys, setDateKeys] = useState<string[]>([]);
  const [rootKeys, setRootKeys] = useState<string[]>([]);

  useEffect(() => {
    // db.getDict().then(dict => {
    //   let initialDateDict: any = new Object();
    //   let initialRootDict: any = new Object();
    //   dict.forEach(word => {
    //     if (initialDateDict.hasOwnProperty(word.pushedAt)) {
    //       initialDateDict[word.pushedAt].push(word);
    //     } else {
    //       initialDateDict[word.pushedAt] = new Array();
    //       initialDateDict[word.pushedAt].push(word);
    //     }
    //     if (initialRootDict.hasOwnProperty(word.rootVoca)) {
    //       initialRootDict[word.rootVoca].push(word);
    //     } else {
    //       initialRootDict[word.rootVoca] = new Array();
    //       initialRootDict[word.rootVoca].push(word);
    //     }
    //   });
    //   setDateDict(initialDateDict);
    //   setRootDict(initialRootDict);
    //   setDateKeys(initialRootDict.keys().sort());
    //   setRootKeys(initialRootDict.keys().sort());
    // });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={s.wrap}>
        <CustomHeader title="나의 단어장" />
        <View style={s.selectTab}>
          <TouchableOpacity
            style={s.radioContainer}
            onPressOut={() => {
              setShowByDate(true);
            }}>
            <MaterialIcons
              name={
                showByDate ? 'radio-button-checked' : 'radio-button-unchecked'
              }
              size={25}
              color="#E33174"
            />
            <Text style={s.txtRadio}>날짜별</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.radioContainer}
            onPressOut={() => {
              setShowByDate(false);
            }}>
            <MaterialIcons
              name={
                showByDate ? 'radio-button-unchecked' : 'radio-button-checked'
              }
              size={25}
              color="#E33174"
            />
            <Text style={s.txtRadio}>어원별</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={showByDate ? dateKeys : rootKeys}
          keyExtractor={key => key}
          renderItem={item => {
            const k: string = item.item;
            const curWords: TWordInDict[] = showByDate
              ? dateDict[k]
              : rootDict[k];
            return (
              <Accordian
                curWords={curWords}
                curKey={k}
                goExam={() =>
                  navigation.push('Exam', {
                    words: curWords.map(word => ({
                      voca: word.word.voca,
                      mean: word.word.mean,
                    })),
                  })
                }
              />
            );
          }}
        />
        {/* <ScrollView>
          {showByDate
            ? dateKeys.map((key: string) => {
                const curWords: TWordInDict[] = dateDict[key];
                return (
                  <Accordian
                    curWords={curWords}
                    curKey={key}
                    key={key}
                    goExam={() =>
                      navigation.push('Exam', {
                        words: curWords.map((word) => ({
                          voca: word.voca,
                          mean: word.mean,
                        })),
                      })
                    }
                  />
                );
              })
            : rootKeys.map((key: string) => {
                const curWords: TWordInDict[] = rootDict[key];
                return (
                  <Accordian
                    curWords={curWords}
                    curKey={key}
                    key={key}
                    goExam={() =>
                      navigation.push('Exam', {
                        words: curWords.map((word) => ({
                          voca: word.voca,
                          mean: word.mean,
                        })),
                      })
                    }
                  />
                );
              })}
        </ScrollView> */}
        <View style={s.adContainer}></View>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  selectTab: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtRadio: {
    fontSize: 23,
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Bold' : 'sd_gothic_b',
    color: '#333333',
    letterSpacing: 1,
    paddingLeft: 5,
  },
  accordian: {
    width: '100%',
  },
  accordianHeader: {
    width: '100%',
    height: 55,
    borderBottomWidth: 0.5,
    borderColor: '#CDCDCD',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  accordianBody: {
    backgroundColor: '#ECDED5',
  },
  headerKey: {
    fontFamily:
      Platform.OS === 'ios' ? 'AppleSDGothicNeo-Medium' : 'sd_gothic_m',
    fontSize: 25,
    color: 'black',
  },
  bodyContainer: {
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  bodyVoca: {
    fontSize: 25,
    color: 'black',
    paddingLeft: 10,
    letterSpacing: 0.5,
  },
  bodyMean: {
    fontSize: 15,
    color: '#222222',
    paddingLeft: 10,
  },
  btnExam: {
    width: 35,
    height: 35,
    marginRight: 15,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
});

export default MyDictScreen;
