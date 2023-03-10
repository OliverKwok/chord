import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

const RadioButton = ({
  id,
  name,
  selectedStudent,
  setSelectedStudent,
}: {
  id: number;
  name: string;
  selectedStudent: number;
  setSelectedStudent: any;
}) => {
  const handlePress = () => {
    if (id === selectedStudent) {
      setSelectedStudent(0);
    } else {
      setSelectedStudent(id);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{margin: 12}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {selectedStudent !== id ? (
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            size={20}
            color={'#6e6e6e'}
          />
        ) : (
          <FontAwesomeIcon icon={faCheck} size={20} color={'#4c956c'} />
        )}
        <View style={{marginLeft: 12}}>
          <Text style={{fontSize: 20}}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
