import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, Image as ImageIcon, X, Check } from 'lucide-react-native';
import { Note } from '../types';

const STORAGE_KEY = '@snapnotes_data';

export default function CreateNoteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();

  const pickGalleryImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'We need gallery access to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Camera access is needed.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const saveNote = async () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert('Hold on', 'Please enter a title or write something first.');
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      imageUri,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    try {
      const existingData = await AsyncStorage.getItem(STORAGE_KEY);
      const notes: Note[] = existingData ? JSON.parse(existingData) : [];
      notes.unshift(newNote);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      router.back();
    } catch (error) {
      console.error('Failed to save note', error);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-[#FAFAFA]">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingTop: 24, paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white border border-zinc-200 rounded-2xl px-4 py-3 mb-4 shadow-sm" style={{ elevation: 1 }}>
          <TextInput
            className="text-xl font-bold text-zinc-900"
            placeholder="Note Title"
            placeholderTextColor="#A1A1AA"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        
        <View className="bg-white border border-zinc-200 rounded-2xl px-4 py-4 mb-6 shadow-sm min-h-[180px]" style={{ elevation: 1 }}>
          <TextInput
            className="text-base text-zinc-700 leading-relaxed"
            placeholder="Start typing..."
            placeholderTextColor="#D4D4D8"
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
          />
        </View>

        {imageUri ? (
          <View className="mb-8 relative shadow-sm">
            <Image source={{ uri: imageUri }} className="w-full h-64 rounded-2xl border border-zinc-200" />
            <TouchableOpacity 
              className="absolute top-3 right-3 bg-zinc-900/70 rounded-full p-2"
              onPress={() => setImageUri(null)}
            >
              <X size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row gap-4 mb-8">
            <TouchableOpacity 
              className="flex-1 flex-row justify-center items-center bg-white border border-zinc-200 py-4 rounded-2xl shadow-sm" 
              onPress={takePhoto}
            >
              <Camera size={20} color="#52525B" />
              <Text className="text-zinc-700 font-medium ml-2">Camera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 flex-row justify-center items-center bg-white border border-zinc-200 py-4 rounded-2xl shadow-sm" 
              onPress={pickGalleryImage}
            >
              <ImageIcon size={20} color="#52525B" />
              <Text className="text-zinc-700 font-medium ml-2">Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View className="p-5 bg-[#FAFAFA] border-t border-zinc-100 pb-10">
        <TouchableOpacity 
          className="bg-zinc-900 flex-row justify-center items-center py-4 rounded-2xl shadow-sm active:scale-[0.98]" 
          onPress={saveNote}
          activeOpacity={0.8}
        >
          <Check size={20} color="#FFFFFF" />
          <Text className="text-white font-semibold text-lg ml-2">Save Note</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}