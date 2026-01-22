import { useMemo, useState } from "react";

import type { Carrier, Review } from "./home/types";
import HeroSection from "./home/HeroSection";
import AboutSection from "./home/AboutSection";
import ProcessSection from "./home/ProcessSection";
import ReviewsSection from "./home/ReviewsSection";

export default function Home() {
  const [name, setName] = useState("");
  const [p1] = useState("010");
  const [p2, setP2] = useState("");
  const [p3, setP3] = useState("");
  const [carrier, setCarrier] = useState<Carrier | null>(null);
  const [agree, setAgree] = useState(true);

  const canSubmit =
    name.trim() && p2.length === 4 && p3.length === 4 && carrier && agree;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const phone = `${p1}-${p2}-${p3}`;
    console.log({ name, phone, carrier, agree });
    alert("신청이 접수되었습니다.");
  }

  const reviews: Review[] = useMemo(
    () => [
      {
        name: "김OO",
        title: "x",
        desc: "필요한 조건만 정리해줘서 고민이 줄었고, 진행이 빠르게 끝났습니다.",
        moveTo: "KT로 이동",
      },
      {
        name: "이OO",
        title: "x",
        desc: "지원 조건을 숨김 없이 설명해줘서 신뢰가 갔고 비교가 쉬웠어요.",
        moveTo: "SK로 이동",
      },
      {
        name: "박OO",
        title: "x",
        desc: "신청하자마자 연락이 와서 일정까지 한 번에 잡았습니다.",
        moveTo: "LG로 이동",
      },
      {
        name: "정OO",
        title: "x",
        desc: "강요 없이 필요한 것만 안내해줘서 부담이 전혀 없었습니다.",
        moveTo: "KT로 이동",
      },
      {
        name: "최OO",
        title: "x",
        desc: "중간 확인도 잘 해주고 설치 후에도 체크해줘서 편했습니다.",
        moveTo: "SK로 이동",
      },
      {
        name: "한OO",
        title: "x",
        desc: "복잡한 내용을 정리해줘서 이해가 쉬웠고 선택이 빨랐습니다.",
        moveTo: "LG로 이동",
      },
      {
        name: "서OO",
        title: "x",
        desc: "작은 질문에도 바로 답변해주고 안내가 정돈되어 있었습니다.",
        moveTo: "KT로 이동",
      },
      {
        name: "윤OO",
        title: "x",
        desc: "절차를 최소화해서 번거롭지 않았고 전체 흐름이 매끄러웠어요.",
        moveTo: "SK로 이동",
      },
      {
        name: "오OO",
        title: "x",
        desc: "응대 속도랑 정리 방식이 좋아서 재신청해도 여기로 할 듯합니다.",
        moveTo: "LG로 이동",
      },
    ],
    []
  );

  return (
    <>
      <HeroSection
        name={name}
        setName={setName}
        p1={p1}
        p2={p2}
        setP2={setP2}
        p3={p3}
        setP3={setP3}
        carrier={carrier}
        setCarrier={setCarrier}
        agree={agree}
        setAgree={setAgree}
        canSubmit={Boolean(canSubmit)}
        onSubmit={onSubmit}
      />

      <AboutSection />
      <ProcessSection />
      <ReviewsSection reviews={reviews} />
    </>
  );
}
