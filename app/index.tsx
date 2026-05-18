import { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plus, NotebookPen } from 'lucide-react-native';
import NoteCard from '../components/NoteCard';
import { Note } from '../types';

const STORAGE_KEY = '@snapnotes_data';

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const loadNotes = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setNotes(JSON.parse(data));
    } catch (error) {
      console.error('Failed to load notes', error);
    }
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  return (
    <View className="flex-1 bg-[#FAFAFA] px-5 pt-4">
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoteCard note={item} onDelete={deleteNote} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <View className="items-center justify-center mt-24">
            <View className="bg-zinc-100 p-6 rounded-full mb-4">
              <NotebookPen size={48} color="#A1A1AA" />
            </View>
            <Text className="text-zinc-500 text-base font-medium">Your notebook is empty</Text>
            <Text className="text-zinc-400 text-sm mt-1">Tap the + button to create a note</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-10 right-6 bg-zinc-900 h-16 w-16 rounded-full items-center justify-center shadow-lg"
        style={{ elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 }}
        onPress={() => router.push('/create')}
        activeOpacity={0.8}
      >
        <Plus size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}