import React, { useEffect } from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {UserContextProvider} from './src/context/usercontext';
import {SocketContextProvider} from './src/context/socketcontext';
import {MessagesContextProvider} from './src/context/messagecontext';
import StackNavigation from './src/navigation/StackNavigation';
import ToastManager from 'toastify-react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
const queryClient = new QueryClient();
const App = () => {
  const requestStoragePermissions = async () => {
    try {
      const results = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      console.log(results);
    } catch (error) {
      ToastAndroid.show(
        'Error requesting permissions:' + error,
        ToastAndroid.SHORT,
      );
    }
  };

  useEffect(()=>{
    requestStoragePermissions()
  },[])
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <SocketContextProvider>
          <MessagesContextProvider>
            <View style={styles.container}>
              <StackNavigation />
              <ToastManager
                animationStyle={'rightInOut'}
                positionValue={10}
                style={styles.toastManager}
              />
            </View>
          </MessagesContextProvider>
        </SocketContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toastManager: {
    right: 0,
  },
});
