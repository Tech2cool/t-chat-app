/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,

  requestPermissions: Platform.OS === 'ios',
});
PushNotification.createChannel(
  {
    channelId: 't-chat-app-channel-1', // (required)
    channelName: 'T-chat Channel', // (required)
    channelDescription: 'T-chat Messages',
    playSound: false,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
  },
  // created => console.log(`createChannel returned '${created}'`),
);

AppRegistry.registerComponent(appName, () => App);
