import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { sendProductSavedNotification } from '../services/notifications';
import type { Product } from '../types/product';

export interface HistoryItem {
  id: string;
  title: string;
  timestamp: string;
  proofImage: string | null;
}

interface HistoryStore {
  history: HistoryItem[];
  proofTempCache: Record<string, string | null>; 
  
  setTempProof: (id: string, uri: string | null) => void;
  saveProductToHistory: (product: Product, proofImage: string | null) => Promise<void>;
  deleteItem: (id: string, timestamp: string) => void;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      history: [],
      proofTempCache: {},
      
      setTempProof: (id, uri) => {
        set((state) => ({
          proofTempCache: { ...state.proofTempCache, [id]: uri }
        }));
      },

      saveProductToHistory: async (product, proofImage) => {
        const historyItem: HistoryItem = {
          id: product.id.toString(),
          title: product.title,
          timestamp: new Date().toISOString(),
          proofImage: proofImage,
        };

        set((state) => ({
          history: [historyItem, ...state.history],
          proofTempCache: { ...state.proofTempCache, [product.id.toString()]: null }
        }));

        await sendProductSavedNotification(product.title);
      },

      deleteItem: (id, timestamp) => {
        set((state) => ({
          history: state.history.filter(item => !(item.id === id && item.timestamp === timestamp))
        }));
      }
    }),
    {
      name: '@smartscan_global_state', 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);