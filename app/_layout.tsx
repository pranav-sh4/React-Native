import '../global.css';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CircleUserRound } from 'lucide-react-native';

export default function Layout() {
  const router = useRouter();

  return (
    <>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <Stack screenOptions={{ 
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerShadowVisible: true,
        headerTintColor: '#18181B',
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: '#FAFAFA' }
      }}>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'SnapNote',
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => router.push('/profile')} 
                activeOpacity={0.7}
                className="mr-2 p-1 rounded-full bg-zinc-50 border border-zinc-200"
              >
                <CircleUserRound size={22} color="#52525B" />
              </TouchableOpacity>
            )
          }} 
        />
        <Stack.Screen name="create" options={{ title: 'New Note', presentation: 'modal' }} />
        <Stack.Screen name="[id]" options={{ title: 'Note Details' }} />
        <Stack.Screen name="profile" options={{ title: 'Developer Profile', presentation: 'modal' }} />
      </Stack>
    </>
  );
}