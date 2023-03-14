import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import axios from 'axios';
import {API_URL} from '@env';
import {Student} from '../../type/app';

export default ({route}: any) => {
  const {id} = route.params;

  const [studentDetail, setStudentDetail] = React.useState<Student>({
    id: 0,
    name: '',
    birthdy: '',
    level: '',
    school: '',
    phone: '',
    phone_relation: '',
    phone2: '',
    phone2_relation: '',
    estate: '',
    remark: '',
    is_quitted: '',
    gender: '',
  });

  const fetchStudentDetail = async () => {
    const response = await axios.get(`${API_URL}/student/${id}`);
    setStudentDetail(response.data);
  };

  React.useEffect(() => {
    fetchStudentDetail();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>{studentDetail.name}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
