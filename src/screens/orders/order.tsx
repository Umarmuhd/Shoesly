/* eslint-disable max-lines-per-function */
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, ArrowRight2 } from 'iconsax-react-native';
import * as React from 'react';

import { useShoppingCart } from '@/context/shopping-cart';
import products from '@/data/items.json';
import { formatCurrency } from '@/libs/utils';
import { Pressable, Text, TouchableOpacity, View } from '@/ui';
import colors from '@/ui/theme/colors';

import { ProductItem } from './product-item';

function OrderSummaryScreen() {
  const { goBack } = useNavigation();
  const { cartItems } = useShoppingCart();

  const subTotal = cartItems.reduce((total, cartItem) => {
    const item = products.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const shipment = 0;

  return (
    <View className="flex-1 bg-white px-6">
      <View className="mt-2.5 flex flex-row items-center justify-between">
        <Pressable onPress={goBack} className="">
          <ArrowLeft size="24" color={colors.dark.DEFAULT} />
        </Pressable>
        <View>
          <Text className="font-semibold text-dark">Order Summary</Text>
        </View>
        <View />
      </View>
      <View className="mt-[30px] space-y-[30px]">
        <View>
          <Text variant="lg" className="mb-5 text-dark" weight="bold">
            Information
          </Text>
          <View>
            <View className="flex flex-row items-center justify-between">
              <View className="">
                <Text variant="sm" className="mb-[5px] text-dark" weight="bold">
                  Payment Method
                </Text>
                <Text variant="sm" className="text-secondary">
                  Credit Card
                </Text>
              </View>
              <Pressable onPress={() => {}} className="p-2">
                <ArrowRight2 size="16" color={colors.dark.DEFAULT} />
              </Pressable>
            </View>
            <View className="my-5 h-px bg-light-100" />
            <View className="flex flex-row items-center justify-between">
              <View className="">
                <Text variant="sm" className="mb-[5px] text-dark" weight="bold">
                  Location
                </Text>
                <Text variant="sm" className="text-secondary">
                  Semarang, Indonesia
                </Text>
              </View>
              <Pressable onPress={() => {}} className="p-2">
                <ArrowRight2 size="16" color={colors.dark.DEFAULT} />
              </Pressable>
            </View>
          </View>
        </View>
        <View>
          <Text variant="lg" className="mb-5 text-dark" weight="bold">
            Order Detail
          </Text>
          <View className="space-y-5">
            {cartItems.map((item, index) => (
              <ProductItem key={index} {...item} />
            ))}
          </View>
        </View>
        <View>
          <Text variant="lg" className="mb-5 text-dark" weight="bold">
            Payment Detail
          </Text>
          <View className="flex flex-col gap-5">
            <View className="flex flex-row justify-between">
              <Text variant="sm" className="text-secondary">
                Sub Total
              </Text>
              <Text className="font-semibold text-dark">
                {formatCurrency(subTotal)}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text variant="sm" className="text-secondary">
                Shipping
              </Text>
              <Text className="font-semibold text-dark">
                {formatCurrency(shipment)}
              </Text>
            </View>
            <View className="h-px bg-light-100" />
            <View className="flex flex-row justify-between">
              <Text variant="sm" className="text-secondary">
                Total Order
              </Text>
              <Text variant="lg" className="text-dark" weight="bold">
                {formatCurrency(subTotal + shipment)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-auto mb-0 flex flex-row justify-between bg-white py-4">
        <View className="flex flex-col">
          <Text variant="xs" className="mb-[5px] text-light-300">
            Grand Total
          </Text>
          <Text variant="xl" className="text-dark" weight="bold">
            {formatCurrency(subTotal + shipment)}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            className="flex flex-row items-center rounded-full bg-dark py-4 px-8"
            onPress={() => {}}
            activeOpacity={0.6}
          >
            <Text
              variant="sm"
              className="mx-auto uppercase text-light"
              weight="bold"
            >
              PAYMENT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default OrderSummaryScreen;
