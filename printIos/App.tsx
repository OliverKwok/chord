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
} from 'react-native';

import axios from 'axios';
import RNPrint from 'react-native-print';

interface Item {
  name: string;
  children: Item[];
}

const windowWidth = Dimensions.get('window').width;

export default () => {
  const [folderList, setFolderList] = React.useState<Item[]>([]);
  const [selectFolder, setSelectFolder] = React.useState('');
  // const [subFolderList, setSubFolderList] = React.useState([]);
  const [selectSubFolder, setSelectSubFolder] = React.useState('');
  // const [fileList, setFileList] = React.useState([]);
  // const [selectFile, setSelectFile] = React.useState("");

  const API_URL = `http://localhost:3001`;
  // const API_URL = `http://192.168.122.1:3001`;

  const printRemotePDF = async (path: string) => {
    await RNPrint.print({
      filePath: path,
    });
  };

  React.useEffect(() => {
    axios
      .get(`${API_URL}/pdf`)
      .then(function (response) {
        setFolderList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  function folderPressHandler(folderName: string) {
    setSelectSubFolder('');
    setSelectFolder(folderName);
  }

  function subFolderPressHandler(subFolderName: string) {
    setSelectSubFolder(subFolderName);
  }

  function filePressHandler(path: string) {
    // setSelectFile(fileName);
    printRemotePDF(
      'http://192.168.104.114:3001/pdfFile/exam%20class/P5/Exam%20Eng_P5_L14%20Teacher.pdf',
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView horizontal={true} contentContainerStyle={styles.topContainer}>
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
        <ScrollView contentContainerStyle={styles.leftContainer}>
          {selectFolder == '' ? (
            <Text></Text>
          ) : (
            folderList
              .filter(item => item.name == selectFolder)?.[0]
              .children.map(item => subFolderRenderer(item.name))
          )}
        </ScrollView>
        <ScrollView contentContainerStyle={styles.rightContainer}>
          {selectSubFolder == '' ? (
            <Text></Text>
          ) : (
            folderList
              .filter(item => item.name == selectFolder)?.[0]
              .children.filter(item => item.name == selectSubFolder)?.[0]
              .children.map(item => fileRenderer(item.name))
          )}
        </ScrollView>
      </View>
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
    flex: 1,
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
  rightContainer: {
    flex: 1,
    width: windowWidth * 0.6,
    backgroundColor: 'white',
  },
});
