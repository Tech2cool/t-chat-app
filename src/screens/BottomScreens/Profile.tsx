import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import theme from '../../utils/Theme';
import {ProfileScreenProps} from '../../utils/types';
import {useUser} from '../../context/usercontext';
import useLogout from '../../hooks/useLogout';

const color = theme.DARK;

const Profile: React.FC<ProfileScreenProps> = () => {
  const {user} = useUser();
  const {logout} = useLogout();
  return (
    <View style={styles.container}>
      <View style={styles.LogContainer}>
        <Text style={styles.text}>Wellcome back, {user?.username}</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.DarkBackGround,
    flex: 1,
    padding: 10,
  },
  LogContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: color.Red,
    padding: 10,
    maxWidth: 100,
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  text: {
    color: color.White,
    fontWeight: '600',
  },
});
