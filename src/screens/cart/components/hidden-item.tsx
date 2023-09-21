import { Trash } from 'iconsax-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

import type { CartItem } from '@/context/shopping-cart';
import { useShoppingCart } from '@/context/shopping-cart';
import { TouchableOpacity, View } from '@/ui';
import colors from '@/ui/theme/colors';

export function HiddenItem({ id, quantity }: CartItem) {
  console.log({ id, quantity });

  const { removeFromCart } = useShoppingCart();

  return (
    <View className="flex flex-row">
      <TouchableOpacity
        style={[styles.rightAction, { backgroundColor: colors.danger.DEFAULT }]}
        onPress={() => removeFromCart(id)}
        className="h-full rounded-l-[20px]"
      >
        <Trash size={25} color={colors.light.DEFAULT} />
      </TouchableOpacity>
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
