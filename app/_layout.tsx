// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/use-color-scheme';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

// app/_layout.tsx
import '../global.css';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

export default function Layout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#ffffff' },
      headerShadowVisible: false,
      headerTintColor: '#111827'
    }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'SnapNote',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/profile')} activeOpacity={0.7}>
              <Text className="text-blue-600 font-medium text-base mr-2">Profile</Text>
            </TouchableOpacity>
          )
        }} 
      />
      <Stack.Screen 
        name="create" 
        options={{ title: 'New Note', presentation: 'modal' }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ title: 'Note Details' }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ title: 'About Developer', presentation: 'modal' }} 
      />
    </Stack>
  );
}