export interface Note {
  id: string;
  title: string;
  content: string;
  imageUri: string | null;
  createdAt: string;
  isPinned?: boolean;
}