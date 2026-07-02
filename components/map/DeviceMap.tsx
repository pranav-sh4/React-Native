import React, { useRef } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { CustomCallout } from './CustomCallout';
import { Device } from '../../constants/Devices';

interface DeviceMapProps {
  devices: Device[];
  initialRegion?: Region;
}

// Fallback to Bengaluru if no initial region is provided
const DEFAULT_REGION: Region = {
  latitude: 12.9748,
  longitude: 77.5988,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export function DeviceMap({ devices, initialRegion = DEFAULT_REGION }: DeviceMapProps) {
  const mapRef = useRef<MapView>(null);

  return (
    <View className="flex-1 overflow-hidden rounded-xl bg-gray-100">
      <MapView
        ref={mapRef}
        className="w-full h-full"
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
        showsUserLocation={true} // Set to true if utilizing expo-location
        zoomEnabled={true}
        pitchEnabled={true}
        scrollEnabled={true}
      >
        {devices.map((device) => (
          <Marker
            key={device.id}
            coordinate={{
              latitude: device.latitude,
              longitude: device.longitude,
            }}
          >
            <CustomCallout device={device} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}