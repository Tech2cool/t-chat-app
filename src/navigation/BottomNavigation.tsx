/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/BottomScreens/Home';
import {F5Icon, MIcon} from '../utils/contstant';
import theme from '../utils/Theme';
import {HomeStackScreenProps} from '../utils/types';
import HomeHeader from '../components/HomeHeader';
import Status from '../screens/BottomScreens/Status';
import Profile from '../screens/BottomScreens/Profile';
const BTab = createBottomTabNavigator<RootStackParamList>();
const color = theme.DARK;

const BottomNavigation: React.FC<HomeStackScreenProps> = () => {
  return (
    <BTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: color.DarkBackGround,
        },
        headerStyle: {
          backgroundColor: color.DarkBackGround,
          // borderTopWidth: 0.5, // Removes the top border
          elevation: 0, // Removes the shadow on Android
          shadowOpacity: 0, // Removes the shadow on iOS
        },
        headerTitleStyle: {
          color: color.White,
        },
        headerTitleAlign: 'left',
      }}
      initialRouteName="Home">
      <BTab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          header: () => <HomeHeader />,
          title: 'T-CHAT',
          tabBarIcon: ({color, size}) => (
            <MIcon name="chat" color={color} size={size} />
          ),
        }}
      />
      <BTab.Screen
        name="Status"
        component={Status}
        options={{
          tabBarIcon: ({color, size}) => (
            <MIcon name="motion-photos-on" color={color} size={size} />
          ),
        }}
      />
      <BTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <F5Icon name="user-alt" color={color} size={size} />
          ),
        }}
      />
    </BTab.Navigator>
  );
};

export default BottomNavigation;
