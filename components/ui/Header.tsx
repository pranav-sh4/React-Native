import React from 'react';
import { View, Text } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <View className="px-4 py-3 bg-white border-b border-gray-200">
      <Text className="text-xl font-bold text-gray-800">{title}</Text>
      {subtitle && <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>}
    </View>
  );
}