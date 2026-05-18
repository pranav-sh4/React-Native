import { View, Text } from 'react-native';
import { Code2, Server, Briefcase } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-[#FAFAFA] items-center pt-12 px-6">
      <View className="bg-white p-8 rounded-3xl w-full max-w-sm border border-zinc-200 items-center" style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 }}>
        
        <View className="w-20 h-20 bg-zinc-900 rounded-2xl items-center justify-center mb-5 rotate-3">
          <Text className="text-white text-2xl font-bold -rotate-3">PS</Text>
        </View>
        
        <Text className="text-2xl font-bold text-zinc-900 mb-1 tracking-tight">Pranava S.</Text>
        
        <View className="flex-row items-center mt-2 mb-6 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
          <Briefcase size={14} color="#2563EB" />
          <Text className="text-sm text-blue-600 font-semibold ml-2">
            Software Product Developer Intern at Sclera
          </Text>
        </View>
        
        <View className="h-px w-full bg-zinc-100 mb-6" />
        
        <View className="w-full gap-4 mb-8">
          <View className="flex-row items-center">
            <View className="bg-zinc-100 p-2 rounded-lg">
              <Code2 size={18} color="#52525B" />
            </View>
            <Text className="text-zinc-600 ml-3 font-medium">Next.js & Frontend Architecture</Text>
          </View>
          <View className="flex-row items-center">
            <View className="bg-zinc-100 p-2 rounded-lg">
              <Server size={18} color="#52525B" />
            </View>
            <Text className="text-zinc-600 ml-3 font-medium">Cloud Computing Solutions</Text>
          </View>
        </View>

        <Text className="text-xs text-zinc-400 font-medium">SnapNote v1.0.0</Text>
      </View>
    </View>
  );
}