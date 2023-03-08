import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text, Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {ScreenList} from '../type';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBook} from '@fortawesome/free-solid-svg-icons';

import Config from 'react-native-config';

const LoginForm = () => {
  // const API_URL = Config.API_URL;
  const API_URL = `http://localhost:3001`;

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
      // storeJwtToken(''); // delete the token locally
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
      <View style={styles.upperContainer}>
        <View style={{margin: 20}}>
          <FontAwesomeIcon icon={faBook} size={50} color="white" />
        </View>
        <View>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>
            {/* Chord */}
          </Text>
        </View>
      </View>
      <View style={styles.lowerContainer}>
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
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperContainer: {
    flex: 0.4,
    backgroundColor: '#0d3b66',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerContainer: {
    flex: 0.6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#0d3b66',
    marginBottom: 20,
    color: 'black',
  },
});

export default LoginForm;
