import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import theme from '../../utils/Theme';
import Logo from '../../assets/images/logo.png';
import dotbg from '../../assets/images/dotbg.png';
import FastImage from 'react-native-fast-image';
import Animated, {FadeInDown, FadeInLeft} from 'react-native-reanimated';
import {useUser} from '../../context/usercontext';
import {Toast} from 'toastify-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SplashScreenProps} from '../../utils/types';

const color = theme.DARK;
const Splash: React.FC<SplashScreenProps> = ({navigation}) => {
  const {setUser} = useUser();

  useEffect(() => {
    // console.log('useeffect Splash');
    const handleUserCheck = async () => {
      const userExist = await AsyncStorage.getItem('user');
      if (userExist !== null) {
        const parsedData = JSON.parse(userExist);
        // console.log(parsedData?.chats[0]?.chatId)
        setUser(parsedData);
        setTimeout(() => {
          Toast.success('Authorized', 'top');
          navigation.navigate('HomeStack');
        }, 1000);
      } else {
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1000);
      }
    };
    handleUserCheck();
  }, []);
  return (
    <View style={styles.container}>
      <FastImage
        source={dotbg}
        style={styles.bgImg}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Animated.View entering={FadeInDown}>
        <FastImage
          source={Logo}
          style={styles.logo}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Animated.View>
      <Animated.Text style={styles.text} entering={FadeInLeft.delay(500)}>
        T-Chat Messaging app
      </Animated.Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  bgImg: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    opacity: 0.1,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  text: {
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 600,
    color: color.White,
  },
});
