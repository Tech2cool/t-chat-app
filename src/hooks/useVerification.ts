import {useState} from 'react';
import {resendOTPAPI, VerifyOTPAPI} from '../api/api';
import {Toast} from 'toastify-react-native';
import {useNavigation} from './useNavigation';
import {useUser} from '../context/usercontext';

const useVerification = () => {
  const [loading, setLoading] = useState(false);
  const {setUser} = useUser();
  const navigation = useNavigation();

  const verifyOTP = async (otp: string) => {
    try {
      setLoading(true);
      const resp = await VerifyOTPAPI(otp);
      if (resp) {
        setUser(resp);
      }
      Toast.success('Verification successful', 'top');
      navigation.navigate('HomeStack');
      setLoading(false);
    } catch (error: any) {
      Toast.error(error?.message, 'top');
    } finally {
      setLoading(false);
    }
  };
  const resendOTP = async (username: string, email: string) => {
    try {
      setLoading(true);

      await resendOTPAPI({username, email});
      Toast.success('OTP sent on email', 'top');
      setLoading(false);
    } catch (error: any) {
      Toast.error(error?.message, 'top');
    } finally {
      setLoading(false);
    }
  };

  return {loading, verifyOTP, resendOTP};
};

export default useVerification;
