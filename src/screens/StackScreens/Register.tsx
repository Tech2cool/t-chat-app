import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import theme from '../../utils/Theme';
import FastImage from 'react-native-fast-image';
import Logo from '../../assets/images/logo.png';
import {F6Icon, MCIcon} from '../../utils/contstant';
import {TextInput} from 'react-native';
import Validating from '../../components/Validating';
import CheckBox from '../../components/CheckBox';
import userRegister from '../../hooks/useRegister';
import {RegisterScreenProps} from '../../utils/types';

const color = theme.DARK;
const font = theme.FONTS;
const Register: React.FC<RegisterScreenProps> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isFocusedUsername, setIsFocusedUsername] = useState<boolean>(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState<boolean>(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState<boolean>(false);
  const [isFocusedConfirmPassword, setIsFocusedConfirmPassword] =
    useState<boolean>(false);

  const input1Ref = useRef<TextInput>(null);
  const input2Ref = useRef<TextInput>(null);
  const input3Ref = useRef<TextInput>(null);
  const input4Ref = useRef<TextInput>(null);

  const {
    loading,
    errorEmail,
    errorUsername,
    errorPassword,
    errorConfirmPassword,
    register,
    validateEmail,
    validateUsername,
    validatePassword,
    validateConfirmPassword,
  } = userRegister();

  const handleChangeUsername = (text: string) => {
    setUsername(text);
    validateUsername(text);
  };
  const handleChangeEmail = (text: string) => {
    setEmail(text);
    validateEmail(text);
  };

  const handleChangePassword = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const handleConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    validateConfirmPassword(password, text);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <FastImage
          source={Logo}
          style={styles.logo}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.welcomeText}>Create an account</Text>

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
              placeholder="username"
              value={username}
              onChangeText={handleChangeUsername}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="default"
              autoCorrect={false}
              placeholderTextColor={color.White}
              onFocus={() => setIsFocusedUsername(true)}
              onBlur={() => setIsFocusedUsername(false)}
              onSubmitEditing={() => input2Ref?.current?.focus()}
            />
          </View>
          {/* ErrorText */}
          <Text
            style={errorUsername ? styles.statusText : styles.statusTextHide}>
            {errorUsername}
          </Text>
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <View
            style={
              isFocusedEmail ? styles.inputHolderFocused : styles.inputHolder
            }>
            {/* icon */}
            <MCIcon
              name="email"
              size={25}
              color={isFocusedEmail ? color.AccentBlue : color.LightGray}
            />
            {/* textField */}
            <TextInput
              ref={input2Ref}
              placeholder="email"
              value={email}
              onChangeText={handleChangeEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              placeholderTextColor={color.White}
              onFocus={() => setIsFocusedEmail(true)}
              onBlur={() => setIsFocusedEmail(false)}
              onSubmitEditing={() => input3Ref?.current?.focus()}
            />
          </View>
          {/* ErrorText */}
          <Text style={errorEmail ? styles.statusText : styles.statusTextHide}>
            {errorEmail}
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
              ref={input3Ref}
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
              onSubmitEditing={() => input4Ref?.current?.focus()}
            />
          </View>
          {/* ErrorText */}
          <Text
            style={errorPassword ? styles.statusText : styles.statusTextHide}>
            {errorPassword}
          </Text>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <View
            style={
              isFocusedConfirmPassword
                ? styles.inputHolderFocused
                : styles.inputHolder
            }>
            {/* icon */}
            <F6Icon
              name="lock"
              size={25}
              color={
                isFocusedConfirmPassword ? color.AccentBlue : color.LightGray
              }
            />
            {/* textField */}
            <TextInput
              ref={input4Ref}
              placeholder="confirm password"
              value={confirmPassword}
              secureTextEntry={true}
              onChangeText={handleConfirmPassword}
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              placeholderTextColor={color.White}
              onFocus={() => setIsFocusedConfirmPassword(true)}
              onBlur={() => setIsFocusedConfirmPassword(false)}
              // onSubmitEditing={() => input4Ref?.current?.focus()}
            />
          </View>
          {/* ErrorText */}
          <Text
            style={
              errorConfirmPassword ? styles.statusText : styles.statusTextHide
            }>
            {errorConfirmPassword}
          </Text>
        </View>
        <View>
          <CheckBox
            list={['Male', 'Female']}
            onSelect={setGender}
            selected={gender}
          />
        </View>

        <View style={styles.btnHolder}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => register(username, email, password, gender)}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnHolder}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerText}>
              Already have an account? Login here!
            </Text>
          </TouchableOpacity>
        </View>
        <Validating loading={loading} />
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
    gap: 20,
    paddingTop: 15,
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
