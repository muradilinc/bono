export interface Gallery {
  id: number;
  title: string;
  description: string;
  image_set: {
    id: number;
    image: string;
  }[];
}

export interface GalleryId {
  title: string;
  description: string;
  images: string[];
}
