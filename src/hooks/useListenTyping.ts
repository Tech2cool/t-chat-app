import {useEffect, useState} from 'react';
import {useSocket} from '../context/socketcontext';
import useDebounce from './useDebounce';

interface stateProps {
  isTyping: boolean;
}
const useListenTyping = (receiver: string) => {
  const {socket} = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const debounceTyping = useDebounce(isTyping, 100);

  useEffect(() => {
    if (!socket) return;

    const handleTypingOn = (state: stateProps) => {
      setIsTyping(state.isTyping);
    };

    socket.on('typing-on', handleTypingOn);

    // Clean up the listener when the component unmounts or when the receiver changes
    return () => {
      socket.off('typing-on', handleTypingOn);
    };
  }, [socket, receiver]);

  return {isTyping: debounceTyping};
};

export default useListenTyping;
