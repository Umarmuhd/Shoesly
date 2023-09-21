import type { RouteProp as NRouteProp } from '@react-navigation/native';

import type { StackParamList } from './root-navigator';

export type RootStackParamList = StackParamList;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<
  RootStackParamList,
  T
>;
