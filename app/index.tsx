import { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plus, NotebookPen, Search, X } from 'lucide-react-native';
import NoteCard from '../components/NoteCard';
import { Note } from '../types';

const STORAGE_KEY = '@snapnotes_data';

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const loadNotes = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsedNotes: Note[] = JSON.parse(data);
        parsedNotes.sort((a, b) => Number(b.isPinned || false) - Number(a.isPinned || false));
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  const togglePin = async (id: string) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) return { ...note, isPinned: !note.isPinned };
      return note;
    });
    updatedNotes.sort((a, b) => Number(b.isPinned || false) - Number(a.isPinned || false));
    setNotes(updatedNotes);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    return notes.filter(note => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 16, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-6">
            <Text className="text-2xl font-bold text-zinc-900 tracking-tight">{greeting}, Pranava!</Text>
            <Text className="text-zinc-500 mb-4">You have {notes.length} notes captured.</Text>
            
            <View className="flex-row items-center bg-white border border-zinc-200 rounded-xl px-4 py-2 shadow-sm" style={{ elevation: 1 }}>
              <Search size={18} color="#A1A1AA" />
              <TextInput 
                className="flex-1 ml-3 text-base text-zinc-800 p-0"
                placeholder="Search notes..."
                placeholderTextColor="#A1A1AA"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <X size={18} color="#71717A" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <NoteCard note={item} onDelete={deleteNote} onTogglePin={togglePin} />
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-16">
            <View className="bg-white p-6 rounded-full mb-5 border border-zinc-100 shadow-sm">
              <NotebookPen size={48} color="#D4D4D8" />
            </View>
            <Text className="text-zinc-800 text-lg font-semibold tracking-tight">
              {searchQuery ? "No matching notes found" : "Your notebook is empty"}
            </Text>
            <Text className="text-zinc-500 text-sm mt-2 text-center max-w-[200px]">
              {searchQuery ? "Try a different search term." : "Tap the plus button below to capture your first thought."}
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        className="absolute bottom-10 right-6 bg-zinc-900 h-16 w-16 rounded-full items-center justify-center shadow-lg active:scale-95"
        style={{ elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 }}
        onPress={() => router.push('/create')}
        activeOpacity={0.8}
      >
        <Plus size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}