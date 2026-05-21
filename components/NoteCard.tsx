import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Trash2, Image as ImageIcon, Pin } from 'lucide-react-native';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export default function NoteCard({ note, onDelete, onTogglePin }: NoteCardProps) {
  const router = useRouter();

  const confirmDelete = () => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(note.id) },
    ]);
  };

  return (
    <TouchableOpacity 
      className="bg-white rounded-2xl p-4 mb-4 flex-row border border-zinc-200"
      onPress={() => router.push(`/${note.id}`)}
      activeOpacity={0.7}
      style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 }}
    >
      <View className="flex-1 pr-2">
        <Text className="text-lg font-semibold text-zinc-900 mb-1 tracking-tight" numberOfLines={1}>
          {note.title || 'Untitled'}
        </Text>
        <Text className="text-zinc-600 text-sm mb-4 leading-5" numberOfLines={2}>
          {note.content}
        </Text>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-xs text-zinc-400 font-medium">{note.createdAt}</Text>
            {note.imageUri && (
              <View className="flex-row items-center ml-3 bg-zinc-100 px-2 py-0.5 rounded-md">
                <ImageIcon size={12} color="#71717A" />
                <Text className="text-[10px] text-zinc-500 ml-1 font-medium">Attached</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View className="justify-between items-end ml-2">
        <TouchableOpacity 
          className={`p-2 rounded-xl h-9 w-9 items-center justify-center ${note.isPinned ? 'bg-amber-100' : 'bg-zinc-50'}`}
          onPress={() => onTogglePin(note.id)}
        >
          <Pin size={16} color={note.isPinned ? "#D97706" : "#A1A1AA"} fill={note.isPinned ? "#D97706" : "transparent"} />
        </TouchableOpacity>

        <TouchableOpacity 
          className="p-2 rounded-xl h-9 w-9 items-center justify-center bg-red-50 mt-2"
          onPress={confirmDelete}
        >
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}