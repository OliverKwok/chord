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
} from 'react-native';

import axios from 'axios';
import {NetworkInfo} from 'react-native-network-info';
import RNPrint from 'react-native-print';

interface Item {
  name: string;
  children: Item[];
}

const windowWidth = Dimensions.get('window').width;

export default () => {
  const incomingData = [
    {
      name: 'folder 1',
      children: [
        {
          name: 'folder a',
          children: [
            {
              name: 'sample 1.pdf',
              children: [],
            },
            {
              name: 'sample 2.pdf',
              children: [],
            },
          ],
        },
        {
          name: 'folder b',
          children: [
            {
              name: 'sample 3.pdf',
              children: [],
            },
            {
              name: 'sample 4.pdf',
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: 'folder 2',
      children: [
        {
          name: 'folder c',
          children: [
            {
              name: 'sample 1.pdf',
              children: [],
            },
            {
              name: 'sample 2.pdf',
              children: [],
            },
          ],
        },
        {
          name: 'folder d',
          children: [
            {
              name: 'sample 3.pdf',
              children: [],
            },
            {
              name: 'sample 4.pdf',
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: 'folder 3',
      children: [
        {
          name: 'folder e',
          children: [
            {
              name: 'sample 1.pdf',
              children: [],
            },
            {
              name: 'sample 2.pdf',
              children: [],
            },
          ],
        },
        {
          name: 'folder f',
          children: [
            {
              name: 'sample 3.pdf',
              children: [],
            },
            {
              name: 'sample 4.pdf',
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: 'folder 4',
      children: [
        {
          name: 'folder g',
          children: [
            {
              name: 'sample 1.pdf',
              children: [],
            },
            {
              name: 'sample 2.pdf',
              children: [],
            },
          ],
        },
        {
          name: 'folder h',
          children: [
            {
              name: 'sample 3.pdf',
              children: [],
            },
            {
              name: 'sample 4.pdf',
              children: [],
            },
          ],
        },
      ],
    },
  ];

  const [folderList, setFolderList] = React.useState<Item[]>(incomingData);
  const [selectFolder, setSelectFolder] = React.useState('');
  const [selectSubFolder, setSelectSubFolder] = React.useState('');
  const [isCheckedIp, setIsCheckedIp] = React.useState(false);
  const [checkIpPass, setCheckIpPass] = React.useState(true);
  const [isCheckedVersion, setIsCheckedVersion] = React.useState(false);
  const [checkVersionPass, setCheckVersionPass] = React.useState(true);

  const version = '1.0.0';

  const API_URL = `http://3.210.50.23`; // ec2
  // const API_URL = `http://192.168.104.114:3001`; // local

  const printRemotePDF = async (path: string) => {
    await RNPrint.print({
      filePath: path,
    });
  };

  React.useEffect(() => {
    // if (isCheckedIp === false) {
    //   NetworkInfo.getIPV4Address().then(ipv4Address => {
    //     axios
    //       .post(`${API_URL}/ip`, {ip: ipv4Address})
    //       .then(function (response) {
    //         setCheckIpPass(response.data);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //   });
    //   setIsCheckedIp(true);
    // }
    // if (isCheckedVersion === false) {
    //   axios
    //     .post(`${API_URL}/version`, {version: version})
    //     .then(function (response) {
    //       setCheckVersionPass(response.data);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   setIsCheckedVersion(true);
    // }
    // axios
    //   .get(`${API_URL}/pdf`)
    //   .then(function (response) {
    //     setFolderList(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  });

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
            {/* <ScrollView contentContainerStyle={styles.leftContainer}>
              {selectFolder == '' ? (
                <Text></Text>
              ) : (
                folderList
                  .filter(item => item.name == selectFolder)?.[0]
                  .children.map(item => subFolderRenderer(item.name))
              )}
            </ScrollView> */}
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
              {selectFolder === '' ? (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={styles.downNotSelectedText}>Select Left</Text>
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
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>Loading</Text>
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
  downNotSelectedText: {
    textAlign: 'center',
    fontSize: 20,
  },
  rightContainer: {
    flex: 1,
    width: windowWidth * 0.6,
    backgroundColor: 'white',
  },
});
