import axios from 'axios';
import type { Product } from '../types/product';

const client = axios.create({ baseURL: "https://dummyjson.com" });

export const fetchProductDetailsFromApi = async (scannedId: string): Promise<Product> => {
  let validDummyId = 1;
  const numericId = parseInt(scannedId.replace(/\D/g, ''), 10);

  if (!isNaN(numericId) && numericId >= 1 && numericId <= 194) {
    validDummyId = numericId;
  } else {
    // Hash Trick to handle real barcodes
    let hash = 0;
    for (let i = 0; i < scannedId.length; i++) {
      hash = scannedId.charCodeAt(i) + ((hash << 5) - hash);
    }
    validDummyId = (Math.abs(hash) % 194) + 1;
  }

  const response = await client.get<Product>(`/products/${validDummyId}`);
  
  return response.data;
};