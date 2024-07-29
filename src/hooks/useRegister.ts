/* eslint-disable react-hooks/rules-of-hooks */
import {useState} from 'react';
import {registerAPI} from '../api/api';
import {useUser} from '../context/usercontext';
import {Toast} from 'toastify-react-native';
import {useNavigation} from './useNavigation';

const userRegister = () => {
  const {setUser} = useUser();
  const [loading, setLoading] = useState(false);
  const [errorUsername, setErrorUsername] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<
    string | null
  >(null);

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

  const validateEmail = (email: string) => {
    const invalidChars =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const hasSpace = /\s/;
    const match = email.match(invalidChars);

    if (email === '') {
      setErrorEmail(null);
    } else if (hasSpace.test(email)) {
      setErrorEmail('email should not contain spaces');
    } else if (!match) {
      setErrorEmail('Invalid email address');
    } else {
      setErrorEmail(null);
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
  const validateConfirmPassword = (
    password: string,
    confirmPassword: string,
  ) => {
    const hasSpace = /\s/;
    if (confirmPassword === '') {
      setErrorConfirmPassword(null);
    } else if (hasSpace.test(confirmPassword)) {
      setErrorConfirmPassword('Password should not contain spaces');
    } else if (confirmPassword.length < 6) {
      setErrorConfirmPassword('Password should be more than 6 Characters');
    } else if (confirmPassword !== password) {
      setErrorConfirmPassword("Password and confirm password doesn't match");
    } else {
      setErrorConfirmPassword(null);
    }
  };
  const register = async (
    username: string,
    email: string,
    password: string,
    gender: string,
  ) => {
    if (!username || !email || !password || !gender) {
      Toast.error('All Fields Required', 'top');
      return;
    }
    try {
      setLoading(true);
      const resp = await registerAPI({username, email, password, gender});
      setUser(resp);
      Toast.success('Verification OTP Sent to Email', 'top');
      navigation.navigate('Verification', {
        username,
        email,
        password,
        gender,
      });
    } catch (error: any) {
      Toast.error(error?.message, 'top');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errorEmail,
    errorUsername,
    errorPassword,
    errorConfirmPassword,
    register,
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
  };
};

export default userRegister;
