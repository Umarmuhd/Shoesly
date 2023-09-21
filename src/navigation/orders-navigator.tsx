import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import CartScreen from '@/screens/cart/list';
import OrderSummaryScreen from '@/screens/orders/order';

export type OrderStackParamList = {
  Cart: undefined;
  OrderSummary: { id: string };
};

const Stack = createNativeStackNavigator<OrderStackParamList>();

export const OrderNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
    </Stack.Navigator>
  );
};
