import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum ScreenList {
  Login = 'Login',
  Main = 'Main',
  Print = 'Print',
  Pos = 'Pos',
  Student = 'Student',
  StudentDetail = 'StudentDetail',
  Enroll = 'Enroll',
  Course = 'Course',
  Admin = 'Admin',
}

export type RootStackParamList = {
  [ScreenList.Login]: undefined;
  [ScreenList.Main]: undefined;
  [ScreenList.Print]: undefined;
  [ScreenList.Pos]: undefined;
  [ScreenList.Student]: undefined;
  [ScreenList.StudentDetail]: {id: number};
  [ScreenList.Enroll]: undefined;
  [ScreenList.Course]: undefined;
  [ScreenList.Admin]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
