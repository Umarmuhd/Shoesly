import { FlashList } from '@shopify/flash-list';
import React from 'react';

import type { Review } from '@/api/reviews/types';
import { Text, View } from '@/ui';

import { ProductReviewCard } from './review-card';

export default function ProductReviewsList({ reviews }: { reviews: Review[] }) {
  const { isError } = {
    isError: false,
  };

  const renderItem = React.useCallback(
    ({ item }: { item: Review }) => <ProductReviewCard {...item} />,
    []
  );

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlashList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(_, index) => `review-${index}`}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={36}
      />
    </View>
  );
}
