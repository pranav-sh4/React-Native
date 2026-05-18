import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Trash2, Image as ImageIcon } from 'lucide-react-native';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
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
      style={{ elevation: 1, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 8 }}
    >
      <View className="flex-1 pr-4">
        <Text className="text-lg font-semibold text-zinc-900 mb-1 tracking-tight" numberOfLines={1}>
          {note.title || 'Untitled'}
        </Text>
        <Text className="text-zinc-600 text-sm mb-3 leading-5" numberOfLines={2}>
          {note.content}
        </Text>
        <View className="flex-row items-center">
          <Text className="text-xs text-zinc-400 font-medium">{note.createdAt}</Text>
          {note.imageUri && (
            <View className="flex-row items-center ml-3 bg-zinc-100 px-2 py-0.5 rounded-md">
              <ImageIcon size={12} color="#71717A" />
              <Text className="text-[10px] text-zinc-500 ml-1 font-medium">Image attached</Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity 
        className="bg-red-50 p-2.5 rounded-xl h-10 w-10 items-center justify-center self-center"
        onPress={confirmDelete}
      >
        <Trash2 size={18} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}