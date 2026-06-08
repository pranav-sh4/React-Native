import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Scan, Clock, User } from 'lucide-react-native';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-2xl font-bold text-primary mb-6 mt-2">Welcome to SmartScan</Text>
      
      <View className="flex-row flex-wrap justify-between">
        {/* Scanner Card */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => router.push('/scanner')}
          className="bg-primary w-full p-6 rounded-2xl mb-4 items-center flex-row shadow-sm"
        >
          <View className="bg-white/20 p-3 rounded-full mr-4">
            <Scan color="#ffffff" size={32} />
          </View>
          <View>
            <Text className="text-white text-lg font-bold">Scan Code</Text>
            <Text className="text-white/80 text-sm mt-1">Scan QR or Barcode</Text>
          </View>
        </TouchableOpacity>

        {/* History Card */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => router.push('/(tabs)/history')}
          className="bg-surface w-[48%] p-4 rounded-2xl border border-slate-200 items-center shadow-sm"
        >
          <Clock color="#64748b" size={28} className="mb-2" />
          <Text className="text-primary font-semibold">History</Text>
        </TouchableOpacity>

        {/* Profile Card */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => router.push('/(tabs)/profile')}
          className="bg-surface w-[48%] p-4 rounded-2xl border border-slate-200 items-center shadow-sm"
        >
          <User color="#64748b" size={28} className="mb-2" />
          <Text className="text-primary font-semibold">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}