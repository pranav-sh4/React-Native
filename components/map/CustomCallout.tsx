import React from 'react';
import { View, Text } from 'react-native';
import { Callout } from 'react-native-maps';
import { Device } from '../../constants/Devices';

interface CustomCalloutProps {
  device: Device;
}

export function CustomCallout({ device }: CustomCalloutProps) {
  return (
    <Callout tooltip>
      <View className="bg-white rounded-lg p-3 min-w-[150px] shadow-md border border-gray-100">
        <Text className="font-bold text-sm text-gray-800 mb-1">
          {device.name}
        </Text>
        <Text className="text-xs text-gray-500">
          ID: {device.id}
        </Text>
      </View>
    </Callout>
  );
}