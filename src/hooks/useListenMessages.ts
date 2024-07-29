import {useEffect} from 'react';
import {useMessages} from '../context/messagecontext';
import {useSocket} from '../context/socketcontext';
import {SendPushMessage} from '../utils/helperFunctions';

const useListenMessages = () => {
  const {socket} = useSocket();
  const {messages, setMessages} = useMessages();

  useEffect(() => {
    socket?.on('newMessage', newMessage => {
      setMessages([...messages, newMessage]);
      SendPushMessage(newMessage);
    });

    return () => socket?.off('newMessage');
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
