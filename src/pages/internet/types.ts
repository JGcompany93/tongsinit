export type TelcoKey = "KT" | "LGU+" | "SK" | "SKYLIFE" | "HELLO";

export type InternetPlan = {
  id: string;
  speedMbps: number;
  name: string;
  soloPrice: number;
  bundlePrice: number;
};

export type TvPlan = {
  id: string;
  channels: number;
  name: string;
  price: number;
};

export type TelcoCatalog = {
  telco: TelcoKey;
  label: string;
  internet: InternetPlan[];
  tv: TvPlan[];
};
