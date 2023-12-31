// In Text.tsx
import { styled } from 'nativewind';
import React from 'react';
import type { TextProps } from 'react-native';
import { StyleSheet, Text as NNText } from 'react-native';

import type { TxKeyPath } from '@/core';
import { isRTL, translate } from '@/core';

const SText = styled(NNText);

interface Props extends TextProps {
  variant?: keyof typeof textVariants;
  className?: string;
  tx?: TxKeyPath;
  weight?: 'bold' | 'normal';
}

export const textVariants = {
  defaults: 'text-base text-dark dark:text-white font-urbanist font-normal',
  h1: 'text-[30px] leading-[45px]',
  h2: 'text-[28px] leading-[42px] font-medium',
  h3: 'text-[24px] leading-[36px] font-medium',
  xl: 'text-[20px] leading-[30px]',
  lg: 'text-[18px] leading-[26px]',
  md: '',
  sm: 'text-[14px] leading-[21px]',
  xs: 'text-[12px] leading-[18px]',
  error: ' text-[12px] leading-[30px] text-danger-500',
};

export const Text = ({
  variant = 'md',
  className = '',
  weight = 'normal',
  style,
  tx,
  children,
  ...props
}: Props) => {
  const content = tx ? translate(tx) : children;
  return (
    <SText
      className={`
      ${textVariants.defaults}
      ${textVariants[variant]}
      ${className}
    `}
      style={StyleSheet.flatten([
        { fontFamily: weight === 'bold' ? 'UrbanistBold' : 'Urbanist' },
        { writingDirection: isRTL ? 'rtl' : 'ltr' },
        style,
      ])}
      {...props}
    >
      {content}
    </SText>
  );
};
