import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Code2, Server, Briefcase, Camera } from 'lucide-react-native';

const PROFILE_PIC_KEY = '@snapnotes_profile_pic';

export default function ProfileScreen() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  useEffect(() => {
    loadAvatar();
  }, []);

  const loadAvatar = async () => {
    try {
      const savedUri = await AsyncStorage.getItem(PROFILE_PIC_KEY);
      if (savedUri) setAvatarUri(savedUri);
    } catch (error) {
      console.error(error);
    }
  };

  const changeProfilePicture = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'We need gallery access to change your picture.');
      return;
    }

    // Using allowsEditing: false prevents the native Android crop tool crash
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false, 
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newUri = result.assets[0].uri;
      setAvatarUri(newUri);
      await AsyncStorage.setItem(PROFILE_PIC_KEY, newUri);
    }
  };

  return (
    <View className="flex-1 bg-[#FAFAFA] items-center px-6 pt-12">
      <View className="bg-white p-8 rounded-3xl w-full max-w-sm border border-zinc-200 items-center" style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 }}>
        
        {/* Editable Profile Avatar */}
        <TouchableOpacity 
          onPress={changeProfilePicture}
          activeOpacity={0.8}
          className="w-24 h-24 mb-5 relative"
        >
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} className="w-full h-full rounded-full bg-zinc-100" />
          ) : (
            <View className="w-full h-full bg-zinc-900 rounded-full items-center justify-center">
              <Text className="text-white text-3xl font-bold">PS</Text>
            </View>
          )}
          {/* Small camera badge icon */}
          <View className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full border-2 border-white">
            <Camera size={14} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        
        <Text className="text-2xl font-bold text-zinc-900 mb-1 tracking-tight">Pranava S.</Text>
        
        <View className="flex-row items-center mt-2 mb-6 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
          <Briefcase size={14} color="#2563EB" />
          <Text className="text-sm text-blue-600 font-semibold ml-2 text-center leading-5">
            Software Product Developer Intern at Sclera
          </Text>
        </View>
        
        <View className="h-px w-full bg-zinc-100 mb-6" />
        
        <View className="w-full gap-4 mb-8">
          <View className="flex-row items-center">
            <View className="bg-zinc-100 p-2 rounded-lg">
              <Code2 size={18} color="#52525B" />
            </View>
            <Text className="text-zinc-600 ml-3 font-medium">Next.js & Full-Stack Development</Text>
          </View>
          <View className="flex-row items-center">
            <View className="bg-zinc-100 p-2 rounded-lg">
              <Server size={18} color="#52525B" />
            </View>
            <Text className="text-zinc-600 ml-3 font-medium">Cloud Architecture</Text>
          </View>
        </View>

        <Text className="text-xs text-zinc-400 font-medium">SnapNote v1.0.0</Text>
      </View>
    </View>
  );
}