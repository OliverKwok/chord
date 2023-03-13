import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {Student} from '../../type/app';

import {useStudentListStore} from '../../store/studentList';
import {SafeAreaView} from 'react-native-safe-area-context';

export default () => {
  const {studentList} = useStudentListStore();

  const studentListItemRenderer = (item: Student) => {
    return (
      <TouchableOpacity style={styles.studentNameContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.studentNameText}>{item.name}</Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text style={styles.studentNameText}>P1</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.studentNameText}>9123 4567</Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text style={styles.studentNameText}>A</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.listHeader}>
        <View style={{flex: 1}}>
          <Text style={styles.listHeaderText}>Name</Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text style={styles.listHeaderText}>Level</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.listHeaderText}>Phone</Text>
        </View>
        <View style={{flex: 0.5}}></View>
      </View>
      <View>
        <FlatList
          data={studentList}
          renderItem={({item}) => studentListItemRenderer(item)}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
  },
  listHeaderText: {
    textAlign: 'center',
    fontSize: 20,
  },
  studentNameContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  studentNameText: {
    textAlign: 'center',
    fontSize: 20,
  },
});
