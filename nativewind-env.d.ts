/// <reference types="nativewind/types" />
import 'lucide-react-native'; // <--- This line saves the original library!

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'lucide-react-native' {
  import { SvgProps } from 'react-native-svg';
  // This merges our custom props with the existing icons instead of erasing them
  export interface LucideProps extends SvgProps {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
    className?: string;
  }
}