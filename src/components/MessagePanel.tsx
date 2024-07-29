import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import theme from '../utils/Theme';
import {F6Icon, MCIcon, MIcon} from '../utils/contstant';
import {sendMessageAPI} from '../api/api';
import {useUser} from '../context/usercontext';
import {Toast} from 'toastify-react-native';
import EmojiPicker, {EmojiType} from 'rn-emoji-keyboard';
import useEmitTyping from '../hooks/useEmitTyping';

const color = theme.DARK;
const MessagePanel: React.FC<chatType> = ({
  receiver,
  chatId,
  updateMessages,
}) => {
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('text');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {user} = useUser();
  const {emitTyping} = useEmitTyping();
  const onChangeMessage = (text: string) => {
    setMessage(text);
    emitTyping(true, receiver.username);
  };

  const onPressSend = async () => {
    try {
      const resp = await sendMessageAPI(
        chatId,
        receiver.username,
        message,
        messageType,
        user.token,
      );
      updateMessages(resp);
    } catch (error: any) {
      Toast.error(error?.message, 'top');
    } finally {
      setMessage('');
    }
  };
  const handlePick = (emojiObject: EmojiType) => {
    setMessage(prev => prev + emojiObject.emoji);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputHolder}>
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <F6Icon name="face-grin-wide" color={color.LightGray} size={25} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={onChangeMessage}
          placeholder="Message...."
          placeholderTextColor={color.White}
        />
        <TouchableOpacity>
          <MCIcon name="camera" color={color.LightGray} size={25} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPressSend}>
        <MIcon name="send" color={color.White} size={25} />
      </TouchableOpacity>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </View>
  );
};

export default MessagePanel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingTop: 10,
  },
  inputHolder: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.LighterGray,
    paddingHorizontal: 10,
    gap: 10,
    borderRadius: 99,
  },
  input: {
    flex: 1,
    color: color.White,
    paddingVertical: 10,
  },
  btn: {
    backgroundColor: color.LightGreen,
    borderRadius: 99,
    padding: 10,
  },
});
