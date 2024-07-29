import {useState} from 'react';
import {useUser} from '../context/usercontext';
import {Toast} from 'toastify-react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogout = () => {
  const {setUser} = useUser();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const logout = () => {
    try {
      setLoading(true);
      setUser(null);
      AsyncStorage.removeItem('user');
      Toast.success('logout succesful', 'top');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    } catch (error: any) {
      Toast.error(error?.message, 'top');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    logout,
  };
};

export default useLogout;
