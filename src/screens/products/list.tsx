/* eslint-disable max-lines-per-function */
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Bag2, Setting4 } from 'iconsax-react-native';
import React from 'react';

import type { Product } from '@/api/products/types';
import products from '@/data/items.json';
import {
  colors,
  EmptyList,
  FocusAwareStatusBar,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

import { ProductCard } from './card';

export const Discover = () => {
  const { data, isLoading, isError } = {
    data: products,
    isLoading: false,
    isError: false,
  };

  const { navigate } = useNavigation();

  const renderItem = React.useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        {...item}
        onPress={() => navigate('Product', { id: item.id })}
      />
    ),
    [navigate]
  );

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }

  return (
    <>
      <FocusAwareStatusBar />
      <View className="mt-[30px] min-h-screen max-w-full px-4">
        <View className="mb-6 flex flex-row items-center justify-between">
          <Text variant="h1" className="" weight="bold">
            Discover
          </Text>
          <Pressable
            onPress={() => {
              navigate('Cart');
            }}
            className="relative"
          >
            <View className="absolute top-1 right-0 z-10 h-2 w-2 rounded-full bg-danger" />
            <Bag2 size="24" color={colors.dark.DEFAULT} />
          </Pressable>
        </View>
        <View className="flex-1">
          <FlashList
            data={data}
            renderItem={renderItem}
            keyExtractor={(_, index) => `item-${index}`}
            ListEmptyComponent={<EmptyList isLoading={isLoading} />}
            estimatedItemSize={300}
            numColumns={2}
            // eslint-disable-next-line react/no-unstable-nested-components
            ItemSeparatorComponent={() => <View className="h-4 w-4" />}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity
          className="absolute bottom-24 flex flex-row items-center rounded-full bg-dark py-2.5 px-5"
          onPress={() => {
            navigate('ProductFilter');
          }}
          activeOpacity={0.6}
        >
          <Setting4 size={20} color={colors.light.DEFAULT} />
          <Text
            variant="sm"
            className="mx-auto ml-4 uppercase text-light"
            weight="bold"
          >
            Filter
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
