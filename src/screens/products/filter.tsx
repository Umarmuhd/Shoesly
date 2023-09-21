/* eslint-disable max-lines-per-function */
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, TickCircle } from 'iconsax-react-native';
import React, { useState } from 'react';

import {
  colors,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

import { ColorFilter } from './filters/color';
import GenderFilter from './filters/gender';
import { SortByFilter } from './filters/sort-by';

const brands = [
  { id: '1', name: 'Jordan', logo: '@/images/brands/jordan.svg' },
  { id: '2', name: 'Nike', logo: '@/images/brands/nike.svg' },
  { id: '3', name: 'Puma', logo: '@/images/brands/puma.svg' },
  { id: '4', name: 'Adidas', logo: '@/images/brands/adidas.svg' },
  { id: '5', name: 'Reebok', logo: '@/images/brands/reebok.svg' },
];
const sortByFilters = [
  {
    id: 'most-recent',
    name: 'Most recent',
  },
  {
    id: 'lowest-price',
    name: 'Lowest price',
  },
  {
    id: 'highest-reviews',
    name: 'Highest reviews',
  },
];
const genders = [
  {
    id: 'unisex',
    name: 'Unisex',
  },
  {
    id: 'man',
    name: 'Man',
  },
  {
    id: 'woman',
    name: 'Woman',
  },
];
const colorsFilters = [
  {
    id: 'black',
    name: 'Black',
    code: '#000000',
  },
  {
    id: 'white',
    name: 'White',
    code: '#ffffff',
  },
  {
    id: 'red',
    name: 'Red',
    code: '#FF4C5E',
  },
  {
    id: 'blue',
    name: 'Blue',
    code: '#2952CC',
  },
];

const ProductsFilterScreen = () => {
  const { goBack } = useNavigation();
  const [activeGender, setActiveGender] = useState(genders[0].id);
  const [sortBy, setSortBy] = useState(sortByFilters[0].id);
  const [color, setColor] = useState(colorsFilters[0].id);
  // const [multiSliderValue, setMultiSliderValue] = React.useState([3, 7]);

  return (
    <View className="flex-1 bg-white px-6">
      <View className="mt-2.5 flex flex-row items-center justify-between">
        <Pressable onPress={goBack} className="p-2">
          <ArrowLeft size="24" color={colors.dark.DEFAULT} />
        </Pressable>
        <View>
          <Text className="font-semibold text-dark">Filter</Text>
        </View>
        <View />
      </View>
      <ScrollView
        className="mt-[30px] space-y-[30px]"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text variant="md" className="mb-5 font-semibold">
            Brands
          </Text>
          <View className="flex flex-row items-center justify-between space-x-2.5">
            {brands.map((brand) => (
              <View key={brand.id}>
                <View className="relative flex h-[50px] w-[50px] flex-row items-center justify-center rounded-full bg-light-100">
                  <Image source={brand.logo} className="h-6 w-6" />
                  <View className="absolute bottom-0 -right-2">
                    <TickCircle
                      size={24}
                      color={colors.dark.DEFAULT}
                      variant="Bold"
                    />
                  </View>
                </View>
                <View className="mt-2.5 flex flex-col items-center">
                  <Text
                    variant="sm"
                    className="uppercase text-dark"
                    weight="bold"
                  >
                    {brand.name}
                  </Text>
                  <Text className="text-[11px] leading-[13px] text-light-300">
                    1001 Items
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* <View>
          <Text variant="md" className="mb-5 font-semibold">
            Price Range
          </Text>
          <ScrollView
          scrollEnabled={this.state.scrollEnabled}
          >
            <MultiSlider
              values={[multiSliderValue[0], multiSliderValue[1]]}
              sliderLength={250}
              onValuesChange={multiSliderValuesChange}
              min={0}
              max={10}
              step={1}
              allowOverlap
              snapped
              customLabel={CustomLabel}
            />
          </ScrollView>
        </View> */}
        <View>
          <Text variant="md" className="mb-5 font-semibold">
            Sort By
          </Text>
          <SortByFilter
            filters={sortByFilters}
            activeFilter={sortBy}
            setActiveFilter={setSortBy}
          />
        </View>
        <View>
          <Text variant="md" className="mb-5 font-semibold">
            Gender
          </Text>
          <GenderFilter
            filters={genders}
            activeFilter={activeGender}
            setActiveFilter={setActiveGender}
          />
        </View>
        <View>
          <Text variant="md" className="mb-5 font-semibold">
            Color
          </Text>
          <ColorFilter
            filters={colorsFilters}
            activeFilter={color}
            setActiveFilter={setColor}
          />
        </View>
      </ScrollView>
      <View className="mt-auto mb-0 flex flex-row justify-between bg-white py-4">
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
              Reset (4)
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
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductsFilterScreen;
