import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../utils/Theme';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {useUser} from '../context/usercontext';
import {useSocket} from '../context/socketcontext';
import {OctIcon} from '../utils/contstant';
const color = theme.DARK;
const font = theme.FONTS;
interface chatCardProps {
  user: userType;
}
const ChatCard = ({user: receiver}: chatCardProps) => {
  const {user} = useUser();
  const {onlineUsers} = useSocket();

  const isOnline = onlineUsers?.find(
    usr => usr?.username === receiver?.username,
  );

  const name = receiver.name ? receiver.name : receiver.username;
  const profilePic = receiver.profileImg;
  const lastMessage = receiver.chats?.find(
    chat => chat?.receiver?.username === user?.username,
  )?.chats?.lastMessage;

  const lastTime = moment(lastMessage?.updatedAt).format('LT') || undefined;

  const totalUnreads = receiver.chats?.receiver?.totalUnread || 0;
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <FastImage
          source={{uri: profilePic}}
          style={styles.profilePic}
          resizeMode={FastImage.resizeMode.cover}
        />
        <OctIcon
          style={isOnline ? styles.dotOnline : styles.noDot}
          name="dot-fill"
          color={color.AccentGreen}
          size={20}
        />
      </View>
      <View style={styles.flexContaier}>
        <View style={styles.headerContainer}>
          {/* username/name */}
          <Text style={styles.messageName}>{name}</Text>
          <Text style={styles.messageTime}>{lastTime}</Text>
        </View>
        <View style={styles.headerContainer}>
          {/* lastMessage/num of Message */}
          <Text style={lastMessage ? styles.messageText : styles.displayNone}>
            {lastMessage?.content}
          </Text>
          <View style={totalUnreads ? styles.unreadDot : styles.displayNone}>
            <Text style={styles.textUnread}>{totalUnreads}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // marginVertical: 2,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: color.DarkBackGround,
  },
  logoContainer: {
    width: 50,
    height: 50,
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
    top: -5,
    right: 2,
    zIndex: 2,
  },
  noDot: {
    position: 'absolute',
    top: -5,
    right: 2,
    zIndex: 2,
    opacity: 0,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexContaier: {
    flex: 1,
    gap: 5,
  },
  unreadDot: {
    backgroundColor: color.LimeGreen,
    borderRadius: 99,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayNone: {
    display: 'none',
  },
  textUnread: {
    color: color.Black,
    fontFamily: font.OpenSansBold,
  },
  messageName: {
    color: color.White,
    fontFamily: font.OpenSansBold,
  },
  messageText: {
    color: color.White,
    fontFamily: font.OpenSansMedium,
  },
  messageTime: {
    color: color.White,
  },
});
