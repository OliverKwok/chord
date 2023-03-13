export const printBackgroundIos = () => {};
// const [selectedPrinter, setSelectedPrinter] = React.useState<any>(null);

// iOS Only
// const selectPrinter = async () => {
//   const selectedPrinter = await RNPrint.selectPrinter({x: '100', y: '100'});
//   setSelectedPrinter(selectedPrinter);
// };

// if (!selectedPrinter) {
//   Alert.alert('Reminder', 'Please Select Printer', [
//     {text: 'OK', onPress: () => setShowSpinner(false)},
//   ]);
//   return;
// }

// await RNPrint.print({
//   // printerURL: selectedPrinter.url,
//   filePath: path,
// });

// for promise testing

// const delay = async (ms: number) => {
//   return new Promise(resolve => {
//     setTimeout(resolve as any, ms);
//   });
// };

// await delay(3000);

// {
//   /* silent print function, not use it now */
// }
// {
//   /* <View style={styles.footerContainer}>
//             <Button onPress={selectPrinter} title="Select Printer" />
//             <View style={{paddingBottom: 12}}>
//               {!selectedPrinter ? (
//                 <Text style={{textAlign: 'center'}}>Not Selected</Text>
//               ) : (
//                 <Text
//                   style={{
//                     textAlign: 'center',
//                   }}>{`Selected Printer Name: ${selectedPrinter.name}`}</Text>
//               )}
//             </View>
//           </View> */
// }
