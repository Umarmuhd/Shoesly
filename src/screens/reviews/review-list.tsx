import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { EmptyList, Text, View } from '@/ui';

import { ProductReviewCard } from './review-card';

const sample = [
  {
    id: '1',
    user: {
      name: 'Nolan Carder',
      avatar: require('../../../assets/images/users/nolan-carder.png'),
    },
    content: 'Perfect for keeping your feet dry and warm in damp conditions.',
    rating: 5,
    date_time: '2023-09-19T20:12:29.808Z',
  },
  {
    id: '2',
    user: {
      name: 'Maria Saris',
      avatar: require('../../../assets/images/users/maria-saris.png'),
    },
    content: 'Perfect for keeping your feet dry and warm in damp conditions.',
    rating: 5,
    date_time: '2023-09-19T20:12:29.808Z',
  },
  {
    id: '3',
    user: {
      name: 'Gretchen Septimus',
      avatar: require('../../../assets/images/users/gretchen-septimus.png'),
    },
    content: 'Perfect for keeping your feet dry and warm in damp conditions.',
    rating: 5,
    date_time: '2023-09-19T20:12:29.808Z',
  },
];

export default function ProductReviewsList() {
  const { data, isLoading, isError } = {
    data: sample,
    isLoading: false,
    isError: false,
  };

  const { navigate } = useNavigation();

  console.log({ navigate });

  // const renderItem = React.useCallback(
  //   ({ item }: { item: Review }) => <ProductReviewCard {...item} />,
  //   []
  // );

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }

  return (
    <View className="flex">
      <FlashList
        data={data}
        // renderItem={renderItem}
        renderItem={({ item }) => <ProductReviewCard {...item} />}
        keyExtractor={(_, index) => `review-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={36}
      />
    </View>
  );
}
