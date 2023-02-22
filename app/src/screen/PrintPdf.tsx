import * as React from "react";
import { View, StyleSheet, Button, Platform, Text } from "react-native";
import * as Print from "expo-print";

export default function PrintPdf({ route }: any) {
  const { filePath } = route.params;

  console.log(filePath);

  const [selectedPrinter, setSelectedPrinter] = React.useState<any>();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      // html,
      uri: filePath,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  // const printToFile = async () => {
  //   // On iOS/android prints the given html. On web prints the HTML from the current page.
  //   const { uri } = await Print.printToFileAsync({ html });
  //   console.log("File has been saved to:", uri);
  // };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <View style={styles.container}>
      <Button title="Print" onPress={print} />
      <View />
      {/* <Button title="Print to PDF file" onPress={printToFile} /> */}
      {Platform.OS === "ios" && (
        <>
          <Button title="Select printer" onPress={selectPrinter} />
          {/* {selectedPrinter ? (
            <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined} */}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
