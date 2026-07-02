import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5 bg-white">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Screen not found
        </Text>
        <Text className="text-base text-gray-500 mb-6 text-center">
          The page you are looking for doesn't exist or has been moved.
        </Text>
        
        <Link href="/(tabs)" className="mt-4 py-3 px-6 bg-blue-600 rounded-lg shadow-sm">
          <Text className="text-white font-semibold text-base">
            Go back to Map
          </Text>
        </Link>
      </View>
    </>
  );
}