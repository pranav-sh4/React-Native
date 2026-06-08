import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { useRouter, useFocusEffect } from 'expo-router';
import { ShieldAlert, ScanLine } from 'lucide-react-native';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanned, setIsScanned] = useState(false);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setIsScanned(false);
    }, [])
  );

  const handleBarcodeScanned = (scanningResult: BarcodeScanningResult) => {
    if (isScanned) return;
    
    setIsScanned(true);
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    router.push(`/product/${scanningResult.data}`);
  };

  if (!permission) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-4">
        <Text className="text-secondary font-medium">Requesting camera access...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <View className="bg-surface p-8 rounded-2xl items-center shadow-sm border border-slate-200 w-full">
          <ShieldAlert color="#0f172a" size={48} className="mb-4" />
          <Text className="text-primary text-xl font-bold text-center mb-2">Camera Access Required</Text>
          <Text className="text-secondary text-center mb-6">
            SmartScan needs access to your camera to scan QR codes and barcodes.
          </Text>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={requestPermission}
            className="bg-primary w-full py-4 rounded-xl items-center"
          >
            <Text className="text-white font-bold text-lg">Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={isScanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39'],
        }}
      />
      
      <View className="flex-1 absolute inset-0 items-center justify-center pointer-events-none">
        <View className="absolute inset-0 bg-black/40" />
        
        <View className="w-72 h-72 rounded-2xl border-2 border-white/80 items-center justify-center overflow-hidden">
          <View className="absolute inset-0 bg-transparent" />
          <ScanLine color="rgba(255,255,255,0.8)" size={48} />
        </View>

        <View className="absolute bottom-24 bg-black/60 px-6 py-3 rounded-full">
          <Text className="text-white font-medium tracking-wide">
            Align code within the frame
          </Text>
        </View>
      </View>
    </View>
  );
}