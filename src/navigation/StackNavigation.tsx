import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Splash from '../screens/StackScreens/Splash';
import Login from '../screens/StackScreens/Login';
import BottomNavigation from './BottomNavigation';
import Register from '../screens/StackScreens/Register';
import Verification from '../screens/StackScreens/Verification';
import Chats from '../screens/StackScreens/Chats';
import ChatHeader from '../components/ChatHeader';
const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeStack"
          component={BottomNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chats"
          component={Chats}
          options={({route}) => ({
            header: () => <ChatHeader route={route} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
