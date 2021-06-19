import React, {useState, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomHeader from '~/components/CustomHeader';
// import db from '~/DB';
import {TSettings} from '~/lib/types';

interface prop {
  navigation: any;
  route: any;
}

const screenWidth = Dimensions.get('screen').width;

const getRandomIdx = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start) + start);
};

const ExamScreen = ({navigation, route}: prop) => {
  const [examWords, setExamWords] = useState(new Array());
  const [curExamIdx, setCurExamIdx] = useState(-1);
  const [shownMean, setShownMean] = useState(false);

  useEffect(() => {
    let {words} = route.params;

    // db.getSettings().then((settings: TSettings) => {
    //   if (settings.isRandom) {
    //     let len = words.length;
    //     let randomWords = new Array();

    //     while (len > 0) {
    //       const curIdx = getRandomIdx(0, len);
    //       randomWords.push(words[curIdx]);
    //       words.splice(curIdx, 1);
    //       len -= 1;
    //     }
    //     setExamWords(randomWords);
    //   } else setExamWords(words);
    // });

    setCurExamIdx(0);
  }, [route.params]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={s.wrap}>
        <CustomHeader title="단어 시험" />
        <Text style={s.txtProgress}>
          {curExamIdx + 1} / {examWords.length}
        </Text>
        <TouchableOpacity
          style={s.examTab}
          onPress={() => {
            if (shownMean === false) {
              setShownMean(true);
            } else {
              if (curExamIdx !== -1 && curExamIdx <= examWords.length - 1) {
                if (curExamIdx === examWords.length - 1) {
                  Toast.show('시험이 종료되었습니다. \n얼마나 맞추셨나요?', 1);
                  navigation.goBack();
                } else {
                  setShownMean(false);

                  const nextIdx = curExamIdx + 1;
                  setCurExamIdx(nextIdx);
                }
              }
            }
          }}>
          <Text style={s.txtVoca}>
            {curExamIdx !== -1 && curExamIdx < examWords.length
              ? examWords[curExamIdx].voca
              : ''}
          </Text>
          <Text style={s.txtMean}>
            {curExamIdx !== -1 && curExamIdx < examWords.length && shownMean
              ? examWords[curExamIdx].mean
              : ''}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
  },
  txtProgress: {
    fontSize: 40,
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Bold' : 'sd_gothic_b',
    marginTop: 15,
  },
  examTab: {
    // backgroundColor: 'green',
    // borderWidth: 1,
    width: screenWidth,
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtVoca: {
    fontSize: 60,
    margin: 8,
    marginTop: 50,
    letterSpacing: 0.5,
  },
  txtMean: {
    fontSize: 30,
    marginVertical: 15,
    textAlign: 'center',
    color: '#2E997F',
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Bold' : 'sd_gothic_b',
  },
});

export default ExamScreen;
