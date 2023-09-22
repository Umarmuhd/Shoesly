import React from 'react';

import { type CartItem, useShoppingCart } from '@/context/shopping-cart';
import { formatCurrency } from '@/libs/utils';
import { Text, View } from '@/ui';

export function ProductItem({ id, quantity }: CartItem) {
  const { products } = useShoppingCart();

  const item = products.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <View>
      <Text className="mb-2.5 font-semibold">{item.name}</Text>
      <View className="flex w-full flex-row justify-between">
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
          <Text variant="sm" className="leading-6 text-secondary">
            .
          </Text>
          <Text variant="sm" className="leading-6 text-secondary">
            Qty {Number(quantity)}
          </Text>
        </View>
        <Text variant="sm" className="leading-6" weight="bold">
          {formatCurrency(item.price * quantity)}
        </Text>
      </View>
    </View>
  );
}
