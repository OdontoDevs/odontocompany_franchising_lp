export type VideoKey = "expansao" | "paulo" | "clinica";

export const videos: Record<VideoKey, string> = {
  expansao: "https://www.youtube.com/embed/gqA9E_jak6w?autoplay=1",
  paulo: "https://www.youtube.com/embed/vJQ7fZJZSKE?autoplay=1",
  clinica: "https://www.youtube.com/embed/XhGBWs60bTE?autoplay=1",
};

export interface Speaker {
  name: string;
  role: string;
  img: string;
}

export const speakers: Record<"expansao" | "paulo", Speaker> = {
  expansao: {
    name: "Felipe Naresi",
    role: "COO da OdontoCompany",
    img: "https://pub-db8ed4fb33634589a6ce5fb07e85cb46.r2.dev/landingpage_odc_franchising/felipe_naresi.jpg",
  },
  paulo: {
    name: "Dr. Paulo Zahr",
    role: "CEO & Fundador da OdontoCompany",
    img: "https://pub-db8ed4fb33634589a6ce5fb07e85cb46.r2.dev/landingpage_odc_franchising/paulo_zahr.jpg",
  },
};
