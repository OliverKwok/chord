import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Student} from '../../type/app';
import {ScreenList} from '../../type/screenType';

import {useStudentListStore} from '../../store/studentList';
import {SafeAreaView} from 'react-native-safe-area-context';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faUser} from '@fortawesome/free-solid-svg-icons';

export default () => {
  const {studentList} = useStudentListStore();
  const navigation = useNavigation();

  const studentListItemRenderer = (item: Student) => {
    return (
      <TouchableOpacity
        style={styles.studentNameContainer}
        onPress={() => {
          navigation.navigate(ScreenList.StudentDetail, {
            id: item.id,
          });
        }}>
        <View
          style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
          <FontAwesomeIcon icon={faUser} size={20} color={'#050087'} />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.studentNameText}>{item.name}</Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text style={styles.studentNameText}>{item.level}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={studentList}
          renderItem={({item}) => studentListItemRenderer(item)}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
        <FontAwesomeIcon icon={faPlus} size={30} color={'white'} />
      </TouchableOpacity>
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
    marginBottom: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomColor: '#0d3b66',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  studentNameText: {
    textAlign: 'center',
    fontSize: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0d3b66',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
