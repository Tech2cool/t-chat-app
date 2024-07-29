import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import theme from '../utils/Theme';
import {IIcon, MCIcon, OctIcon} from '../utils/contstant';
import {RouteProp} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '../hooks/useNavigation';
import {useSocket} from '../context/socketcontext';
import useListenTyping from '../hooks/useListenTyping';

const color = theme.DARK;
const font = theme.FONTS;
type ChatHeaderProps = {
  route: RouteProp<RootStackParamList, 'Chats'>;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({route}) => {
  const {receiver} = route?.params;
  const navigation = useNavigation();
  const {onlineUsers} = useSocket();
  const {isTyping} = useListenTyping(receiver.username);
  const isOnline = onlineUsers?.find(
    usr => usr?.username === receiver?.username,
  );
  const name = receiver?.name ? receiver?.name : receiver?.username;

  return (
    <View style={styles.container}>
      <View style={styles.icnNameWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IIcon size={25} name="arrow-back" color={color.White} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <FastImage
            source={{uri: receiver.profileImg}}
            style={styles.profilePic}
            resizeMode={FastImage.resizeMode.cover}
          />
          <OctIcon
            style={isOnline ? styles.dotOnline : styles.noDot}
            name="dot-fill"
            color={color.AccentGreen}
            size={16}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.Heading}>{name}</Text>
          <Text style={styles.typing}>{isTyping ? 'typing...' : ''}</Text>
        </View>
      </View>
      <MCIcon name="dots-vertical" color={color.White} size={25} />
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.DarkBackGround,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icnNameWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  nameWrapper: {
    justifyContent: 'center',
  },
  Heading: {
    color: color.White,
    fontFamily: font.OpenSansMedium,
    fontSize: 17,
  },
  typing: {
    color: color.LightGray,
    fontFamily: font.RobotoMedium,
    fontSize: 13,
  },
  logoContainer: {
    width: 35,
    height: 35,
    position: 'relative',
    overflow: 'hidden',
  },
  profilePic: {
    borderRadius: 99,
    width: '100%',
    height: '100%',
  },
  dotOnline: {
    position: 'absolute',
    top: -4,
    right: 0,
    zIndex: 2,
  },
  noDot: {
    position: 'absolute',
    top: -5,
    right: 2,
    zIndex: 2,
    opacity: 0,
  },
});
