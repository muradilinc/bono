import { Banners } from '../../../../features/banner/model/types';

export interface BannerCardsProps {
  banner: Banners;
}

export interface BannerCardsForm {
  title: string;
  subtitle: string;
}
