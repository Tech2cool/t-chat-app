import {useRef} from 'react';
import {useSocket} from '../context/socketcontext';

const useEmitTyping = () => {
  const {socket} = useSocket();
  const timerRef = useRef<any>(null);
  const emitTyping = (typing: boolean, receiver: string) => {
    socket?.emit('typing', {typing, receiver});
    clearTimeout(timerRef?.current);
    timerRef.current = setTimeout(() => {
      socket?.emit('typing', {typing: false, receiver});
    }, 1200);
  };
  return {emitTyping};
};
export default useEmitTyping;
