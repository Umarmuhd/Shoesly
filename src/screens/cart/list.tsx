import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'iconsax-react-native';
import React from 'react';
import Swipelist from 'react-native-swipeable-list-view';

import { useShoppingCart } from '@/context/shopping-cart';
import { formatCurrency } from '@/libs/utils';
import { colors, Pressable, Text, TouchableOpacity, View } from '@/ui';

import { CartItem } from './components/cart-item';
import { HiddenItem } from './components/hidden-item';

export default function CartScreen() {
  const { goBack, navigate } = useNavigation();
  const { cartItems, products } = useShoppingCart();
  return (
    <View className="min-h-screen max-w-[100%] flex-1 bg-white px-6">
      <View className="mt-4 flex flex-row items-center justify-between">
        <Pressable onPress={goBack} className="">
          <ArrowLeft size="24" color={colors.dark.DEFAULT} />
        </Pressable>
        <View>
          <Text className="font-semibold text-dark">Cart</Text>
        </View>
        <View />
      </View>
      <View className="mt-[30px]">
        <Swipelist
          data={cartItems}
          renderRightItem={(item, index) => <CartItem key={index} {...item} />}
          renderHiddenItem={(data, i) => <HiddenItem key={i} {...data} />}
          rightOpenValue={80}
        />
      </View>
      <View className="mt-auto mb-0 flex flex-row justify-between bg-white py-4">
        <View className="flex flex-col">
          <Text variant="xs" className="mb-[5px] text-light-300">
            Grand Total
          </Text>
          <Text variant="xl" className="text-dark" weight="bold">
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = products.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            className="flex flex-row items-center rounded-full bg-dark py-4 px-8"
            onPress={() => {
              navigate('OrderSummary', { id: 'orderSummary' });
            }}
            activeOpacity={0.6}
          >
            <Text
              variant="sm"
              className="mx-auto uppercase text-light"
              weight="bold"
            >
              Check out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
