import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { useHistoryStore } from '../../store/historyStore';
import { ArchiveX, Trash2, Calendar, Search, X } from 'lucide-react-native';

export default function HistoryScreen() {
  const history = useHistoryStore(state => state.history);
  const deleteItem = useHistoryStore(state => state.deleteItem);
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id: string, timestamp: string) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to remove this scan from your history?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => deleteItem(id, timestamp)
        }
      ]
    );
  };

  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return history;
    return history.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.id.includes(searchQuery)
    );
  }, [history, searchQuery]);

  const renderItem = ({ item }: { item: any }) => {
    const date = new Date(item.timestamp).toLocaleDateString();
    const time = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <View className="bg-surface p-4 rounded-2xl border border-slate-200 shadow-sm mb-4 flex-row items-center">
        <View className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden mr-4 border border-slate-200">
          {item.proofImage ? (
            <Image source={{ uri: item.proofImage }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-slate-400 text-xs text-center px-1">No Image</Text>
            </View>
          )}
        </View>

        <View className="flex-1 pr-2">
          <Text className="text-primary font-bold text-base mb-1" numberOfLines={1}>
            {item.title}
          </Text>
          <View className="flex-row items-center">
            <Calendar color="#64748b" size={14} className="mr-1" />
            <Text className="text-secondary text-xs">{date} at {time}</Text>
          </View>
          <Text className="text-slate-400 text-xs mt-1">ID: {item.id}</Text>
        </View>

        <TouchableOpacity onPress={() => handleDelete(item.id, item.timestamp)} className="p-3 rounded-full bg-red-50">
          <Trash2 color="#ef4444" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <View className="px-4 pt-4 pb-2 bg-white border-b border-slate-200">
        <View className="flex-row items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200">
          <Search color="#94a3b8" size={20} className="mr-2" />
          <TextInput
            className="flex-1 text-primary text-base py-1"
            placeholder="Search history by name or ID..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} className="p-1">
              <X color="#94a3b8" size={18} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="flex-1 p-4">
        {history.length === 0 ? (
          <View className="flex-1 items-center justify-center p-6">
            <View className="bg-slate-100 p-6 rounded-full mb-4">
              <ArchiveX color="#94a3b8" size={64} />
            </View>
            <Text className="text-primary text-xl font-bold mb-2">No Scans Yet</Text>
            <Text className="text-secondary text-center">Items you scan and save will appear here in your history.</Text>
          </View>
        ) : filteredHistory.length === 0 ? (
          <View className="flex-1 items-center justify-center p-6">
            <Text className="text-secondary text-lg text-center">No results found for "{searchQuery}"</Text>
          </View>
        ) : (
          <FlatList
            data={filteredHistory}
            keyExtractor={(item) => item.timestamp + item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}