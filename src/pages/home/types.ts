export type Carrier = "KT" | "LG" | "SKT";

export type Review = {
  name: string;
  title: string;
  desc: string;
  moveTo: "KT로 이동" | "SK로 이동" | "LG로 이동";
};
