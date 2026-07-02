import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DocsScreen() {
  const SectionHeader = ({ title, icon }: { title: string, icon: any }) => (
    <View className="flex-row items-center mt-6 mb-3 border-b border-gray-200 pb-2">
      <Ionicons name={icon} size={22} color="#2563eb" className="mr-2" />
      <Text className="text-xl font-bold text-gray-800 ml-2">{title}</Text>
    </View>
  );

  const BulletPoint = ({ title, text }: { title?: string, text: string }) => (
    <View className="flex-row mb-3 pl-2">
      <Text className="text-blue-600 font-bold mr-2">•</Text>
      <Text className="flex-1 text-gray-600 leading-5">
        {title && <Text className="font-bold text-gray-800">{title}: </Text>}
        {text}
      </Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      
      <View className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-2">
        <Text className="text-2xl font-extrabold text-gray-900 mb-1">Project Documentation</Text>
        <Text className="text-sm text-gray-500">React Native Maps Implementation Specs</Text>
      </View>

      <SectionHeader title="1. Research Findings" icon="search" />
      
      <Text className="font-bold text-gray-800 mb-2 mt-2">Available Options</Text>
      <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
        <BulletPoint title="react-native-maps" text="The community-standard library maintained by react-native-community. Wrapper around Apple Maps on iOS and Google Maps on Android." />
        <BulletPoint title="@rnmapbox/maps" text="Highly customizable vector map solution offering granular control over map styles." />
        <BulletPoint title="react-native-webview" text="Embedding a standard web map (Leaflet/Google Maps JS) within a native WebView component." />
      </View>

      <Text className="font-bold text-gray-800 mb-2">Advantages & Limitations</Text>
      <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
        <Text className="font-bold text-blue-600 mb-1">react-native-maps</Text>
        <BulletPoint text="Advantages: Works out-of-the-box with standard Expo Go. Excellent performance." />
        <BulletPoint text="Limitations: Styling UI elements can be inconsistent across platforms. Android requires JSON for custom styles." />
        
        <Text className="font-bold text-blue-600 mt-3 mb-1">Mapbox</Text>
        <BulletPoint text="Limitations: Does not work in standard Expo Go. Requires building a custom dev client." />
        
        <Text className="font-bold text-blue-600 mt-3 mb-1">WebView</Text>
        <BulletPoint text="Limitations: Poor performance. Gestures feel sluggish compared to OS-level rendering." />
      </View>

      <SectionHeader title="2. Chosen Approach" icon="checkmark-circle" />
      <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <Text className="text-gray-600 mb-3 leading-5">
          I implemented <Text className="font-bold text-gray-800">react-native-maps</Text> paired with <Text className="font-bold text-gray-800">Expo Router</Text> and <Text className="font-bold text-gray-800">NativeWind (Tailwind CSS)</Text>.
        </Text>
        <BulletPoint text="File-based routing architecture to maintain a clean, scalable structure." />
        <BulletPoint text="Mock device data decoupled into constants/Devices.ts for separation of concerns." />
        <BulletPoint text="Utilized React Native's absoluteFillObject to ensure map renders correctly behind a floating UI." />
      </View>

      <SectionHeader title="3. Challenges Encountered" icon="warning" />
      <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <BulletPoint title="Native vs. Web Styling" text="NativeWind's className props do not automatically apply dimensions to third-party modules like MapView, resulting in blank screens until standard StyleSheets were applied." />
        <BulletPoint title="Routing Structure" text="Configuring bottom-tabs while ensuring the root index.tsx correctly redirects required precise file structuring." />
        <BulletPoint title="Babel/Metro Caching" text="Integrating NativeWind v4 required heavy bundler cache-clearing to register configuration changes." />
      </View>

      <SectionHeader title="4. Learning Outcomes" icon="school" />
      <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <BulletPoint title="Expo Managed Workflow" text="Understood how Expo wraps native modules, keeping mobile development seamless." />
        <BulletPoint title="UI Performance" text="Learned the importance of the useMemo hook for search filtering to maintain 60 FPS during map re-renders." />
        <BulletPoint title="Native Z-Indexing" text="Grasped how OS-level maps require explicit absolute positioning to overlay React Native UI components." />
      </View>

    </ScrollView>
  );
}