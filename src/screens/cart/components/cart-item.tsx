import React from 'react';

import { type CartItem, useShoppingCart } from '@/context/shopping-cart';
import products from '@/data/items.json';
import { formatCurrency } from '@/libs/utils';
import { Image, Text, View } from '@/ui';
import { CounterInput } from '@/ui/core/input/counter-input';

export function CartItem({ id, quantity }: CartItem) {
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();

  const item = products.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <View className="my-2.5 flex flex-row">
      <View className="relative h-[88px] w-[88px] overflow-hidden rounded-[20px] object-cover">
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          }}
          className="relative h-full w-full object-cover"
        />
      </View>
      <View className="ml-4 flex flex-1">
        <View className="mb-2.5">
          <Text className="mb-[5px] text-dark">{item.name}</Text>
          <View className="flex flex-row space-x-[5px]">
            <Text variant="sm" className="leading-6 text-secondary">
              Hello
            </Text>
            <Text variant="sm" className="leading-6 text-secondary">
              .
            </Text>
            <Text variant="sm" className="leading-6 text-secondary">
              Red Grey
            </Text>
            <Text variant="sm" className="leading-6 text-secondary">
              .
            </Text>
            <Text variant="sm" className="leading-6 text-secondary">
              40
            </Text>
          </View>
        </View>
        <View className="flex w-full max-w-[100%] flex-row items-center justify-between pr-[30px]">
          <Text variant="sm" className="text-dark" weight="bold">
            {formatCurrency(item.price * quantity)}
          </Text>
          <View>
            <CounterInput
              value={quantity}
              decrement={() => {
                decreaseCartQuantity(id);
              }}
              increment={() => {
                increaseCartQuantity(id);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
