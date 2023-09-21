import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ScrollView, Text, TouchableOpacity, View } from '@/ui';
import colors from '@/ui/theme/colors';

type Props = {
  filters: { id: string; name: string; code: string }[];
  activeFilter: string;
  setActiveFilter: (val: string) => void;
};

const ColorFilter = ({ filters, activeFilter, setActiveFilter }: Props) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-2.5"
      >
        {filters.map((filter, _) => {
          let isActive = filter.id === activeFilter;
          let activeButtonClass = isActive ? 'border-dark' : 'border-light-200';
          return (
            <View key={filter.id}>
              <TouchableOpacity
                className={
                  'flex flex-row items-center rounded-full border py-2.5 px-5 ' +
                  activeButtonClass
                }
                onPress={() => setActiveFilter(filter.id)}
                activeOpacity={0.6}
              >
                <View
                  className="h-5 w-5 rounded-full"
                  style={{
                    backgroundColor: filter.code,
                    borderColor:
                      filter.id === 'white'
                        ? colors.light['300']
                        : 'transparent',
                    borderWidth: filter.id === 'white' ? 1 : undefined,
                  }}
                />
                <Text className={'mx-auto ml-2.5 font-semibold text-dark'}>
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

export { ColorFilter };
