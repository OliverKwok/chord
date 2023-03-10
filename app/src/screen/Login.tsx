import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  Touchable,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {ScreenList} from '../type';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBook} from '@fortawesome/free-solid-svg-icons';

import Config from 'react-native-config';

const LoginForm = () => {
  const API_URL = Config.API_URL;
  // const API_URL = `http://192.168.104.114:3001`;

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const storeJwtToken = async (value: string) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
      console.log(e);
    }
  };

  const useLocalJwtToken = async () => {
    try {
      storeJwtToken(''); // delete the token locally
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        const response = await axios.get(`${API_URL}/profile`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(value).access_token}`,
          },
        });
        if (response.data.username) navigation.navigate(ScreenList.Main);
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    useLocalJwtToken();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: username,
        password: password,
      });

      if (response.data.access_token) {
        storeJwtToken(JSON.stringify(response.data));
        navigation.navigate(ScreenList.Main);
      }
    } catch (error) {
      Alert.alert('Wrong Username or Password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{margin: 20}}>
        <FontAwesomeIcon icon={faBook} size={50} color="white" />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'#6f6f6f'}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={text => setUsername(text)}
        value={username}
        onSubmitEditing={handleLogin}
        autoFocus={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#6f6f6f'}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
        onSubmitEditing={handleLogin}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.login}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Log in
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d3b66',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 20,
    color: 'black',
    borderRadius: 12,
  },
  login: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 12,
    backgroundColor: '#cdd400',
    borderRadius: 12,
  },
});

export default LoginForm;
