import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchProductDetailsFromApi } from '../../services/products';
import { requestNotificationPermissions } from '../../services/notifications';
import { useHistoryStore } from '../../store/historyStore';
import CaptureProof from '../../components/product/CaptureProof';
import type { Product } from '../../types/product';
import { AlertCircle, ArrowLeft, Save, Star, Box, ShieldCheck } from 'lucide-react-native';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const saveProductToHistory = useHistoryStore(state => state.saveProductToHistory);
  const tempProof = useHistoryStore(state => state.proofTempCache[id as string]);

  useEffect(() => {
    loadProductData();
    requestNotificationPermissions();
  }, [id]);

  const loadProductData = async () => {
    try {
      setLoading(true);
      const data = await fetchProductDetailsFromApi(id as string);
      setProduct(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToHistory = async () => {
    if (!product) return;
    try {
      await saveProductToHistory(product, tempProof || null);
      router.push('/(tabs)');
    } catch (err) {
      Alert.alert("Save Error", "Failed to save the product to history.");
    }
  };

  if (loading) return (
    <View className="flex-1 bg-slate-50 items-center justify-center">
      <ActivityIndicator size="large" color="#3B82F6" />
    </View>
  );

  if (error || !product) return (
    <View className="flex-1 bg-slate-50 items-center justify-center p-6">
      <AlertCircle color="#ef4444" size={64} className="mb-4" />
      <Text className="text-xl font-bold mb-2">Product Not Found</Text>
      <TouchableOpacity onPress={() => router.back()} className="bg-slate-900 px-8 py-3 rounded-xl mt-4">
        <Text className="text-white font-bold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <View className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <Image source={{ uri: product.thumbnail }} className="w-full h-64 bg-slate-100" resizeMode="contain" />
          
          <View className="p-5">
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1 pr-4">
                <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{product.category}</Text>
                <Text className="text-2xl font-bold text-slate-900 leading-tight">{product.title}</Text>
              </View>
              <Text className="text-2xl font-bold text-emerald-600">${product.price}</Text>
            </View>
            
            <View className="flex-row flex-wrap gap-3 mt-3 mb-4">
              <View className="flex-row items-center bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                <Star color="#f59e0b" size={16} className="mr-1" />
                <Text className="text-orange-700 font-medium">{product.rating}</Text>
              </View>
              <View className="flex-row items-center bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                <Box color="#3b82f6" size={16} className="mr-1" />
                <Text className="text-blue-700 font-medium">Stock: {product.stock}</Text>
              </View>
              <View className="flex-row items-center bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <ShieldCheck color="#64748b" size={16} className="mr-1" />
                <Text className="text-slate-600 font-medium">{product.warrantyInformation}</Text>
              </View>
            </View>

            <Text className="text-slate-600 text-base leading-relaxed">{product.description}</Text>
          </View>
        </View>

        <CaptureProof productId={id as string} />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200">
        <TouchableOpacity 
          onPress={handleSaveToHistory}
          activeOpacity={0.8}
          className="bg-blue-600 w-full py-4 rounded-xl flex-row justify-center items-center"
        >
          <Save color="#ffffff" size={20} className="mr-2" />
          <Text className="text-white font-bold text-lg">Save to History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}