interface floatHearts {
  id: string;
  x: number;
  duration: number;
  delay: number;
}

interface PopHeart {
  id: string;
  xOffset: number;
  duration: number;
  scaleStart: number;
  delay: number;
  endY: number;
}

interface Memo {
  id: number;
  images: string[];
  name: string;
  caption: string;
  cover_path?: string;
  auth?: string | boolean;
  password?: string;
}