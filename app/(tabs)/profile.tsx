import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Briefcase, Code, ChevronRight, Settings, Info, Mail } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="bg-surface px-6 pt-10 pb-8 border-b border-slate-200 items-center">
        <View className="w-24 h-24 bg-slate-800 rounded-full items-center justify-center mb-4 shadow-sm">
          <Text className="text-white text-3xl font-bold">SP</Text>
        </View>
        
        <Text className="text-2xl font-bold text-primary mb-1">S Pranava</Text>
        <Text className="text-secondary font-medium">Software Product Developer Intern</Text>
        <Text className="text-slate-400 text-sm mt-1">Sclera</Text>
      </View>

      <View className="p-4">
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-2">About Developer</Text>
        <View className="bg-surface rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-50 p-2 rounded-lg mr-3">
              <Code color="#3b82f6" size={20} />
            </View>
            <View className="flex-1">
              <Text className="text-primary font-bold">Core Focus</Text>
              <Text className="text-secondary text-sm">Next.js & Cloud Computing</Text>
            </View>
          </View>
          
          <View className="flex-row items-center">
            <View className="bg-emerald-50 p-2 rounded-lg mr-3">
              <Briefcase color="#10b981" size={20} />
            </View>
            <View className="flex-1">
              <Text className="text-primary font-bold">Experience</Text>
              <Text className="text-secondary text-sm">Full-Stack Development, API Integration, and Performance Engineering</Text>
            </View>
          </View>
        </View>

        <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-2">Application</Text>
        <View className="bg-surface rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          <TouchableOpacity activeOpacity={0.7} className="flex-row items-center p-4 border-b border-slate-100">
            <Settings color="#64748b" size={20} className="mr-3" />
            <Text className="flex-1 text-primary font-medium"> Preferences</Text>
            <ChevronRight color="#cbd5e1" size={20} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} className="flex-row items-center p-4 border-b border-slate-100">
            <Mail color="#64748b" size={20} className="mr-3" />
            <Text className="flex-1 text-primary font-medium"> Contact Support</Text>
            <ChevronRight color="#cbd5e1" size={20} />
          </TouchableOpacity>

          <View className="flex-row items-center p-4 bg-slate-50">
            <Info color="#94a3b8" size={20} className="mr-3" />
            <View className="flex-1">
              <Text className="text-primary font-medium"> SmartScan Version</Text>
              <Text className="text-slate-400 text-xs"> v1.0.0 (Build 42)</Text>
            </View>
          </View>
          
        </View>
      </View>
    </ScrollView>
  );
}