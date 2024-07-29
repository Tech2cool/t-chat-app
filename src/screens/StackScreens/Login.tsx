import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import theme from '../../utils/Theme';
import FastImage from 'react-native-fast-image';
import Logo from '../../assets/images/logo.png';
import {F6Icon} from '../../utils/contstant';
import {TextInput} from 'react-native';
import useLogin from '../../hooks/useLogin';
import Validating from '../../components/Validating';
import {LoginScreenProps} from '../../utils/types';

const color = theme.DARK;
const font = theme.FONTS;
const Login: React.FC<LoginScreenProps> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFocusedUsername, setIsFocusedUsername] = useState<boolean>(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState<boolean>(false);

  const input1Ref = useRef<TextInput>(null);
  const input2Ref = useRef<TextInput>(null);
  const {
    loading,
    errorUsername,
    errorPassword,
    validateUsername,
    validatePassword,
    login,
  } = useLogin();

  const handleChangeUsername = (text: string) => {
    setUsername(text);
    validateUsername(text);
  };
  const handleChangePassword = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  return (
    <View style={styles.container}>
      <FastImage
        source={Logo}
        style={styles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.welcomeText}>Welcome back!</Text>

      {/* username */}
      <View style={styles.inputContainer}>
        <View
          style={
            isFocusedUsername ? styles.inputHolderFocused : styles.inputHolder
          }>
          {/* icon */}
          <F6Icon
            name="user-large"
            size={25}
            color={isFocusedUsername ? color.AccentBlue : color.LightGray}
          />
          {/* textField */}
          <TextInput
            ref={input1Ref}
            placeholder="username / email"
            value={username}
            onChangeText={handleChangeUsername}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            placeholderTextColor={color.White}
            onFocus={() => setIsFocusedUsername(true)}
            onBlur={() => setIsFocusedUsername(false)}
            onSubmitEditing={() => input2Ref?.current?.focus()}
          />
        </View>
        {/* ErrorText */}
        <Text style={errorUsername ? styles.statusText : styles.statusTextHide}>
          {errorUsername}
        </Text>
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <View
          style={
            isFocusedPassword ? styles.inputHolderFocused : styles.inputHolder
          }>
          {/* icon */}
          <F6Icon
            name="lock"
            size={25}
            color={isFocusedPassword ? color.AccentBlue : color.LightGray}
          />
          {/* textField */}
          <TextInput
            ref={input2Ref}
            placeholder="password"
            value={password}
            secureTextEntry={true}
            onChangeText={handleChangePassword}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
            placeholderTextColor={color.White}
            onFocus={() => setIsFocusedPassword(true)}
            onBlur={() => setIsFocusedPassword(false)}
            onSubmitEditing={() => login(username, password)}
          />
        </View>
        {/* ErrorText */}
        <Text style={errorPassword ? styles.statusText : styles.statusTextHide}>
          {errorPassword}
        </Text>
        <TouchableOpacity>
          <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnHolder}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => login(username, password)}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnHolder}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>New here? Register Now!</Text>
        </TouchableOpacity>
      </View>
      <Validating loading={loading} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
    gap: 20,
    paddingTop: 25,
    position: 'relative',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 20,
    color: color.White,
    textAlign: 'center',
    fontFamily: font.OpenSansBold,
    paddingVertical: 10,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  inputHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: color.LighterGray2,
    paddingLeft: 12,
    borderRadius: 20,
  },
  inputHolderFocused: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 12,
    borderRadius: 20,
    borderColor: color.AccentBlue,
    borderWidth: 2,
  },
  input: {
    flex: 1,
    fontFamily: font.OpenSansMedium,
    color: color.White,
  },
  statusText: {
    color: color.Red,
    fontSize: 16,
    fontFamily: font.OpenSansBold,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  statusTextHide: {
    color: color.Red,
    fontSize: 16,
    fontFamily: font.OpenSansBold,
    paddingHorizontal: 10,
    paddingVertical: 2,
    display: 'none',
  },

  forgetPasswordText: {
    fontFamily: font.OpenSansMedium,
    color: color.White,
    textAlign: 'right',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  btnHolder: {
    paddingHorizontal: 30,
  },
  btn: {
    backgroundColor: color.AccentBlue,
    borderRadius: 10,
  },
  btnText: {
    color: color.White,
    padding: 15,
    fontSize: 18,
    fontFamily: font.OpenSansBold,
    textAlign: 'center',
  },
  registerText: {
    color: color.White,
    padding: 15,
    fontSize: 16,
    fontFamily: font.OpenSansBold,
    textAlign: 'center',
  },
});
