import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Image, Text, TouchableOpacity, View } from '@/ui';

function AddedToCart({ quantity }: { quantity: number }) {
  const { navigate } = useNavigation();
  return (
    <View className="flex-1 items-center px-6">
      <View className="relative mb-5">
        <Image
          className="h-[100px] w-[100px]"
          source="@/images/tick-circle.svg"
        />
      </View>
      <View className="mb-[30px] flex w-full flex-col items-center gap-[5px]">
        <Text className="text-2xl text-dark" weight="bold">
          Added to cart
        </Text>
        <Text variant="sm">{quantity} Item Total</Text>
      </View>
      <View className="mt-auto mb-0 flex w-full flex-row justify-between bg-white py-4">
        <View className="">
          <TouchableOpacity
            className="flex flex-row items-center rounded-full border border-light-200 bg-transparent py-4 px-[42.5px]"
            onPress={() => {
              navigate('Discover');
            }}
            activeOpacity={0.6}
          >
            <Text
              variant="sm"
              className="mx-auto uppercase text-dark"
              weight="bold"
            >
              Back Explore
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            className="flex flex-row items-center rounded-full bg-dark py-4 px-[54px]"
            onPress={() => {
              navigate('Cart');
            }}
            activeOpacity={0.6}
          >
            <Text
              variant="sm"
              className="mx-auto uppercase text-light"
              weight="bold"
            >
              To Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export { AddedToCart };
