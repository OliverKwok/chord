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
  Button,
  Alert,
} from 'react-native';

import axios from 'axios';
import RNPrint from 'react-native-print';
import Spinner from 'react-native-loading-spinner-overlay';

interface PdfList {
  name: string;
  children: PdfList[];
}

interface StudentList {
  id: string;
  name: string;
}

const windowWidth = Dimensions.get('window').width;

export default () => {
  const [folderList, setFolderList] = React.useState<PdfList[]>([]);
  const [selectFolder, setSelectFolder] = React.useState('');
  const [selectSubFolder, setSelectSubFolder] = React.useState('');

  const [checkIpPass, setCheckIpPass] = React.useState(false);
  const [checkVersionPass, setCheckVersionPass] = React.useState(false);
  const [showSpinner, setShowSpinner] = React.useState(false);
  // const [selectedPrinter, setSelectedPrinter] = React.useState<any>(null);

  const [studentList, setStudentList] = React.useState<StudentList[]>([]);

  const version = '1.1.5';

  const longFolderName = 'VajRn5YpJk3Vxf7b';

  const API_URL = `https://chord-pos.ga`; // ec2 with domain
  // const API_URL = `http://3.210.50.23`; // ec2
  // const API_URL = `http://192.168.104.114:3001`; // local

  const checkExternalIp = async () => {
    const ipAddress = await axios.get('https://api.ipify.org?format=json');
    const response = await axios.post(`${API_URL}/ip`, {ip: ipAddress.data});
    setCheckIpPass(response.data);
    return response.data;
  };

  const checkVersion = async () => {
    const versionResponse = await axios.post(`${API_URL}/version`, {
      version: version,
    });
    setCheckVersionPass(versionResponse.data);
  };

  const fetchPdfJson = async () => {
    const pdfResponse = await axios.get(`${API_URL}/pdf`);
    setFolderList(pdfResponse.data);
  };

  const fetchStudentJson = async () => {
    const studentResponse = [
      {id: '1', name: 'StudentA'},
      {id: '2', name: 'StudentB'},
      {id: '3', name: 'StudentC'},
      {id: '4', name: 'StudentD'},
      {id: '5', name: 'StudentE'},
      {id: '6', name: 'StudentF'},
      {id: '7', name: 'StudentG'},
    ];
    setStudentList(studentResponse);
  };

  React.useEffect(() => {
    checkExternalIp();
    checkVersion();
    fetchPdfJson();
    fetchStudentJson();
  }, []);

  function folderPressHandler(folderName: string) {
    setSelectSubFolder('');
    setSelectFolder(folderName);
  }

  function subFolderPressHandler(subFolderName: string) {
    setSelectSubFolder(subFolderName);
  }

  function filePressHandler(fileName: string) {
    setShowSpinner(true);
    sendToPrint(
      encodeURI(
        `${API_URL}/pdfFile${longFolderName}/${selectFolder}/${selectSubFolder}/${fileName}`,
      ),
      fileName,
    );
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

  // iOS Only
  // const selectPrinter = async () => {
  //   const selectedPrinter = await RNPrint.selectPrinter({x: '100', y: '100'});
  //   setSelectedPrinter(selectedPrinter);
  // };

  // iOS Only
  const sendToPrint = async (path: string, fileName: string) => {
    const checkIpBeforePrint = await checkExternalIp();
    if (!checkIpBeforePrint) {
      Alert.alert('Reminder', 'Please Print At Shop Only', [
        {text: 'OK', onPress: () => setShowSpinner(false)},
      ]);
      return;
    }

    // if (!selectedPrinter) {
    //   Alert.alert('Reminder', 'Please Select Printer', [
    //     {text: 'OK', onPress: () => setShowSpinner(false)},
    //   ]);
    //   return;
    // }

    await axios.post(`${API_URL}/stats`, {
      selectFolder: selectFolder,
      selectSubFolder: selectSubFolder,
      selectFile: fileName,
    });

    await RNPrint.print({
      // printerURL: selectedPrinter.url,
      filePath: path,
    });

    setShowSpinner(false);
  };

  // for promise testing

  // const delay = async (ms: number) => {
  //   return new Promise(resolve => {
  //     setTimeout(resolve as any, ms);
  //   });
  // };

  // await delay(3000);

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
          {/* <View style={styles.footerContainer}>
            <FlatList
              horizontal={true}
              data={studentList}
              renderItem={itemData => (
                <TouchableOpacity>
                  <Text style={styles.footerButtonText}>
                    {itemData.item.name}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View> */}
          {/* silent print function, not use it now */}
          {/* <View style={styles.footerContainer}>
            <Button onPress={selectPrinter} title="Select Printer" />
            <View style={{paddingBottom: 12}}>
              {!selectedPrinter ? (
                <Text style={{textAlign: 'center'}}>Not Selected</Text>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                  }}>{`Selected Printer Name: ${selectedPrinter.name}`}</Text>
              )}
            </View>
          </View> */}
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
  footerContainer: {
    backgroundColor: 'white',
  },
  footerButtonText: {
    fontSize: 20,
    marginHorizontal: 8,
    marginVertical: 12,
  },
});
