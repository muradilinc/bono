export interface Banners {
  id: number;
  title: string;
  subtitle: string;
  topik_baner: {
    id: number;
    created_at: string;
    img: string;
  }[];
}

export interface BannersTitle {
  id: number;
  title: string;
  subtitle: string;
  topik_baner: number[];
}

export interface BannersTopik {
  id: number;
  img: string;
  created_at: string;
}
