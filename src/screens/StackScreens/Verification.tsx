import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import theme from '../../utils/Theme';

import FastImage from 'react-native-fast-image';
import Logo from '../../assets/images/logo.png';
import dotbg from '../../assets/images/dotbg.png';
import useVerification from '../../hooks/useVerification';
import {VerificationScreenProps} from '../../utils/types';

const color = theme.DARK;
const Verification: React.FC<VerificationScreenProps> = ({route}) => {
  const {username, email} = route.params;

  const [input1, setinput1] = useState<string>('');
  const [input2, setinput2] = useState<string>('');
  const [input3, setinput3] = useState<string>('');
  const [input4, setinput4] = useState<string>('');
  const [otp, setOtp] = useState<string>('');

  const input1Ref = useRef<TextInput>(null);
  const input2Ref = useRef<TextInput>(null);
  const input3Ref = useRef<TextInput>(null);
  const input4Ref = useRef<TextInput>(null);
  const {loading, verifyOTP, resendOTP} = useVerification();

  useEffect(() => {
    input1Ref?.current?.focus();
  }, []);
  useEffect(() => {
    if (!otp) {
      return;
    }
    verifyOTP(otp);
  }, [otp]);

  const onChangeText = (
    text: string,
    setter: (text: string) => void,
    ref?: React.RefObject<TextInput>,
    isLastInput: boolean = false,
  ) => {
    const tst =
      text.length > 1 ? text.substring(text.length - 1, text.length) : text;
    setter(tst);
    if (ref) {
      ref?.current?.focus();
    }
    if (isLastInput && text.trim().length > 0) {
      setOtp(input1 + input2 + input3 + tst);
    }
  };

  return (
    <View style={styles.container}>
      <FastImage
        source={dotbg}
        style={styles.bgImg}
        resizeMode={FastImage.resizeMode.cover}
      />

      <FastImage
        source={Logo}
        style={styles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />

      <View style={styles.inputHolder}>
        <TextInput
          ref={input1Ref}
          value={input1}
          keyboardType="numeric"
          textContentType="oneTimeCode"
          onChangeText={text => onChangeText(text, setinput1, input2Ref)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => input2Ref?.current?.focus()}
        />
        <TextInput
          ref={input2Ref}
          value={input2}
          keyboardType="numeric"
          textContentType="oneTimeCode"
          onChangeText={text => onChangeText(text, setinput2, input3Ref)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => input3Ref?.current?.focus()}
        />

        <TextInput
          ref={input3Ref}
          value={input3}
          keyboardType="numeric"
          textContentType="oneTimeCode"
          onChangeText={text => onChangeText(text, setinput3, input4Ref)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => input4Ref?.current?.focus()}
        />

        <TextInput
          ref={input4Ref}
          value={input4}
          keyboardType="numeric"
          textContentType="oneTimeCode"
          onChangeText={text => onChangeText(text, setinput4, undefined, true)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => verifyOTP(otp)}
        />
      </View>
      <View style={styles.Holder}>
        <TouchableOpacity style={styles.btn} onPress={() => verifyOTP(otp)}>
          <Text style={styles.heading}>Verify</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Holder}>
        <TouchableOpacity onPress={() => resendOTP(username, email)}>
          <Text style={styles.VerificationText}>Resend OTP?</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size={30} color={color.Red} />
        </View>
      )}
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.DarkBackGround,
    justifyContent: 'center',
    flex: 1,
    gap: 20,
    position: 'relative',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    color: color.White,
  },
  Holder: {
    gap: 10,
    padding: 20,
  },
  inputHolder: {
    gap: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: color.AccentBlue,
  },
  input: {
    width: 50,
    backgroundColor: color.LighterGray,
    borderColor: color.LighterGray,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    color: color.White,
  },
  btn: {
    backgroundColor: color.AccentBlue,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  VerificationText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    color: color.White,
    // textDecorationLine: 'underline',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  bgImg: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    opacity: 0.1,
  },
  forgotText: {
    textAlign: 'right',
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  message: {
    textAlign: 'center',
  },
});
