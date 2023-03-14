import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StudentDetail = {
  id: 1,
  name: 'John Doe',
  birthday: '1990-01-01',
  level: 'P1',
  school: 'School ABC',
  phone: '91234567',
  phone_relation: 'mother',
  phone2: '51234567',
  phone2_relation: 'helper',
  estate: 'MegaMall',
  remark:
    '閱讀理解較弱，一些相近字混淆，但英文基礎OK 只要解釋英文的文法規律及用法，就可以按規律完成，但初學的過去式未太熟。懂得閱讀簡單的英文句子及生字，詞庫不多。',
  is_quitted: false,
  gender: 'M',
};

export default () => {
  return (
    <View>
      <Text>StudentDetail</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
