import moment from 'moment';
import PushNotification from 'react-native-push-notification';

export const generateArray = (start: number = 0, end: number) => {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};

export const SendPushMessage = (message: messageType) => {
  PushNotification.localNotification({
    channelId: 't-chat-app-channel-1',
    subText: `${message.sender} • ${moment(message.createdAt).fromNow()}`,
    title: `${message.sender}`,
    message: `${message.content}`,
    largeIconUrl:
      'https://res.cloudinary.com/dv0qlxghf/image/upload/v1722160391/t-chat/x3hjqqneqrdwnfpu9sok.png',
  });
};
