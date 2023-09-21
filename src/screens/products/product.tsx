/* eslint-disable max-lines-per-function */
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, Bag2 } from 'iconsax-react-native';
import * as React from 'react';

import Star from '@/images/star.svg';
// import { usePost } from '@/api';
import {
  ActivityIndicator,
  FocusAwareStatusBar,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';
import colors from '@/ui/theme/colors';

import ProductReviewsList from '../reviews/review-list';

export const Product = () => {
  const { params } = useRoute();

  const { goBack, navigate } = useNavigation();

  const { data, isLoading, isError } = {
    data: {},
    isLoading: false,
    isError: false,
  };
  // const { data, isLoading, isError } = usePost({
  //   variables: { id: params.id },
  // });

  console.log({ params, data });

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
        <View className="mt-2.5 flex flex-row items-center justify-between">
          <Pressable onPress={goBack} className="p-2">
            <ArrowLeft size="24" color={colors.dark.DEFAULT} />
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('Cart');
            }}
            className="p-2"
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
          <View className="flex-1 items-center px-6">
            <View className="relative mb-5">
              <Image
                className="h-[100px] w-[100px]"
                source="@/images/tick-circle.svg"
              />
            </View>
            <View className="mb-[30px] flex w-full flex-col items-center gap-[5px]">
              <Text className="text-2xl text-dark" weight="bold">
                Added to cart
              </Text>
              <Text variant="sm">1 Item Total</Text>
            </View>
            <View className="mt-auto mb-0 flex w-full flex-row justify-between bg-white py-4">
              <View className="">
                <TouchableOpacity
                  className="flex flex-row items-center rounded-full border border-light-200 bg-transparent py-4 px-[42.5px]"
                  onPress={() => {}}
                  activeOpacity={0.6}
                >
                  <Text
                    variant="sm"
                    className="mx-auto uppercase text-dark"
                    weight="bold"
                  >
                    Back Explore
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  className="flex flex-row items-center rounded-full bg-dark py-4 px-[54px]"
                  onPress={() => {}}
                  activeOpacity={0.6}
                >
                  <Text
                    variant="sm"
                    className="mx-auto uppercase text-light"
                    weight="bold"
                  >
                    To Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <View className="flex-1 px-6">
            <View className="mb-[30px] flex w-full flex-row justify-between">
              <Text variant="xl" className="text-dark"
              weight="bold"
              
              >
                Add to cart
              </Text>
              <Pressable onPress={() => {}} className="rotate-45 p-2">
                <Add size="18" color={colors.dark.DEFAULT} />
              </Pressable>
            </View>
            <Text variant="sm" className="text-dark mb-2.5"
              weight="bold"
            
            >
              Quantity
            </Text>
            <View className="relative mb-[30px]">
              <Input className="py-0" keyboardType="number-pad" label="" />
              <View className="absolute right-0 bottom-2 z-10 flex flex-row items-center space-x-5 bg-white">
                <Pressable onPress={() => {}} className="p-2">
                  <MinusCirlce size="24" color={colors.dark.DEFAULT} />
                </Pressable>
                <Pressable onPress={() => {}} className="p-2">
                  <AddCircle size="24" color={colors.dark.DEFAULT} />
                </Pressable>
              </View>
            </View>
            <View className="bg-dark h-px" />
            <View className=" flex flex-row justify-between bg-white py-4">
              <View className="flex flex-col">
                <Text variant="xs" className="text-light-300 mb-[5px]">
                  Price
                </Text>
                <Text variant="xl" className="text-dark"
              weight="bold"
                
                >
                  $235.00
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  className="bg-dark flex flex-row items-center rounded-full py-4 px-8"
                  onPress={handlePresentModalPress}
                  activeOpacity={0.6}
                >
                  <Text
                    variant="sm"
                    className="text-light mx-auto uppercase"
              weight="bold"

                  >
                    ADD TO CART
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};
