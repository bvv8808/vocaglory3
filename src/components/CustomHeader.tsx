import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();
interface prop {
  title: string;
}

const CustomHeader = ({title}: prop) => {
  const navigation = useNavigation();
  return (
    <View style={s.wrap}>
      <TouchableOpacity
        style={s.iconBack}
        onPressOut={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={25} />
      </TouchableOpacity>

      <Text style={s.title}>{title}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBFBFB',
  },
  iconBack: {
    left: '2%',
    position: 'absolute',
  },
  title: {
    fontSize: 25,
    color: '#333333',
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Bold' : 'sd_gothic_b',
  },
});

export default CustomHeader;
