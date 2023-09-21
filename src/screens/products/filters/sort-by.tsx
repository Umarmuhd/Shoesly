import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ScrollView, Text, TouchableOpacity, View } from '@/ui';

type Props = {
  filters: { id: string; name: string }[];
  activeFilter: string;
  setActiveFilter: (val: string) => void;
};

const SortByFilter = ({ filters, activeFilter, setActiveFilter }: Props) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-2.5"
      >
        {filters.map((filter, _) => {
          let isActive = filter.id === activeFilter;
          let activeButtonClass = isActive
            ? { container: ' bg-dark border-dark', text: ' text-light' }
            : {
                container: ' bg-transparent border-light-200',
                text: ' text-dark',
              };
          return (
            <View key={filter.id}>
              <TouchableOpacity
                className={
                  'border flex flex-row items-center rounded-full py-2 px-5 ' +
                  activeButtonClass.container
                }
                onPress={() => setActiveFilter(filter.id)}
                activeOpacity={0.6}
              >
                <Text
                  className={'mx-auto font-semibold' + activeButtonClass.text}
                >
                  {filter.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export { SortByFilter };
