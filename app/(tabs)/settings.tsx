import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const SettingsRow = ({ icon, title, subtitle, value, onToggle, isLast }: any) => (
    <View className={`flex-row items-center justify-between py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <View className="flex-row items-center flex-1 pr-4">
        <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-3">
          <Ionicons name={icon} size={18} color="#2563eb" />
        </View>
        <View>
          <Text className="text-base font-medium text-gray-800">{title}</Text>
          {subtitle && <Text className="text-xs text-gray-500 mt-0.5">{subtitle}</Text>}
        </View>
      </View>
      {onToggle ? (
        <Switch 
          value={value} 
          onValueChange={onToggle} 
          trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
          thumbColor={value ? '#2563eb' : '#f3f4f6'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      )}
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 40 }}>
      
      <View className="bg-white px-5 py-6 mb-4 border-b border-gray-200 flex-row items-center">
        <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center mr-4">
          <Text className="text-2xl font-bold text-blue-600">SP</Text>
        </View>
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900">Administrator</Text>
          <Text className="text-sm text-gray-500">Manage device network</Text>
        </View>
      </View>

      <View className="px-5 mb-6">
        <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
          Preferences
        </Text>
        <View className="bg-white rounded-2xl px-4 border border-gray-200 shadow-sm shadow-black/5">
          <SettingsRow 
            icon="notifications" 
            title="Push Notifications" 
            subtitle="Alerts for device statuses"
            value={notificationsEnabled} 
            onToggle={setNotificationsEnabled} 
          />
          <SettingsRow 
            icon="location" 
            title="Location Services" 
            subtitle="Required for mapping devices"
            value={locationEnabled} 
            onToggle={setLocationEnabled} 
            isLast={true}
          />
        </View>
      </View>

      <View className="px-5 mb-6">
        <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
          Account & Security
        </Text>
        <View className="bg-white rounded-2xl px-4 border border-gray-200 shadow-sm shadow-black/5">
          <TouchableOpacity activeOpacity={0.7}>
            <SettingsRow icon="person" title="Profile Details" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <SettingsRow icon="shield-checkmark" title="Privacy Policy" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <SettingsRow icon="log-out" title="Sign Out" isLast={true} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="items-center mt-4">
        <Text className="text-gray-400 text-xs">Device Manager App v1.0.0</Text>
      </View>

    </ScrollView>
  );
}