import React from 'react';
import { View, Text, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'lucide-react-native';
import { useHistoryStore } from '../../store/historyStore';

interface Props {
  productId: string;
}

export default function CaptureProof({ productId }: Props) {
  const tempProof = useHistoryStore(state => state.proofTempCache[productId]);
  const setTempProof = useHistoryStore(state => state.setTempProof);

  const handleCaptureProof = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to allow camera access to capture proof.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: Platform.OS === 'ios',
      quality: 0.7,
    });

    if (!result.canceled) {
      setTempProof(productId, result.assets[0].uri);
    }
  };

  return (
    <View className="bg-surface rounded-2xl border border-slate-200 shadow-sm p-5">
      <Text className="text-lg font-bold text-primary mb-2">Condition Proof</Text>
      
      <TouchableOpacity 
        onPress={handleCaptureProof}
        activeOpacity={0.8}
        className="bg-slate-100 border border-slate-300 py-4 rounded-xl flex-row justify-center items-center mb-4"
      >
        <Camera color="#0f172a" size={24} className="mr-2" />
        <Text className="text-primary font-bold text-lg">
          {tempProof ? "Retake Photo" : "Capture Proof"}
        </Text>
      </TouchableOpacity>

      {tempProof && (
        <View className="mt-2 rounded-xl overflow-hidden border border-slate-200">
          <Image source={{ uri: tempProof }} className="w-full h-48" resizeMode="cover" />
        </View>
      )}
    </View>
  );
}