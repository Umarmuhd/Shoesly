import React from 'react';

import Star from '@/images/star.svg';
import { Image, Text, View } from '@/ui';

export function ProductReviewCard({
  content,
  name,
  avatar,
}: {
  content: string;
  name: string;
  avatar: string;
}) {
  return (
    <View className="mb-4 flex w-full flex-row">
      <View className="relative h-10 w-10">
        <Image
          source={avatar}
          alt="..."
          className="relative h-full w-full rounded-full object-cover"
        />
      </View>
      <View className="ml-4">
        <View className="mb-[5px] flex w-full flex-row justify-between">
          <Text variant="sm" weight="bold">
            {name}
          </Text>
          <Text variant="xs">Today</Text>
        </View>
        <View className="mb-2.5 flex flex-row items-center space-x-[5px]">
          <Star width={12} height={12} fill={'#FCD240'} />
          <Star width={12} height={12} fill={'#FCD240'} />
          <Star width={12} height={12} fill={'#FCD240'} />
          <Star width={12} height={12} fill={'#FCD240'} />
          <Star width={12} height={12} fill={'#FCD240'} />
        </View>
        <Text variant="sm" className="text-dark">
          {content}
        </Text>
      </View>
    </View>
  );
}
