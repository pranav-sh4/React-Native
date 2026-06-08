import 'react-native-reanimated';
import '../global.css';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#f8fafc' } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="scanner" 
          options={{ 
            presentation: 'modal', 
            headerShown: true, 
            title: 'Scan QR / Barcode' 
          }} 
        />
        <Stack.Screen 
          name="product/[id]" 
          options={{ 
            headerShown: true, 
            title: 'Product Details',
            headerBackTitle: 'Back'
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}