import React from 'react';

import { Text, View } from '@/ui';

export function ProductReviewCard({ content }: { content: string }) {
  return (
    <View className="h-5 w-5">
      <Text>{content}</Text>
    </View>
  );
}
