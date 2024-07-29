interface ParamListBase {
  [key: string]: object | undefined;
}

interface RootStackParamList extends ParamListBase {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Splash: undefined;
  HomeStack: undefined;
  Chats: {chatId: string; receiver: userType};
  Verification: {
    username: string;
    email: string;
    password: string;
    gender: string;
  };
  Profile: undefined;
  Status: undefined;
}

interface messageType {
  _id: string;
  sender: String;
  receiver: String;
  content: String;
  contentType: Boolean;
  delivered: Boolean;
  seen: Boolean;
  seenAt: Boolean;
  createdAt: string;
  updatedAt: string;
}
interface chatType {
  receiver: userType;
  chatId: string;
  updateMessages: (message: messageType) => void;
}
interface chatsType {
  receiver: userType;
  chats: {
    _id: string;
    isGroupChat: string;
    lastMessage: messageType;
    createdAt: string;
    updatedAt: string;
    receiver: {
      totalUnread: number;
    };
  };
}

interface userType {
  username: string;
  email: string;
  name: string;
  profileImg: string;
  about: string;
  phoneNumber: number | null;
  verified: boolean;
  lastOnline: string;
  userType: string;
  status: string;
  chats: chatsType[];
  token: string;
}
