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
  Alert,
  RefreshControl,
  Button,
} from 'react-native';
import {version} from '../../package.json';
import Config from 'react-native-config';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import RNPrint from 'react-native-print';
import Spinner from 'react-native-loading-spinner-overlay';
import {Dialog} from '@rneui/themed';
import RadioButtonWithName from '../component/RadioButtonWithName';

interface PdfList {
  name: string;
  children: PdfList[];
}

interface Student {
  id: number;
  name: string;
}

interface PrintRecord {
  student_id: number;
  print_file_name: string;
}

const windowWidth = Dimensions.get('window').width;

export default () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const [folderList, setFolderList] = React.useState<PdfList[]>([]);
  const [selectFolder, setSelectFolder] = React.useState('');
  const [selectSubFolder, setSelectSubFolder] = React.useState('');

  const [checkIpPass, setCheckIpPass] = React.useState(false);
  const [checkVersionPass, setCheckVersionPass] = React.useState(false);
  const [showSpinner, setShowSpinner] = React.useState(false);
  // const [selectedPrinter, setSelectedPrinter] = React.useState<any>(null);

  // select student dialog
  const [showDialog, setShowDialog] = React.useState(false);
  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  // student list
  const [studentList, setStudentList] = React.useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = React.useState<number>(0);

  // print record list
  const [printRecordList, setPrintRecordList] = React.useState<String[]>([]);

  // to protect folder
  const longFolderName = 'VajRn5YpJk3Vxf7b';

  // const API_URL = Config.API_URL;
  const API_URL = `http://localhost:3001`;

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
    const studentResponse = await axios.get(`${API_URL}/student`);
    setStudentList(studentResponse.data);
  };

  const fetchPrintRecordJson = async (id: number) => {
    const printRecordResponse = await axios.get(
      `${API_URL}/print-record/${id}`,
    );
    if (printRecordResponse.data.length > 0) {
      setPrintRecordList(
        printRecordResponse.data.map(
          (item: PrintRecord) => item.print_file_name,
        ),
      );
    } else {
      setPrintRecordList([]);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPdfJson();
    setRefreshing(false);
  };

  React.useEffect(() => {
    checkExternalIp();
    checkVersion();
    fetchPdfJson();
    fetchStudentJson();
  }, []);

  React.useEffect(() => {
    fetchPrintRecordJson(selectedStudent);
  }, [selectedStudent]);

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
        {printRecordList.indexOf(fileName) !== -1 ? (
          <Text style={[styles.downButtonText, {color: 'red'}]}>
            {fileName}
          </Text>
        ) : (
          <Text style={styles.downButtonText}>{fileName}</Text>
        )}
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

    if (selectedStudent > 0) {
      let studentName = '';
      studentList.forEach((item: Student) => {
        if (item.id === selectedStudent) studentName = item.name;
      });
      // console.log(studentName);
      Alert.alert('Reminder', `Student selected is ${studentName}`, [
        {
          text: 'Cancel',
          onPress: () => {
            setShowSpinner(false);
            return;
          },
        },
        {
          text: 'OK',
          onPress: async () => {
            await axios.post(`${API_URL}/stats`, {
              selectFolder: selectFolder,
              selectSubFolder: selectSubFolder,
              selectFile: fileName,
            });

            await axios.post(`${API_URL}/print-record`, {
              student_id: selectedStudent,
              print_file_name: fileName,
            });

            await RNPrint.print({
              // printerURL: selectedPrinter.url,
              filePath: path,
            });

            fetchPrintRecordJson(selectedStudent);

            setShowSpinner(false);
          },
        },
      ]);
    }
    // setShowSpinner(false);
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
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 8,
              paddingVertical: 12,
            }}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.topContainer}
              showsHorizontalScrollIndicator={false}>
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
            <View style={{marginLeft: 8}}>
              <TouchableOpacity onPress={toggleDialog}>
                {selectedStudent === 0 ? (
                  <FontAwesomeIcon icon={faUser} size={30} color={'#f6edcf'} />
                ) : (
                  <FontAwesomeIcon icon={faUser} size={30} color={'#4c956c'} />
                )}
              </TouchableOpacity>
            </View>
          </View>
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
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={handleRefresh}
                    />
                  }
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
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={handleRefresh}
                    />
                  }
                />
              )}
            </View>
          </View>
          <Dialog isVisible={showDialog} onBackdropPress={toggleDialog}>
            <View style={{height: 500}}>
              <Dialog.Title title="Select student" />
              <FlatList
                data={studentList}
                renderItem={({item}) => (
                  <RadioButtonWithName
                    id={item.id}
                    name={item.name}
                    selectedStudent={selectedStudent}
                    setSelectedStudent={setSelectedStudent}
                  />
                )}
                keyExtractor={item => item.id.toString()}
              />
              <Button title="Select" onPress={toggleDialog} />
            </View>
          </Dialog>
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
    flex: 1,
    backgroundColor: '#0d3b66',
  },
  topContainer: {
    flexGrow: 1,
    backgroundColor: '#0d3b66',
  },
  topButton: {
    flex: 1,
    marginHorizontal: 8,
    justifyContent: 'center',
  },
  topButtonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  buttomContainer: {
    flex: 20,
    flexDirection: 'row',
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
    color: 'black',
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
