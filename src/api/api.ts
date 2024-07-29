import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/contstant';

interface userInfo {
  username: string;
  password?: string;
  email?: string;
  gender?: string;
}
// const baseURL = SERVER_BASE_URL;
const API = axios.create({
  baseURL: SERVER_BASE_URL,
});

export const loginAPI = async ({username, password}: userInfo) => {
  try {
    const resp = await API.post('/login', {username, password});
    return resp.data;
  } catch (error: any) {
    // console.log(error?.response);
    throw error?.response?.data;
  }
};
export const registerAPI = async ({
  username,
  email,
  password,
  gender,
}: userInfo) => {
  try {
    const resp = await API.post('/register', {
      username,
      email,
      password,
      gender,
    });
    return resp.data;
  } catch (error: any) {
    // console.log(error);
    throw error?.response?.data;
  }
};

export const findUserAPI = async (query: string, token: string) => {
  if (!query) return [];
  try {
    const resp = await API.get(`/user?query=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error: any) {
    // console.log(error);
    throw error?.response?.data;
  }
};

export const resendOTPAPI = async ({username, email}: userInfo) => {
  try {
    const resp = await API.get(`/resend-otp/${username}/${email}`);
    return resp.data;
  } catch (error: any) {
    // console.log(error?.response);
    throw error?.response?.data;
  }
};

export const VerifyOTPAPI = async (otp: string) => {
  try {
    const resp = await API.post('/verify-otp', {otp: otp});
    return resp.data;
  } catch (error: any) {
    // console.log(error);
    throw error?.response?.data;
  }
};
export const VerifyAPI = async (token: string) => {
  try {
    const resp = await API.get('/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error: any) {
    // console.log(error);
    throw error?.response?.data;
  }
};

export const CreateNewChatAPI = async (receiver: string, token: string) => {
  try {
    const resp = await API.post(
      '/new-chat',
      {receiver: receiver},
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    return resp.data;
  } catch (error: any) {
    // console.log(error);
    throw error?.response?.data;
  }
};

export const sendMessageAPI = async (
  id: string,
  receiver: string | undefined,
  content: string,
  contentType: string,
  token: string,
) => {
  try {
    const resp = await API.post(
      '/send-message',
      {
        id: id,
        receiver: receiver,
        content: content,
        contentType: contentType,
      },
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    return resp.data;
  } catch (error: any) {
    // console.log(error);
    throw error?.response?.data;
  }
};

export const getMessagesAPI = async (id: string, token: string) => {
  try {
    const resp = await API.get(`/chats/${id}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return resp.data;
  } catch (error: any) {
    // console.log(error);
    throw error?.response?.data;
  }
};
