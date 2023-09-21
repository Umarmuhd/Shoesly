import React from 'react';

import { Image, Text, View } from '@/ui';

export function ProductReviewCard({
  content,
  user,
}: {
  content: string;
  user: {
    name: string;
    avatar: string;
  };
}) {
  return (
    <View className="flex w-full flex-row">
      <View>
        <Image source={user.avatar} />
      </View>
      <View>
        <Text variant="sm" className="text-dark">
          {content}
        </Text>
      </View>
    </View>
  );
}
