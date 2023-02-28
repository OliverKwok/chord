import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum ScreenList {
  Login = 'Login',
  Main = 'Main',
  Print = 'Print',
  Pos = 'Pos',
}

export type RootStackParamList = {
  [ScreenList.Login]: undefined;
  [ScreenList.Main]: undefined;
  [ScreenList.Print]: undefined;
  [ScreenList.Pos]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
