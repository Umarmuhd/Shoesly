import React from 'react';

import type { Product } from '@/api/products/types';
import Star from '@/images/star.svg';
// import { storage } from '@/libs/firebase';
import { Image, Pressable, Text, View } from '@/ui';

type Props = Product & { onPress?: () => void };

export const ProductCard = ({
  name,
  price,
  // brand,
  image,
  avg_rating,
  num_of_reviews,
  onPress = () => {},
}: Props) => {
  // const [brandImage, setBrandImage] = useState('');
  // console.log({ brandImage, brand });

  // useEffect(() => {
  //   getDownloadURL(ref(storage, brand.logo)).then((res) => {
  //     console.log(res);
  //     setBrandImage(res);
  //   });
  // }, [brand.logo]);

  return (
    <Pressable className="block overflow-hidden shadow-xl" onPress={onPress}>
      <View className="flex h-[150px] w-full flex-row items-center justify-center overflow-hidden rounded-[20px] bg-dark/5">
        <Image
          className="relative h-[80px] w-[120px] object-cover"
          source={image}
        />
      </View>

      <View className="mt-2.5">
        <Text variant="xs" numberOfLines={1} className="mb-[5px]">
          {name}
        </Text>
        <View className="flex flex-row space-x-[5px]">
          <Star width={12} height={12} fill={'#FCD240'} />
          <Text className="text-[11px] leading-[14px]" weight="bold">
            {avg_rating}
          </Text>
          <Text className="text-[11px] leading-[14px] !text-light-300">
            ({num_of_reviews} Reviews)
          </Text>
        </View>
        <Text variant="sm" className="" weight="bold" numberOfLines={1}>
          ${price}
        </Text>
      </View>
    </Pressable>
  );
};
