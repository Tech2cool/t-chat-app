import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../utils/Theme';
import {generateArray} from '../utils/helperFunctions';

const color = theme.DARK;
const ChatSkeleton = ({length = 10}) => {
  const arr = generateArray(0, length);
  return (
    <View style={styles.container}>
      {arr.map((item, i) => (
        <View key={item} style={i % 2 ? styles.card : styles.cardSelf} />
      ))}
    </View>
  );
};

export default ChatSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 20,
    backgroundColor: color.LighterGray,
    width: 150,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  cardSelf: {
    padding: 20,
    backgroundColor: color.LighterGray,
    width: 150,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
});
