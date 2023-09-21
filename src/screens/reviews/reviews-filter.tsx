import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ScrollView, Text, TouchableOpacity } from '@/ui';
import colors from '@/ui/theme/colors';

type Props = {
  filters: { id: string; name: string }[];
  activeFilter: {
    id: string;
    name: string;
  };
  setActiveFilter: (val: { id: string; name: string }) => void;
};

const ReviewFilter = ({ filters, activeFilter, setActiveFilter }: Props) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-5"
      >
        {filters.map((cat, index) => {
          let isActive = cat.name === activeFilter.name;
          let activeButtonClass = isActive
            ? colors.dark.DEFAULT
            : colors.light[300];
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveFilter({ ...cat })}
              className="flex items-center space-y-1"
            >
              <Text variant="xl" style={{ color: activeButtonClass }}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default ReviewFilter;
