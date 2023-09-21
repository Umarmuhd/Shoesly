/* eslint-disable max-lines-per-function */
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, Bag2 } from 'iconsax-react-native';
import * as React from 'react';

import { useShoppingCart } from '@/context/shopping-cart';
import Star from '@/images/star.svg';
import type { RouteProp } from '@/navigation/types';
// import { usePost } from '@/api';
import {
  ActivityIndicator,
  FocusAwareStatusBar,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';
import colors from '@/ui/theme/colors';

import ProductReviewsList from '../reviews/review-list';
import { AddItemToCart } from './components/add-to-cart';
import { AddedToCart } from './components/added-to-cart';

export const Product = () => {
  const { params } = useRoute<RouteProp<'Product'>>();

  const { goBack, navigate } = useNavigation();

  const { data, isLoading, isError } = {
    data: {
      price: 299.99,
    },
    isLoading: false,
    isError: false,
  };
  // const { data, isLoading, isError } = usePost({
  //   variables: { id: params.id },
  // });

  console.log({ params, data });

  const { getItemQuantity } = useShoppingCart();
  const quantity = getItemQuantity(params.id);

  // ref
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = React.useMemo(() => ['25%', '40%'], []);

  // callbacks
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1  justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center">
        <FocusAwareStatusBar />
        <Text variant="md" className="text-center">
          Error loading product
        </Text>
      </View>
    );
  }

  return (
    <BottomSheetModalProvider>
      <View className="min-h-screen flex-1 bg-white px-6">
        <FocusAwareStatusBar />
        <View className="mt-4 flex flex-row items-center justify-between">
          <Pressable onPress={goBack} className="">
            <ArrowLeft size="24" color={colors.dark.DEFAULT} />
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('Cart');
            }}
            className=""
          >
            <Bag2 size="24" color={colors.dark.DEFAULT} />
          </Pressable>
        </View>
        <View className="mt-[30px] flex flex-col space-y-[30px]">
          <View className="">
            <Text className="mb-2.5 text-xl" weight="bold">
              Jordan 1 Retro High Tie DyeText
            </Text>
            <View className="flex flex-row space-x-[5px] text-cyan-700">
              <Star width={12} height={12} fill={'#FCD240'} />
              <Star width={12} height={12} fill={'#FCD240'} />
              <Star width={12} height={12} fill={'#FCD240'} />
              <Star width={12} height={12} fill={'#FCD240'} />
              <Star width={12} height={12} fill={'#F3F3F3'} />

              <Text className="text-[11px] leading-[14px]" weight="bold">
                4.5
              </Text>
              <Text className="text-[11px] leading-[14px] text-light-300">
                (1045 Reviews)
              </Text>
            </View>
          </View>
          <View className="">
            <Text variant="md" className="font-semibold">
              Size
            </Text>
          </View>
          <View className="">
            <Text variant="md" className="mb-2.5 font-semibold">
              Description
            </Text>
            <Text variant="sm" className="text-light-400">
              Engineered to crush any movement-based workout, these On sneakers
              enhance the label's original Cloud sneaker with cutting edge
              technologies for a pair.
            </Text>
          </View>
          <View className="flex">
            <Text variant="md" className="mb-2.5 font-semibold">
              Review (1045)
            </Text>
            <View className="h-80">
              <ProductReviewsList />
              <TouchableOpacity
                className="flex flex-row items-center rounded-full border border-light-200 py-4"
                onPress={() => {
                  navigate('ProductReviews', { id: 'params.id' });
                }}
                activeOpacity={0.6}
              >
                <Text
                  variant="sm"
                  className="mx-auto uppercase text-dark"
                  weight="bold"
                >
                  See All Review
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="mt-auto mb-0 flex flex-row justify-between bg-white py-4">
          <View className="flex flex-col">
            <Text
              variant="xs"
              className="mb-[5px] text-light-300"
              weight="bold"
            >
              Price
            </Text>
            <Text variant="xl" className="text-dark" weight="bold">
              $235.00
            </Text>
          </View>
          <View>
            <TouchableOpacity
              className="flex flex-row items-center rounded-full bg-dark py-4 px-8"
              onPress={handlePresentModalPress}
              activeOpacity={0.6}
            >
              <Text
                variant="sm"
                className="mx-auto uppercase text-light"
                weight="bold"
              >
                ADD TO CART
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          {quantity > 0 ? (
            <AddedToCart quantity={quantity} />
          ) : (
            <AddItemToCart
              productId={params.id}
              quantity={quantity}
              price={data.price}
            />
          )}
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};
