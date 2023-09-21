import { AddCircle, MinusCirlce } from 'iconsax-react-native';
import * as React from 'react';
import type { TextInput } from 'react-native';
import { Pressable } from 'react-native';

import { colors } from '@/ui/theme';

import { Text } from '../text';
import { View } from '../view';

export type CounterInputProps = {
  min?: number;
  max?: number;
  initialValue?: number;
};

export const CounterInput = ({
  initialValue,
  min,
  max,
  ...props
}: CounterInputProps) => {
  // const { onChange } = props;
  const [value, setValue] = React.useState(initialValue ?? 0);
  const ref = React.useRef<TextInput>(null);
  // const evt = React.useRef(new Event('change'));

  const increment = function () {
    setValue((v) => {
      const c = max ? (1 + v <= max ? v + 1 : v) : v + 1;
      dispatch(c);
      return c;
    });
  };
  const decrement = () => {
    setValue((v) => {
      //@ts-ignore
      const c = v - 1 < min ? v : v - 1;
      dispatch(c);
      return c;
    });
  };

  const dispatch = (c: string | number) => {
    if (ref.current) {
      //@ts-ignore
      ref.current.value = `${c}`;
      // ref.current.dispatchEvent(evt.current);
    }
  };

  return (
    <View
      ref={ref}
      {...props}
      // onChange={undefined}
      className="flex flex-row items-center space-x-2.5"
    >
      <Pressable
        onPress={() => {
          decrement();
        }}
        className="p-2"
      >
        <MinusCirlce size="24" color={colors.dark.DEFAULT} />
      </Pressable>
      <Text>{value}</Text>
      <Pressable
        onPress={() => {
          increment();
        }}
        className="p-2"
      >
        <AddCircle size="24" color={colors.dark.DEFAULT} />
      </Pressable>
    </View>
  );
};
