import {useState} from 'react';
import {loginAPI, resendOTPAPI} from '../api/api';
import {useUser} from '../context/usercontext';
import {Toast} from 'toastify-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from './useNavigation';

const useLogin = () => {
  const {setUser} = useUser();
  const [loading, setLoading] = useState(false);
  const [errorUsername, setErrorUsername] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);

  const navigation = useNavigation();

  const validateUsername = (username: string) => {
    const invalidChars = /[,.';{}[\]\-+]/g;
    const hasSpace = /\s/;
    const matches = username.match(invalidChars);

    if (username === '') {
      setErrorUsername(null);
    } else if (hasSpace.test(username)) {
      setErrorUsername('Username should not contain spaces');
    } else if (matches) {
      setErrorUsername(`Invalid character: ${matches}`);
    } else if (username.length < 6) {
      setErrorUsername('Username should be more than 6 Characters');
    } else {
      setErrorUsername(null);
    }
  };

  const validatePassword = (password: string) => {
    const hasSpace = /\s/;
    if (password === '') {
      setErrorPassword(null);
    } else if (hasSpace.test(password)) {
      setErrorPassword('Password should not contain spaces');
    } else if (password.length < 6) {
      setErrorPassword('Password should be more than 6 Characters');
    } else {
      setErrorPassword(null);
    }
  };

  const login = async (username: string, password: string) => {
    if (!username || !password) {
      Toast.error('All Fields Required', 'top');
      return;
    }
    try {
      setLoading(true);
      const resp = await loginAPI({username, password});
      if (resp) {
        setUser(resp);
        Toast.success('login successful', 'top');
        AsyncStorage.setItem('user', JSON.stringify(resp));
        navigation.navigate('HomeStack');
      }
    } catch (error: any) {
      if (error?.message === 'Please verify your email') {
        Toast.error(error?.message, 'top');
        navigation.navigate('Verification', {
          username,
          email: error?.email,
          password,
          gender: error?.gender,
        });
        await resendOTPAPI({username, email: error?.email});
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errorPassword,
    errorUsername,
    login,
    validateUsername,
    validatePassword,
  };
};

export default useLogin;
