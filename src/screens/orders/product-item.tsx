import React from 'react';

import { Text, View } from '@/ui';

type Product = {
  name: string;
  price: number;
};

export function ProductItem(product: Product) {
  const { name, price } = product;
  return (
    <View>
      <Text className="mb-2.5 font-semibold">{name}</Text>
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
            Qty 1
          </Text>
        </View>
        <Text variant="sm" className="leading-6" weight="bold">
          ${price}.00
        </Text>
      </View>
    </View>
  );
}
