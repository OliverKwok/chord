import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum ScreenList {
  Login = 'Login',
  Main = 'Main',
  PdfViewer = 'PdfViewer',
}

export type RootStackParamList = {
  [ScreenList.Login]: undefined;
  [ScreenList.Main]: undefined;
  [ScreenList.PdfViewer]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
