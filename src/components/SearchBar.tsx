import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import theme from '../utils/Theme';
import {FIcon} from '../utils/contstant';
import ChatCard from './ChatCard';
import {useQuery} from '@tanstack/react-query';
import useDebounce from '../hooks/useDebounce';
import {useUser} from '../context/usercontext';
import {CreateNewChatAPI, findUserAPI} from '../api/api';
import {useNavigation} from '../hooks/useNavigation';
import {Toast} from 'toastify-react-native';
const color = theme.DARK;

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const {user} = useUser();
  const navigation = useNavigation();
  const debouceSearch = useDebounce(search, 500);
  const onChangeSearch = (text: string) => {
    setSearch(text);
  };
  const {data, error, isLoading} = useQuery<userType[]>({
    queryKey: ['users', debouceSearch],
    queryFn: () => findUserAPI(search, user?.token),
  });
  const onPressUser = async (receiver: userType) => {
    if (user.username && receiver.username) {
      const resp = await CreateNewChatAPI(receiver.username, user.token);

      navigation.navigate('Chats', {
        chatId: resp._id,
        receiver: receiver,
      });

      setSearch('');
    }
  };

  const renderItem = useCallback(
    ({item, index}: {item: userType; index: number}) => {
      const isLastItem = data && data?.length > 0 && index === data?.length - 1;
      return (
        <TouchableOpacity
          style={isLastItem ? styles.lastItem : undefined}
          onPress={() => onPressUser(item)}>
          <ChatCard user={item} />
        </TouchableOpacity>
      );
    },
    [],
  );

  if (error) {
    Toast.error(error?.message, 'top');
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputHolder}>
        {/* icon */}
        <FIcon name="search" size={20} color={color.White} />
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={onChangeSearch}
          placeholder="Search user...."
          placeholderTextColor={color.White}
        />
      </View>
      <View style={styles.listViewContainer}>
        {isLoading && <ActivityIndicator size={30} color={color.Red} />}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.DarkBackGround,
  },
  inputHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.LighterGray,
    paddingLeft: 15,
    gap: 10,
    borderRadius: 99,
    paddingHorizontal: 8,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    color: color.White,
    paddingVertical: 10,
  },
  listViewContainer: {
    gap: 10,
    paddingTop: 10,
  },
  contentContainerStyle: {
    gap: 10,
  },
  lastItem: {
    borderBottomWidth: 1,
    borderBottomColor: color.LighterGray,
  },
});
