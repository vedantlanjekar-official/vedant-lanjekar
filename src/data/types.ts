export interface ImageAsset {
  id: string;
  file: string;
  source: string;
  thumb: string;
  large: string;
  w: number;
  h: number;
  bytes: number;
}

export interface Link {
  label: string;
  url: string;
}

export interface Certificate {
  image: ImageAsset;
  title: string;
  caption?: string;
}
