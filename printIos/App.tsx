import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import RNPrint from 'react-native-print';
import Spinner from 'react-native-loading-spinner-overlay';

interface Item {
  name: string;
  children: Item[];
}

const windowWidth = Dimensions.get('window').width;

export default () => {
  const [folderList, setFolderList] = React.useState<Item[]>([]);
  const [selectFolder, setSelectFolder] = React.useState('');
  const [selectSubFolder, setSelectSubFolder] = React.useState('');
  const [checkIpPass, setCheckIpPass] = React.useState(false);
  const [checkVersionPass, setCheckVersionPass] = React.useState(false);
  const [showSpinner, setShowSpinner] = React.useState(false);

  const version = '1.0.0';

  const API_URL = `http://3.210.50.23`; // ec2
  // const API_URL = `http://192.168.104.114:3001`; // local

  const printRemotePDF = async (path: string) => {
    await RNPrint.print({
      filePath: path,
    });
    setShowSpinner(false);
  };

  const checkExternalIp = async () => {
    await fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        console.log('External IP address:', data.ip);
        callIpApi(data.ip);
      })
      .catch(error => {
        console.error('Error getting external IP address:', error);
      });
  };

  const callIpApi = (ipAddress: string) => {
    axios
      .post(`${API_URL}/ip`, {ip: ipAddress})
      .then(function (response) {
        setCheckIpPass(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    checkExternalIp();

    axios
      .post(`${API_URL}/version`, {version: version})
      .then(function (response) {
        setCheckVersionPass(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`${API_URL}/pdf`)
      .then(function (response) {
        setFolderList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function folderPressHandler(folderName: string) {
    setSelectSubFolder('');
    setSelectFolder(folderName);
  }

  function subFolderPressHandler(subFolderName: string) {
    setSelectSubFolder(subFolderName);
  }

  function filePressHandler(fileName: string) {
    // setSelectFile(fileName);
    printRemotePDF(
      encodeURI(
        `${API_URL}/pdfFile/${selectFolder}/${selectSubFolder}/${fileName}`,
      ),
    );
    setShowSpinner(true);
  }

  function subFolderRenderer(subFolderName: string) {
    return (
      <TouchableOpacity
        key={subFolderName}
        style={styles.downButton}
        onPress={() => subFolderPressHandler(subFolderName)}>
        <Text style={styles.downButtonText}>{subFolderName}</Text>
      </TouchableOpacity>
    );
  }

  function fileRenderer(fileName: string) {
    return (
      <TouchableOpacity
        key={fileName}
        style={styles.downButton}
        onPress={() => filePressHandler(fileName)}>
        <Text style={styles.downButtonText}>{fileName}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Spinner
        visible={showSpinner}
        animation="slide"
        textContent={'loading ...'}
        textStyle={{color: 'white'}}
      />
      {checkIpPass && checkVersionPass ? (
        <>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.topContainer}>
            {folderList.map(item => {
              return (
                <TouchableOpacity
                  key={item.name}
                  style={styles.topButton}
                  onPress={() => folderPressHandler(item.name)}>
                  <View>
                    <Text style={styles.topButtonText}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.buttomContainer}>
            <View style={styles.leftContainer}>
              {selectFolder === '' ? (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={styles.downNotSelectedText}>Select Upper</Text>
                </View>
              ) : (
                <FlatList
                  data={
                    folderList.filter(item => item.name == selectFolder)?.[0]
                      .children
                  }
                  renderItem={itemData => subFolderRenderer(itemData.item.name)}
                  keyExtractor={item => item.name}
                />
              )}
            </View>
            {/* <ScrollView contentContainerStyle={styles.rightContainer}>
              {selectSubFolder == '' ? (
                <Text></Text>
              ) : (
                folderList
                  .filter(item => item.name == selectFolder)?.[0]
                  .children.filter(item => item.name == selectSubFolder)?.[0]
                  .children.map(item => fileRenderer(item.name))
              )}
            </ScrollView> */}
            <View style={styles.rightContainer}>
              {selectSubFolder === '' ? (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={styles.downNotSelectedText}>Select Left</Text>
                </View>
              ) : (
                <FlatList
                  data={
                    folderList
                      .filter(item => item.name == selectFolder)?.[0]
                      .children.filter(
                        item => item.name == selectSubFolder,
                      )?.[0].children
                  }
                  renderItem={itemData => fileRenderer(itemData.item.name)}
                  keyExtractor={item => item.name}
                />
              )}
            </View>
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{marginBottom: 16}}>
            <Text style={{color: 'white'}}>Checking the Version</Text>
          </View>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d3b66',
    flex: 1,
  },
  topContainer: {
    backgroundColor: '#0d3b66',
    paddingHorizontal: 4,
    flexGrow: 1,
  },
  topButton: {
    marginHorizontal: 8,
    flex: 1,
    justifyContent: 'center',
  },
  topButtonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  buttomContainer: {
    flexDirection: 'row',
    flex: 20,
  },
  leftContainer: {
    width: windowWidth * 0.4,
    backgroundColor: '#ebebeb',
  },
  downButton: {
    borderBottomColor: '#0d3b66',
    borderWidth: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 4,
    paddingVertical: 12,
    marginHorizontal: 8,
  },
  downButtonText: {
    fontSize: 20,
    flexWrap: 'wrap',
  },
  downNotSelectedText: {
    textAlign: 'center',
    fontSize: 20,
  },
  rightContainer: {
    width: windowWidth * 0.6,
    backgroundColor: 'white',
  },
});
