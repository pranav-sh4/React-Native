export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  sku: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  thumbnail: string;
  images: string[];
  meta: {
    barcode: string;
    qrCode: string;
  };
};