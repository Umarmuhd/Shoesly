import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Trash } from 'iconsax-react-native';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import Swipelist from 'react-native-swipeable-list-view';

import { colors, Image, Pressable, Text, TouchableOpacity, View } from '@/ui';
import { CounterInput } from '@/ui/core/input/counter-input';

const data = [
  {
    name: 'Javascript',
  },
  {
    name: 'React Native',
  },
  {
    name: 'Swift',
  },
];

// eslint-disable-next-line max-lines-per-function
export default function CartScreen() {
  const { goBack, navigate } = useNavigation();
  return (
    <View
      className="min-h-screen flex-1 bg-white px-6"
      style={{ maxWidth: '100%' }}
    >
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
          data={data}
          renderRightItem={(data, index) => (
            <View key={index} className="my-2.5 flex flex-row">
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
                <View className="flex w-full max-w-[100%] flex-row items-center justify-between pr-[30px]">
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
          renderHiddenItem={(data, index) => (
            <View key={index} className="flex flex-row">
              <TouchableOpacity
                style={[styles.rightAction, { backgroundColor: 'red' }]}
                onPress={() => {
                  Alert.alert('Delete?', data.name);
                }}
                className="h-full rounded-l-[20px]"
              >
                <Trash size={25} color={colors.light.DEFAULT} />
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={80}
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

const styles = StyleSheet.create({
  container: {},

  rightAction: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
