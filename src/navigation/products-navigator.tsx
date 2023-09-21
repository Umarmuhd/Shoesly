import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Discover, Product } from '@/screens/products';
import ProductsFilterScreen from '@/screens/products/filter';

export type ProductStackParamList = {
  Discover: undefined;
  Product: { id: string };
  ProductFilter: undefined;
};

const Stack = createNativeStackNavigator<ProductStackParamList>();

// const GoToAddPost = () => {
//   const { navigate } = useNavigation();
//   return (
//     <Pressable onPress={() => navigate('AddPost')} className="p-2">
//       <Text className="text-primary-300">Create</Text>
//     </Pressable>
//   );
// };

export const ProductNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="Product" component={Product} />

      <Stack.Screen name="ProductFilter" component={ProductsFilterScreen} />
    </Stack.Navigator>
  );
};
