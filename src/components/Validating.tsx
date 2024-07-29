import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import theme from '../utils/Theme';
const color = theme.DARK;
interface validationProps {
  loading: boolean;
}
const Validating: React.FC<validationProps> = ({loading}) => {
  return (
    <View style={loading ? styles.container : styles.containerHide}>
      <ActivityIndicator size={30} color={color.Red} />
    </View>
  );
};

export default Validating;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerHide: {
    display: 'none',
  },
});
