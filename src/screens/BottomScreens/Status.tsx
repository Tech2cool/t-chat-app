import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../../utils/Theme';
import {StatusScreenProps} from '../../utils/types';

const color = theme.DARK;
const font = theme.FONTS;

const Status: React.FC<StatusScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Status</Text>
      <Text style={styles.text}>Nothing to see here</Text>
      <Text style={styles.text}>Upcoming sooon</Text>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.DarkBackGround,
    flex: 1,
    padding: 10,
  },
  text: {
    color: color.White,
    fontFamily: font.OpenSansBold,
    textAlign: 'center',
  },
});
