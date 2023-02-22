import axios from "axios";
import React from "react";
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
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { ScreenList } from "../type";

interface Item {
  name: string;
  children: Item[];
}

export default () => {
  const navigation = useNavigation();

  const [folderList, setFolderList] = React.useState<Item[]>([]);
  const [selectFolder, setSelectFolder] = React.useState("");
  // const [subFolderList, setSubFolderList] = React.useState([]);
  const [selectSubFolder, setSelectSubFolder] = React.useState("");
  // const [fileList, setFileList] = React.useState([]);
  // const [selectFile, setSelectFile] = React.useState("");

  const API_URL = `http://localhost:3001`;

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
    setSelectSubFolder("");
    setSelectFolder(folderName);
  }

  function subFolderPressHandler(subFolderName: string) {
    setSelectSubFolder(subFolderName);
  }

  function filePressHandler(fileName: string) {
    // setSelectFile(fileName);
    navigation.navigate(ScreenList.PrintPdf, {
      filePath: `${API_URL}/pdfFile/${selectFolder}/${selectSubFolder}/${fileName}`,
    });
  }

  function subFolderRenderer(subFolderName: string) {
    return (
      <TouchableOpacity
        key={subFolderName}
        style={styles.leftButton}
        onPress={() => subFolderPressHandler(subFolderName)}
      >
        <Text>{subFolderName}</Text>
      </TouchableOpacity>
    );
  }

  function fileRenderer(fileName: string) {
    return (
      <TouchableOpacity
        key={fileName}
        style={styles.leftButton}
        onPress={() => filePressHandler(fileName)}
      >
        <Text>{fileName}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true} contentContainerStyle={styles.topContainer}>
        {folderList.map((item) => {
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.topButton}
              onPress={() => folderPressHandler(item.name)}
            >
              <View>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.buttomContainer}>
        <ScrollView contentContainerStyle={styles.leftContainer}>
          {selectFolder == "" ? (
            <Text>select folder</Text>
          ) : (
            folderList
              .filter((item) => item.name == selectFolder)?.[0]
              .children.map((item) => subFolderRenderer(item.name))
          )}
        </ScrollView>
        <ScrollView contentContainerStyle={styles.rightContainer}>
          {selectSubFolder == "" ? (
            <Text>select sub folder</Text>
          ) : (
            folderList
              .filter((item) => item.name == selectFolder)?.[0]
              .children.filter((item) => item.name == selectSubFolder)?.[0]
              .children.map((item) => fileRenderer(item.name))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: "#d8d8d8",
    paddingHorizontal: 4,
    flexGrow: 1,
  },
  topButton: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    margin: 4,
    flex: 1,
    justifyContent: "center",
  },
  buttomContainer: {
    flexDirection: "row",
    flex: 10,
  },
  leftContainer: {
    flex: 1,
    backgroundColor: "#ffffd2",
  },
  leftButton: {
    borderColor: "black",
    borderWidth: 1,
    padding: 8,
  },
  rightContainer: {
    flex: 1,
    backgroundColor: "#fbe0e4",
  },
});
