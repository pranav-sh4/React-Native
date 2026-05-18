import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'lucide-react-native';
import { Note } from '../types';

const STORAGE_KEY = '@snapnotes_data';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const notes: Note[] = JSON.parse(data);
        const found = notes.find((n) => n.id === id);
        if (found) setNote(found);
      }
    };
    fetchNote();
  }, [id]);

  if (!note) return <ActivityIndicator size="large" color="#18181B" className="flex-1 justify-center bg-[#FAFAFA]" />;

  return (
    <ScrollView className="flex-1 bg-[#FAFAFA]">
      {note.imageUri && (
        <Image source={{ uri: note.imageUri }} className="w-full h-72 bg-zinc-200" />
      )}
      
      <View className="p-6">
        <Text className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">
          {note.title || 'Untitled Note'}
        </Text>
        
        <View className="flex-row items-center mb-8 bg-zinc-100 self-start px-3 py-1.5 rounded-lg">
          <Calendar size={14} color="#71717A" />
          <Text className="text-sm text-zinc-500 font-medium ml-2">{note.createdAt}</Text>
        </View>
        
        <Text className="text-lg text-zinc-800 leading-8">
          {note.content}
        </Text>
      </View>
    </ScrollView>
  );
}