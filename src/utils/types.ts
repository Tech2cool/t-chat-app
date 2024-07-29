import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type VerificationScreenProps = StackScreenProps<
  RootStackParamList,
  'Verification'
>;
export type SplashScreenProps = StackScreenProps<RootStackParamList, 'Splash'>;
export type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;
export type ChatScreenProps = StackScreenProps<RootStackParamList, 'Chats'>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type HomeStackScreenProps = StackScreenProps<
  RootStackParamList,
  'HomeStack'
>;

export type RegisterScreenProps = StackScreenProps<
  RootStackParamList,
  'Register'
>;

export type ProfileScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'Profile'
>;
export type StatusScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'Status'
>;

// Type for navigation prop
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;
