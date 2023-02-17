import axios from 'axios';
import React from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';

import {ScreenList} from '../type';

interface Item {
  name: string;
  children: Item[];
}

export default () => {
  const navigation = useNavigation();

  const [folderList, setFolderList] = React.useState<Item[]>([]);
  const [selectFolder, setSelectFolder] = React.useState('');
  // const [subFolderList, setSubFolderList] = React.useState([]);
  const [selectSubFolder, setSelectSubFolder] = React.useState('');
  // const [fileList, setFileList] = React.useState([]);
  const [selectFile, setSelectFile] = React.useState('');

  React.useEffect(() => {
    axios
      .get(`${Config.API_URL}/pdf`)
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

  function filePressHandler(fileName: string) {
    setSelectFile(fileName);
    navigation.navigate(ScreenList.PdfViewer);
  }

  function subFolderPressHandler(subFolderName: string) {
    setSelectSubFolder(subFolderName);
  }

  function subFolderRenderer(subFolderName: string) {
    return (
      <TouchableOpacity
        key={subFolderName}
        style={styles.leftButton}
        onPress={() => subFolderPressHandler(subFolderName)}>
        <Text>{subFolderName}</Text>
      </TouchableOpacity>
    );
  }

  function fileRenderer(fileName: string) {
    return (
      <TouchableOpacity
        key={fileName}
        style={styles.leftButton}
        onPress={() => filePressHandler(fileName)}>
        <Text>{fileName}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        {folderList.map(item => {
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.topButton}
              onPress={() => folderPressHandler(item.name)}>
              <View>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.buttomContainer}>
        <View style={styles.leftContainer}>
          {selectFolder == '' ? (
            <Text>select folder</Text>
          ) : (
            folderList
              .filter(item => item.name == selectFolder)?.[0]
              .children.map(item => subFolderRenderer(item.name))
          )}
        </View>
        <View style={styles.rightContainer}>
          {selectSubFolder == '' ? (
            <Text>select sub folder</Text>
          ) : (
            folderList
              .filter(item => item.name == selectFolder)?.[0]
              .children.filter(item => item.name == selectSubFolder)?.[0]
              .children.map(item => fileRenderer(item.name))
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#d8d8d8',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  topButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    margin: 4,
  },
  buttomContainer: {
    flexDirection: 'row',
    flex: 10,
    backgroundColor: 'blue',
  },
  leftContainer: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  leftButton: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
  },
  rightContainer: {
    flex: 1,
    backgroundColor: 'pink',
  },
});
