/* eslint-disable max-lines-per-function */
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft } from 'iconsax-react-native';
import React, { useState } from 'react';

import type { Review } from '@/api/reviews/types';
import Star from '@/images/star.svg';
import type { RouteProp } from '@/navigation/types';
import { colors, Pressable, Text, View } from '@/ui';

import ProductReviewsList from './review-list';
import ReviewFilter from './reviews-filter';

export const ProductReviewsScreen = () => {
  const { params } = useRoute<RouteProp<'ProductReviews'>>();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  console.log({ params });

  const filters = [
    {
      id: 'all',
      name: 'All',
    },
    {
      id: '5-star',
      name: '5 Star',
    },
    {
      id: '4-star',
      name: '4 Star',
    },
    {
      id: '3-star',
      name: '3 Star',
    },
    {
      id: '2-star',
      name: '2 Star',
    },
    {
      id: '1-star',
      name: '1 Star',
    },
  ];
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const { goBack } = useNavigation();

  return (
    <View className="min-h-screen bg-white px-6">
      <View className="mt-4 flex flex-row items-center justify-between">
        <Pressable onPress={goBack} className="">
          <ArrowLeft size="24" color={colors.dark.DEFAULT} />
        </Pressable>
        <View>
          <Text className="font-semibold text-dark">Reviews</Text>
        </View>
        <View className="flex flex-row gap-[5px]">
          <Star width={20} height={20} fill={'#FCD240'} />
          <Text variant="sm" className="text-dark" weight="bold">
            4.5
          </Text>
        </View>
      </View>
      <View className="my-[30px]">
        {/* filters */}
        <View>
          {filters.length > 0 && (
            <ReviewFilter
              filters={filters}
              activeFilter={activeFilter!}
              setActiveFilter={setActiveFilter}
            />
          )}
        </View>
      </View>
      <View className="flex-1">
        <ProductReviewsList reviews={[]} />
      </View>
    </View>
  );
};
