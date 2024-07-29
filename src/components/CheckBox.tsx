import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../utils/Theme';
import {MCIcon} from '../utils/contstant';
const color = theme.DARK;
interface checkBoxProps {
  onSelect: (item: string) => void;
  selected: string | null | undefined;
  list: string[];
  containerStyle?: ViewStyle;
  checkBoxBtnStyle?: ViewStyle;
  checkBoxTextStyle?: TextStyle;
}
const CheckBox = ({
  onSelect,
  selected,
  list = [],
  containerStyle,
  checkBoxBtnStyle,
  checkBoxTextStyle,
}: checkBoxProps) => {
  return (
    <View style={[styles.checkBoxHolder, {...containerStyle}]}>
      {list?.map(item => (
        <TouchableOpacity
          key={item}
          style={[styles.checkBox, {...checkBoxBtnStyle}]}
          onPress={() => onSelect(item)}>
          <MCIcon
            name={
              selected === item
                ? 'check-circle'
                : 'checkbox-blank-circle-outline'
            }
            size={35}
            color={selected === item ? color.AccentBlue : color.White}
          />
          <Text style={[styles.checkBoxText, {...checkBoxTextStyle}]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkBoxHolder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  checkBoxText: {
    fontSize: 16,
    color: color.White,
  },
});
