import { Banners } from '../../../../features/banner/model/types';
import { Gallery } from '../../../../features/gallery/model/type';

export interface BannerCardsProps {
  banner: Banners;
}

export interface BannerCardsForm {
  title: string;
  subtitle: string;
}

export interface GalleryProps {
  galleries: Gallery[];
}
