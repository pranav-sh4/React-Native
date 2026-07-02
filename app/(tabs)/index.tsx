import React, { useRef, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_DEFAULT } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

import { mockDevices } from '../../constants/Devices';

const INITIAL_REGION = {
  latitude: 12.92,
  longitude: 76.2, 
  latitudeDelta: 3.5, 
  longitudeDelta: 3.5,
};

export default function DeviceMapScreen() {
  const mapRef = useRef<MapView>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDevices = useMemo(() => {
    if (!searchQuery.trim()) return mockDevices;
    
    const query = searchQuery.toLowerCase();
    return mockDevices.filter(
      (device) => 
        device.name.toLowerCase().includes(query) || 
        device.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
    Keyboard.dismiss();
  };

  return (
    <View className="flex-1 bg-gray-50">
      
      <View className="absolute top-14 left-4 right-4 z-10 flex-row items-center bg-white rounded-full px-4 py-3 shadow-lg shadow-black/10 border border-gray-100">
        <Ionicons name="search" size={22} color="#6b7280" />
        <TextInput
          className="flex-1 ml-3 text-base text-gray-800"
          placeholder="Search devices by name or ID..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close-circle" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-1 relative overflow-hidden">
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_DEFAULT}
          initialRegion={INITIAL_REGION}
          showsUserLocation={false}
          zoomEnabled={true}
        >
          {filteredDevices.map((device) => (
            <Marker
              key={device.id}
              coordinate={{
                latitude: device.latitude,
                longitude: device.longitude,
              }}
            >
              <Callout tooltip>
                <View className="bg-white rounded-lg p-3 min-w-[150px] shadow-md border border-gray-100">
                  <Text className="font-bold text-sm text-gray-800 mb-1">
                    {device.name}
                  </Text>
                  <Text className="text-xs text-gray-500">ID: {device.id}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
      
      {filteredDevices.length === 0 && (
        <View className="absolute bottom-10 self-center bg-gray-800 px-6 py-3 rounded-full shadow-lg">
          <Text className="text-white font-medium text-sm">No devices found</Text>
        </View>
      )}

    </View>
  );
}