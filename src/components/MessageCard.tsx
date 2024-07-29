import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import theme from '../utils/Theme';
import moment from 'moment';
import {useUser} from '../context/usercontext';
import {IIcon} from '../utils/contstant';
const color = theme.DARK;
const font = theme.FONTS;
interface chatCardProps {
  message: messageType;
}
const MessageCard: React.FC<chatCardProps> = ({message}) => {
  const {user} = useUser();
  return (
    <TouchableOpacity
      style={
        user?.username === message?.sender
          ? styles.containerSelf
          : styles.container
      }>
      <View
        style={
          user?.username === message?.sender
            ? styles.headerContainerSelf
            : styles.headerContainer
        }>
        {/* lastMessage/num of Message */}
        <Text style={styles.messageText}>{message?.content}</Text>
        <View style={styles.containerFlexTime}>
          <Text style={styles.messageTime}>
            {moment(message?.createdAt).format('LT')}
          </Text>
          <IIcon
            size={16}
            name={message?.seen ? 'checkmark-done-sharp' : 'checkmark-sharp'}
            color={message?.seen ? color.AccentBlue : color.LightGray}
            style={{
              display: user?.username === message?.sender ? 'flex' : 'none',
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  containerSelf: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  containerFlexTime: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
  },
  headerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: color.LighterGray,
    borderRadius: 10,
  },
  headerContainerSelf: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: color.TealGreen,
    borderRadius: 10,
  },

  displayNone: {
    display: 'none',
  },
  textUnread: {
    color: color.Black,
    fontFamily: font.OpenSansBold,
  },
  messageText: {
    color: color.White,
    fontFamily: font.OpenSansMedium,
    fontSize: 16,
  },
  messageTime: {
    color: color.White,
    fontSize: 12,
    fontFamily: font.OpenSansMedium,
  },
});
