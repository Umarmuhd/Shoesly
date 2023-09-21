import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { useAuth } from '@/core';
import { useIsFirstTime } from '@/core/hooks';
import { AddPost, Discover, Feed, Post, ProductScreen } from '@/screens';
import CartScreen from '@/screens/cart/list';
import OrderSummaryScreen from '@/screens/orders/order';
import ProductsFilterScreen from '@/screens/products/filter';
import { ProductReviewsScreen } from '@/screens/reviews';

import { NavigationContainer } from './navigation-container';

export type StackParamList = {
  Discover: undefined;
  Product: { id: string };
  ProductFilter: undefined;
  ProductReviews: { id: string };
  Cart: undefined;
  OrderSummary: { id: string };

  //
  Feed: undefined;
  Post: { id: number };
  AddPost: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export const Root = () => {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = React.useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      hideSplash();
    }
  }, [hideSplash, status]);

  console.log({ isFirstTime });

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
      }}
    >
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="ProductFilter" component={ProductsFilterScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="ProductReviews" component={ProductReviewsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      {/*  */}
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="AddPost" component={AddPost} />
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};
