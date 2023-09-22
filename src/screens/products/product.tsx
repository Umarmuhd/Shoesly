/* eslint-disable max-lines-per-function */
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft, Bag2 } from 'iconsax-react-native';
import * as React from 'react';

import type { Product } from '@/api/products/types';
import { useShoppingCart } from '@/context/shopping-cart';
import Star from '@/images/star.svg';
import { db } from '@/libs/firebase';
import { formatCurrency } from '@/libs/utils';
import type { RouteProp } from '@/navigation/types';
// import { usePost } from '@/api';
import {
  ActivityIndicator,
  FocusAwareStatusBar,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';
import colors from '@/ui/theme/colors';

import ProductReviewsList from '../reviews/review-list';
import { AddItemToCart } from './components/add-to-cart';
import { AddedToCart } from './components/added-to-cart';

const IMAGE_WIDTH = 290;

export const ProductScreen = () => {
  const { params } = useRoute<RouteProp<'Product'>>();
  const { cartItems } = useShoppingCart();

  const { goBack, navigate } = useNavigation();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [product, setProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    const docRef = doc(db, 'products', params.id);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          setProduct(docSnap.data() as Product);
        } else {
          throw new Error('No such document!');
        }
      } catch (err) {
        console.log('Error getting document:', err);
        setError('Error fetching data!');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  console.log({ params, product });

  console.log(product?.reviews);

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

  if (error) {
    return (
      <View className="flex-1 justify-center">
        <FocusAwareStatusBar />
        <Text variant="md" className="text-center">
          {error}
        </Text>
      </View>
    );
  }

  if (!product) return null;

  return (
    <BottomSheetModalProvider>
      <View className="min-h-screen flex-1 bg-white px-6">
        <FocusAwareStatusBar />
        <View className="mt-4 mb-10 flex flex-row items-center justify-between">
          <Pressable onPress={goBack} className="">
            <ArrowLeft size="24" color={colors.dark.DEFAULT} />
          </Pressable>
          <Pressable onPress={() => navigate('Cart')} className="relative">
            {cartItems.length > 0 && (
              <View className="absolute top-1 right-0 z-10 h-2 w-2 rounded-full bg-danger" />
            )}
            <Bag2 size="24" color={colors.dark.DEFAULT} />
          </Pressable>
        </View>
        <ScrollView className="flex" showsVerticalScrollIndicator={false}>
          <View className="relative mb-[30px]">
            <Image
              style={{
                height: IMAGE_WIDTH,
              }}
              source={product?.image}
              className="relative w-full object-contain"
            />
          </View>
          <View className="flex flex-col space-y-[30px]">
            <View className="">
              <Text className="mb-2.5 text-xl" weight="bold">
                {product?.name}
              </Text>
              <View className="flex flex-row space-x-[5px] text-cyan-700">
                <Star width={12} height={12} fill={'#FCD240'} />
                <Star width={12} height={12} fill={'#FCD240'} />
                <Star width={12} height={12} fill={'#FCD240'} />
                <Star width={12} height={12} fill={'#FCD240'} />
                <Star width={12} height={12} fill={'#F3F3F3'} />

                <Text className="text-[11px] leading-[14px]" weight="bold">
                  {product.avg_rating}
                </Text>
                <Text className="text-[11px] leading-[14px] text-light-300">
                  ({product.num_of_reviews} Reviews)
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
                {product?.description}
              </Text>
            </View>
            {product.reviews?.length && (
              <View className="flex">
                <Text variant="md" className="mb-2.5 font-semibold">
                  Review ({product.num_of_reviews})
                </Text>
                <View className="h-80">
                  <ProductReviewsList reviews={product?.reviews ?? []} />
                  <TouchableOpacity
                    className="flex flex-row items-center rounded-full border border-light-200 py-4"
                    onPress={() => {
                      navigate('ProductReviews', { id: params.id });
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
            )}
          </View>
        </ScrollView>
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
              {formatCurrency(product?.price ?? 0)}
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
              price={product?.price ?? 0}
            />
          )}
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};
