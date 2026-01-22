import type { TelcoCatalog } from "./types";

export const CATALOG: TelcoCatalog[] = [
  {
    telco: "KT",
    label: "KT",
    internet: [
      { id: "kt_i_100", speedMbps: 100, name: "슬림", soloPrice: 23100, bundlePrice: 23100 },
      { id: "kt_i_500", speedMbps: 500, name: "베이직", soloPrice: 34100, bundlePrice: 28600 },
      { id: "kt_i_1000", speedMbps: 1000, name: "에센스", soloPrice: 38500, bundlePrice: 33000 },
    ],
    tv: [
      { id: "kt_t_238", channels: 238, name: "베이직", price: 16500 },
      { id: "kt_t_240", channels: 240, name: "라이트", price: 17600 },
      { id: "kt_t_263", channels: 263, name: "에센스", price: 20900 },
      { id: "kt_t_250", channels: 250, name: "모든G", price: 22000 },
    ],
  },
  {
    telco: "LGU+",
    label: "LG U+",
    internet: [
      { id: "lgu_i_100", speedMbps: 100, name: "광랜 인터넷", soloPrice: 22000, bundlePrice: 22000 },
      { id: "lgu_i_500", speedMbps: 500, name: "기가슬림", soloPrice: 33000, bundlePrice: 27500 },
      { id: "lgu_i_1000", speedMbps: 1000, name: "기가 인터넷", soloPrice: 38500, bundlePrice: 33000 },
    ],
    tv: [
      { id: "lgu_t_219", channels: 219, name: "실속형", price: 17600 },
      { id: "lgu_t_225", channels: 225, name: "기본형", price: 18700 },
      { id: "lgu_t_253", channels: 253, name: "프리미엄", price: 20900 },
    ],
  },
  {
    telco: "SK",
    label: "SK",
    internet: [
      { id: "sk_i_100", speedMbps: 100, name: "광랜 인터넷", soloPrice: 23100, bundlePrice: 22000 },
      { id: "sk_i_500", speedMbps: 500, name: "기가라이트", soloPrice: 34100, bundlePrice: 28600 },
      { id: "sk_i_1000", speedMbps: 1000, name: "기가 인터넷", soloPrice: 39600, bundlePrice: 34100 },
    ],
    tv: [
      { id: "sk_t_182", channels: 182, name: "Btv 이코노미", price: 14300 },
      { id: "sk_t_236", channels: 236, name: "Btv 스탠다드", price: 17600 },
      { id: "sk_t_252", channels: 252, name: "Btv 올", price: 20900 },
    ],
  },
  {
    telco: "SKYLIFE",
    label: "스카이라이프",
    internet: [
      { id: "sky_i_100", speedMbps: 100, name: "100M 인터넷", soloPrice: 23100, bundlePrice: 19250 },
      { id: "sky_i_200", speedMbps: 200, name: "기가 200M", soloPrice: 24200, bundlePrice: 20350 },
      { id: "sky_i_500", speedMbps: 500, name: "기가 500M", soloPrice: 29700, bundlePrice: 24750 },
      { id: "sky_i_1000", speedMbps: 1000, name: "기가 1G", soloPrice: 35200, bundlePrice: 30250 },
    ],
    tv: [
      { id: "sky_t_193", channels: 193, name: "ipit TV Basic", price: 12650 },
      { id: "sky_t_206", channels: 206, name: "ipit TV Plus", price: 13750 },
    ],
  },
  {
    telco: "HELLO",
    label: "헬로비전",
    internet: [
      { id: "hello_i_100", speedMbps: 100, name: "광랜라이트", soloPrice: 20790, bundlePrice: 16330 },
      { id: "hello_i_500", speedMbps: 500, name: "기가라이트", soloPrice: 30360, bundlePrice: 24090 },
      { id: "hello_i_1000", speedMbps: 1000, name: "플래티넘기가", soloPrice: 31900, bundlePrice: 25300 },
    ],
    tv: [
      { id: "hello_t_102", channels: 102, name: "헬로tv플러스", price: 8250 },
      { id: "hello_t_109", channels: 109, name: "UHD이코노미", price: 13200 },
      { id: "hello_t_245", channels: 245, name: "UHD뉴베이직", price: 15400 },
    ],
  },
];
