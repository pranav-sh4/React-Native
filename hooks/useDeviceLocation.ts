import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface LocationState {
  location: Location.LocationObject | null;
  errorMsg: string | null;
  isLoading: boolean;
}

export function useDeviceLocation() {
  const [state, setState] = useState<LocationState>({
    location: null,
    errorMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setState(prev => ({ ...prev, errorMsg: 'Permission to access location was denied', isLoading: false }));
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setState({ location, errorMsg: null, isLoading: false });
      } catch (error) {
        setState(prev => ({ ...prev, errorMsg: 'Failed to fetch location', isLoading: false }));
      }
    }

    getCurrentLocation();
  }, []);

  return state;
}