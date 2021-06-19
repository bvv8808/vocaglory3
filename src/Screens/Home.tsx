/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {iconMain} from '~/assets/Images';

const screenHeight = Dimensions.get('screen').height;

interface prop {
  navigation: any;
}

const HomeScreen = ({navigation}: prop) => {
  return (
    <View style={s.wrap}>
      <View style={s.header}>
        <Image source={iconMain} style={s.logo} />
        <Text style={s.title}>VocaGlory</Text>
      </View>
      <View style={s.btnContainer}>
        <TouchableOpacity
          style={{...s.btnBox, backgroundColor: '#2E997F'}}
          onPressOut={() => navigation.push('StudyHome')}>
          <Text style={{...s.btnText, color: '#FBFBFB'}}>단어 공부</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...s.btnBox, backgroundColor: '#E36473'}}
          onPressOut={() => navigation.push('MyDict')}>
          <Text style={{...s.btnText, color: '#FBFBFB'}}>나의 단어장</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...s.btnBox, backgroundColor: '#7D6E69'}}
          onPressOut={() => navigation.push('Settings')}>
          <Text style={{...s.btnText, color: '#FBFBFB'}}>설정</Text>
        </TouchableOpacity>
      </View>
      <View style={s.adContainer}></View>
    </View>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FBFBFB',
    // alignItems: 'center',
  },
  header: {
    width: '100%',
    height: screenHeight * 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: '100%',
    height: screenHeight * 0.55,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  adContainer: {
    width: '100%',
    height: screenHeight * 0.15,
    justifyContent: 'flex-end',
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Bold' : 'sd_gothic_b',
    fontSize: 50,
    color: '#444444',
  },
  btnBox: {
    width: '55%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 5,
  },
  btnText: {
    fontSize: 26,
    fontFamily:
      Platform.OS === 'ios' ? 'AppleSDGothicNeo-Medium' : 'sd_gothic_m',

    alignSelf: 'center',
  },
});

export default HomeScreen;
