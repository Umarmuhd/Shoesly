import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Trash } from 'iconsax-react-native';
import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';

import { colors, Image, Pressable, Text, TouchableOpacity, View } from '@/ui';
import { CounterInput } from '@/ui/core/input/counter-input';

const listViewData = Array(5)
  .fill('')
  .map((_, i) => ({ key: `${i}`, text: `item #${i}` }));

// eslint-disable-next-line max-lines-per-function
export default function CartScreen() {
  const { goBack, navigate } = useNavigation();
  return (
    <View className="flex-1 bg-white px-6">
      <View className="mt-2.5 flex flex-row items-center justify-between">
        <Pressable onPress={goBack} className="">
          <ArrowLeft size="24" color={colors.dark.DEFAULT} />
        </Pressable>
        <View>
          <Text className="font-semibold text-dark">Cart</Text>
        </View>
        <View />
      </View>
      <View className="mt-[30px] bg-fuchsia-500">
        <SwipeListView
          data={listViewData}
          renderItem={(_) => (
            <View className="flex flex-row gap-4 bg-white">
              <View className="relative h-[88px] w-[88px] overflow-hidden rounded-[20px] object-cover">
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
                  }}
                  className="relative h-full w-full object-cover"
                />
              </View>
              <View className=" bg-green-400">
                <View className="mb-2.5">
                  <Text className="mb-[5px] font-semibold text-dark">
                    Jordan 1 Retro High Tie Dye
                  </Text>
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
                </View>
                <View className="flex flex-row items-center justify-between">
                  <Text variant="sm" className="text-dark" weight="bold">
                    $235.00
                  </Text>
                  <View>
                    <CounterInput />
                  </View>
                </View>
              </View>
            </View>
          )}
          renderHiddenItem={(_) => (
            <View className="w-full bg-red-400 py-8 px-7">
              <Pressable onPress={() => {}}>
                <Trash size="24" color={colors.light.DEFAULT} />
              </Pressable>
            </View>
          )}
          leftOpenValue={-75}
          rightOpenValue={75}
          className="w-full bg-yellow-500"
          // eslint-disable-next-line react/no-unstable-nested-components
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      </View>
      <View className="mt-auto mb-0 flex flex-row justify-between bg-white py-4">
        <View className="flex flex-col">
          <Text variant="xs" className="mb-[5px] text-light-300">
            Grand Total
          </Text>
          <Text variant="xl" className="text-dark" weight="bold">
            $235.00
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
