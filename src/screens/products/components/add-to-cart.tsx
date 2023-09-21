/* eslint-disable max-lines-per-function */
import { Add, AddCircle, MinusCirlce } from 'iconsax-react-native';
import React, { useState } from 'react';

import { useShoppingCart } from '@/context/shopping-cart';
import { formatCurrency } from '@/libs/utils';
import { colors, Input, Pressable, Text, TouchableOpacity, View } from '@/ui';

type Props = {
  productId: string;
  quantity: number;
  price: number;
};

function AddItemToCart({ productId, quantity, price }: Props) {
  const [count, setCount] = useState(quantity || 0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleInputChange = (text: string) => {
    // Check if the input is a valid number
    const newValue = parseInt(text);
    if (!isNaN(newValue)) {
      setCount(newValue);
    }
  };

  const { updateCartItemQuantity } = useShoppingCart();

  return (
    <View className="flex-1 px-6">
      <View className="mb-[30px] flex w-full flex-row justify-between">
        <Text variant="xl" className="text-dark" weight="bold">
          Add to cart
        </Text>
        <Pressable onPress={() => {}} className="rotate-45 p-2">
          <Add size="18" color={colors.dark.DEFAULT} />
        </Pressable>
      </View>
      <Text variant="sm" className="mb-2.5 text-dark" weight="bold">
        Quantity
      </Text>
      <View className="relative mb-[30px]">
        <Input
          className="py-0"
          keyboardType="numeric"
          label=""
          value={count.toString()}
          onChangeText={handleInputChange} // Handle input change
        />
        <View className="absolute right-0 bottom-2 z-10 flex flex-row items-center space-x-5 bg-white">
          <Pressable onPress={decrement} className="p-2">
            <MinusCirlce size="24" color={colors.dark.DEFAULT} />
          </Pressable>
          <Pressable onPress={increment} className="p-2">
            <AddCircle size="24" color={colors.dark.DEFAULT} />
          </Pressable>
        </View>
      </View>
      <View className="h-px bg-dark" />
      <View className=" flex flex-row justify-between bg-white py-4">
        <View className="flex flex-col">
          <Text variant="xs" className="mb-[5px] text-light-300">
            Price
          </Text>
          <Text variant="xl" className="text-dark" weight="bold">
            {formatCurrency(price * count)}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            className="flex flex-row items-center rounded-full bg-dark py-4 px-8"
            onPress={() => {
              updateCartItemQuantity(productId, count);
            }}
            activeOpacity={0.6}
          >
            <Text
              variant="sm"
              className="mx-auto uppercase text-light"
              weight="bold"
            >
              ADD TO CART
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export { AddItemToCart };
