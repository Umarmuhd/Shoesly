/* eslint-disable max-lines-per-function */
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft } from 'iconsax-react-native';
import React, { useMemo, useState } from 'react';

import type { Review } from '@/api/reviews/types';
import Star from '@/images/star.svg';
import { db } from '@/libs/firebase';
import type { RouteProp } from '@/navigation/types';
import { colors, Pressable, Text, View } from '@/ui';

import ProductReviewsList from './review-list';
import ReviewFilter from './reviews-filter';

export const ProductReviewsScreen = () => {
  const { params } = useRoute<RouteProp<'ProductReviews'>>();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [avgRating, setAvgRating] = useState(0);

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

  React.useEffect(() => {
    const docRef = doc(db, 'products', params.id);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          setAvgRating(docSnap.data().avg_rating);
          setReviews(docSnap.data().reviews as Review[]);
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

  const filtered = useMemo(() => {
    return reviews.filter((review) => {
      if (activeFilter.id === 'all') {
        return review;
      }
      return review.rating === parseInt(activeFilter.id.split('-')[0], 10);
    });
  }, [activeFilter, reviews]);

  if (error) {
    return (
      <View>
        <Text> {error} </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 flex-row items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

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
            {avgRating}
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
        <ProductReviewsList reviews={filtered} />
      </View>
    </View>
  );
};
