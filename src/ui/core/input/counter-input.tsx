import { AddCircle, MinusCirlce } from 'iconsax-react-native';
import * as React from 'react';
import { Pressable } from 'react-native';

import { colors } from '@/ui/theme';

import { Text } from '../text';
import { View } from '../view';

export type CounterInputProps = {
  value: number;
  increment: () => void;
  decrement: () => void;
};

export const CounterInput = ({
  value,
  increment,
  decrement,
}: CounterInputProps) => {
  return (
    <View className="flex flex-row items-center space-x-2.5">
      <Pressable onPress={decrement} className="p-2">
        <MinusCirlce size="24" color={colors.dark.DEFAULT} />
      </Pressable>
      <Text>{value}</Text>
      <Pressable onPress={increment} className="p-2">
        <AddCircle size="24" color={colors.dark.DEFAULT} />
      </Pressable>
    </View>
  );
};
