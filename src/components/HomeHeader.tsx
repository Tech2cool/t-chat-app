import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../utils/Theme';
import {MCIcon} from '../utils/contstant';

const color = theme.DARK;
const font = theme.FONTS;
const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>T-Chat</Text>
      <MCIcon name="dots-vertical" color={color.White} size={25} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.DarkBackGround,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Heading: {
    color: color.White,
    fontFamily: font.OpenSansBold,
    fontSize: 18,
  },
});
