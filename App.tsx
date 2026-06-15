import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Note {
  id: string;
  text: string;
}

const STORAGE_KEY = '@notes_app_data';

export default function App() {
  const [inputText, setInputText] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedNotes !== null) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      } finally {
        setIsReady(true);
      }
    };

    loadNotes();
  }, []);

  useEffect(() => {
    const saveNotes = async () => {
      if (!isReady) return; 

      try {
        const jsonValue = JSON.stringify(notes);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      } catch (error) {
        console.error('Error saving notes:', error);
      }
    };

    saveNotes();
  }, [notes, isReady]);

  const handleAddNote = () => {
    if (inputText.trim() === '') return;

    const newNote: Note = {
      id: Date.now().toString(),
      text: inputText.trim(),
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]); // Newest at top
    setInputText('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const renderNoteCard = ({ item }: { item: Note }) => (
    <View style={styles.card}>
      <Text style={styles.noteText}>{item.text}</Text>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => handleDeleteNote(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notes</Text>
        </View>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Write something..."
            placeholderTextColor="#A1A1AA"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleAddNote}
          />
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleAddNote}
            activeOpacity={0.8}
          >
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderNoteCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            isReady ? <Text style={styles.emptyText}>No notes yet.</Text> : null
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  keyboardView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingVertical: 24,
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#18181B',
    letterSpacing: -0.5,
  },
  inputArea: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#27272A',
    marginRight: 12,
  },
  addButton: {
    backgroundColor: '#09090B',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F4F4F5',
  },
  noteText: {
    flex: 1,
    fontSize: 16,
    color: '#3F3F46',
    lineHeight: 22,
    marginRight: 16,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FEF2F2',
    borderRadius: 6,
  },
  deleteText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#A1A1AA',
    marginTop: 40,
    fontSize: 15,
  },
});