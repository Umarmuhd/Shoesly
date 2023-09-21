import React from 'react';

import type { Product } from '@/api/products/types';
import Star from '@/images/star.svg';
import { Image, Pressable, Text, View } from '@/ui';

type Props = Product & { onPress?: () => void };

export const ProductCard = ({ name, price, onPress = () => {} }: Props) => {
  return (
    <Pressable className="block overflow-hidden shadow-xl" onPress={onPress}>
      <View className="flex h-[150px] w-full flex-row items-center justify-center overflow-hidden rounded-[20px] bg-dark/5">
        <Image
          className="relative h-[80px] w-[120px] bg-dark/5 object-cover"
          source={'../../../assets/images/products/img.png'}
        />
      </View>

      <View className="mt-2.5">
        <Text variant="xs" numberOfLines={1} className="mb-[5px]">
          {name}
        </Text>
        <View className="flex flex-row space-x-[5px]">
          <Star width={12} height={12} fill={'#FCD240'} />
          <Text className="text-[11px] leading-[14px]" weight="bold">
            4.5
          </Text>
          <Text className="text-[11px] leading-[14px] !text-light-300">
            (1045 Reviews)
          </Text>
        </View>
        <Text variant="sm" className="" weight="bold" numberOfLines={1}>
          ${price}
        </Text>
      </View>
    </Pressable>
  );
};
