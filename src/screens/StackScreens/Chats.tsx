import React, {useCallback, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ChatScreenProps} from '../../utils/types';
import {getMessagesAPI} from '../../api/api';
import {useUser} from '../../context/usercontext';
import {Toast} from 'toastify-react-native';
import {useQuery} from '@tanstack/react-query';
import MessageCard from '../../components/MessageCard';
import theme from '../../utils/Theme';
import MessagePanel from '../../components/MessagePanel';
import ChatSkeleton from '../../skeletons/ChatSkeleton';
import {useMessages} from '../../context/messagecontext';
import useListenMessages from '../../hooks/useListenMessages';

const color = theme.DARK;
const Chat: React.FC<ChatScreenProps> = ({route}) => {
  const {chatId, receiver} = route.params;
  // const [messages, setMessages] = useState<messageType[]>([]);
  const {messages, setMessages} = useMessages();
  const {user} = useUser();
  const flatRef = useRef<FlatList>(null);
  useListenMessages();

  const fetchMessages = async () => {
    try {
      const resp = await getMessagesAPI(chatId, user.token);
      return resp;
    } catch (err: any) {
      throw err;
    }
  };

  const {data, error, isLoading} = useQuery({
    queryKey: ['messages', chatId],
    queryFn: fetchMessages,
    enabled: !!chatId,
  });
  const renderItem = useCallback(({item}: {item: messageType}) => {
    return <MessageCard message={item} />;
  }, []);

  const updateMessages = (message: messageType) => {
    setMessages(prev => [...prev, message]);
  };
  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data, setMessages]);

  if (error) {
    Toast.error(error?.message, 'top');
  }
  return (
    <View style={styles.container}>
      {isLoading && <ChatSkeleton length={8} />}

      <FlatList
        ref={flatRef}
        data={messages}
        keyExtractor={item => `${item?._id}`}
        contentContainerStyle={styles.contentContainerStyle}
        onContentSizeChange={() => flatRef?.current?.scrollToEnd()}
        renderItem={renderItem}
      />
      <MessagePanel
        receiver={receiver}
        chatId={chatId}
        updateMessages={updateMessages}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
    // paddingVertical: 5,
    paddingHorizontal: 10,
  },
  contentContainerStyle: {
    paddingHorizontal: 5,
    // paddingVertical: 10,
  },
});
