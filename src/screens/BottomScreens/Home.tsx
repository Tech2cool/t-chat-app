import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import theme from '../../utils/Theme';
import SearchBar from '../../components/SearchBar';
import {useUser} from '../../context/usercontext';
import {HomeScreenProps} from '../../utils/types';
import {VerifyAPI} from '../../api/api';
import {useQuery} from '@tanstack/react-query';
import {useFocusEffect} from '@react-navigation/native';
import ChatCardHome from '../../components/ChatCardHome';
import {useMessages} from '../../context/messagecontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'toastify-react-native';

const color = theme.DARK;
const Home: React.FC<HomeScreenProps> = () => {
  const {user, setUser} = useUser();
  const {setMessages} = useMessages();
  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ['user', user?.token],
    queryFn: () => VerifyAPI(user?.token),
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  useEffect(() => {
    if (!data) return;

    setUser(data);
    setMessages([]);
    AsyncStorage.setItem('user', JSON.stringify(data));
    // console.log('data setUser useEffect');
  }, [data, setUser]);

  if (error) {
    Toast.error(error?.message, 'top');
  }
  return (
    <View style={styles.container}>
      <SearchBar />
      <ScrollView>
        {isLoading && (
          <ActivityIndicator
            size={25}
            color={color.Red}
            style={{alignSelf: 'center'}}
          />
        )}
        {user?.chats?.map((item: chatsType, i: number) => (
          <ChatCardHome key={i} user={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
  },
});
