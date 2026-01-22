// src/pages/internet/InternetPage.tsx
import { useEffect, useMemo, useState } from "react";
import BottomPriceBar from "./components/BottomPriceBar";
import WindowCarousel from "./components/WindowCarousel";
import { CATALOG } from "./catalog";
import { formatSpeed, formatWon } from "./utils";
import type { TelcoKey, InternetPlan } from "./types";

// ✅ 통신사 로고
import ktLogo from "../../assets/telco-kt.png";
import skLogo from "../../assets/telco-sk.svg";
import lguLogo from "../../assets/telco-lgu.jpg";
import skylifeLogo from "../../assets/telco-skylife.jpeg";
import helloLogo from "../../assets/telco-hello.svg";

// ✅ 스크롤 다운 아이콘
import scrollDown from "../../assets/scroll-down.svg";

const TELCO_LOGO: Record<TelcoKey, string> = {
  KT: ktLogo,
  SK: skLogo,
  "LGU+": lguLogo,
  SKYLIFE: skylifeLogo,
  HELLO: helloLogo,
};

export default function InternetPage() {
  const [telco, setTelco] = useState<TelcoKey>("SK");
  const [includeTv, setIncludeTv] = useState(false);

  const catalog = useMemo(
    () => CATALOG.find((c) => c.telco === telco) ?? CATALOG[0],
    [telco]
  );

  const initialCatalog = useMemo(
    () => CATALOG.find((c) => c.telco === "SK") ?? CATALOG[0],
    []
  );

  const [internetId, setInternetId] = useState<string | null>(
    () => initialCatalog.internet[0]?.id ?? null
  );
  const [tvId, setTvId] = useState<string | null>(
    () => initialCatalog.tv[0]?.id ?? null
  );

  useEffect(() => {
    if (!includeTv) return;
    if (!tvId && catalog.tv[0]?.id) setTvId(catalog.tv[0].id);
  }, [includeTv, tvId, catalog.tv]);

  const internetSelected = useMemo(
    () => catalog.internet.find((p) => p.id === internetId) ?? null,
    [catalog, internetId]
  );

  const tvSelected = useMemo(() => {
    if (!includeTv) return null;
    return catalog.tv.find((p) => p.id === tvId) ?? null;
  }, [catalog, tvId, includeTv]);

  const total =
    includeTv && internetSelected && tvSelected
      ? internetSelected.bundlePrice + tvSelected.price
      : internetSelected?.soloPrice ?? 0;

  const internetDisplayPrice = (p: InternetPlan) =>
    includeTv ? p.bundlePrice : p.soloPrice;

  const handleSelectTelco = (nextTelco: TelcoKey) => {
    const nextCatalog = CATALOG.find((c) => c.telco === nextTelco) ?? CATALOG[0];
    setTelco(nextTelco);
    setInternetId(nextCatalog.internet[0]?.id ?? null);
    setTvId(nextCatalog.tv[0]?.id ?? null);
  };

  const handleApply = () => {
    // TODO: 실제 신청 플로우로 연결 (예: /apply, /quote, 카카오 상담 링크 등)
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto w-full max-w-6xl px-5 py-5 pb-[108px]">
        <div className="space-y-9">
          {/* 통신사 */}
          <section className="flex items-start justify-center gap-6">
            <div className="w-[120px] pt-2 text-lg font-bold">통신사</div>

            <div className="w-full max-w-[820px] pl-4">
              <WindowCarousel
                items={CATALOG.map((c) => ({ id: c.telco, label: c.label }))}
                selectedId={telco}
                onSelect={(id) => handleSelectTelco(id as TelcoKey)}
                cardClassName="rounded-xl border border-gray-300 px-4 py-5 text-left transition min-h-[108px] data-[selected=true]:border-gray-800"
                emptyClassName="rounded-xl border border-transparent px-4 py-5 min-h-[108px]"
                renderCard={(item) => {
                  const isSmallerLogo =
                    item.id === "LGU+" ||
                    item.id === "HELLO" ||
                    item.id === "SKYLIFE";

                  return (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                      <div
                        className={`flex items-center justify-center ${
                          isSmallerLogo ? "h-[25px]" : "h-[38px]"
                        }`}
                      >
                        <img
                          src={TELCO_LOGO[item.id as TelcoKey]}
                          alt={item.label}
                          className="h-full w-auto object-contain"
                          loading="lazy"
                          draggable={false}
                        />
                      </div>

                      <span className="font-extrabold tracking-wide text-[15px] leading-none text-gray-900">
                        {item.label}
                      </span>
                    </div>
                  );
                }}
              />
            </div>
          </section>

          {/* 인터넷 속도 */}
          <section className="flex items-start justify-center gap-6">
            <div className="w-[120px] pt-2 text-lg font-bold">인터넷 속도</div>

            <div className="w-full max-w-[820px] pl-4 space-y-2.5">
              <WindowCarousel
                key={`internet-${telco}-${includeTv ? "tv" : "solo"}`}
                items={catalog.internet}
                selectedId={internetId}
                onSelect={setInternetId}
                cardClassName="rounded-xl border border-gray-300 px-4 py-5 transition data-[selected=true]:border-gray-800"
                renderCard={(p) => (
                  <div className="space-y-2.5 text-left">
                    <div className="text-[22px] sm:text-[24px] font-semibold text-black tracking-[-0.02em]">
                      {formatSpeed(p.speedMbps)}
                    </div>

                    <div className="text-xs sm:text-sm font-medium text-gray-500">
                      {p.name}
                    </div>

                    <div className="pt-0.5 text-lg font-semibold text-blue-600">
                      월 {formatWon(internetDisplayPrice(p))}
                    </div>
                  </div>
                )}
              />

              <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={includeTv}
                  onChange={(e) => setIncludeTv(e.target.checked)}
                />
                TV 포함
              </label>
            </div>
          </section>

          {/* TV */}
          {includeTv && (
            <section className="flex items-start justify-center gap-6">
              <div className="w-[120px] pt-2 text-lg font-bold">TV 채널</div>

              <div className="w-full max-w-[820px] pl-4">
                <WindowCarousel
                  key={`tv-${telco}`}
                  items={catalog.tv}
                  selectedId={tvId}
                  onSelect={setTvId}
                  cardClassName="rounded-xl border border-gray-300 px-4 py-5 transition data-[selected=true]:border-gray-800"
                  renderCard={(p) => (
                    <div className="space-y-2.5 text-left">
                      <div className="text-[22px] sm:text-[24px] font-semibold text-black tracking-[-0.02em]">
                        {p.channels} 채널
                      </div>

                      <div className="text-xs sm:text-sm font-medium text-gray-500">
                        {p.name}
                      </div>

                      <div className="pt-0.5 text-lg font-semibold text-blue-600">
                        월 {formatWon(p.price)}
                      </div>
                    </div>
                  )}
                />
              </div>
            </section>
          )}

{/* ▼ 사기 업체 피하는법 (업그레이드: sticky TOC + 색 테마 + 시각 분해) */}
<section className="pt-10">
  <div className="mx-auto w-full max-w-6xl px-5">
    {/* HERO */}
    <div className="rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-7 sm:p-10">
      <div className="flex flex-col items-center text-center gap-4">
        <img
          src={scrollDown}
          alt="scroll down"
          className="h-9 w-9 opacity-60"
          style={{ filter: "grayscale(1)" }}
          draggable={false}
        />
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          5분 만에 사기업체 피하는법
        </h2>
        <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-gray-600">
          스크롤만 쭉 내리면 됩니다. “말로만 싸다”는 곳은 조건에서 티가 납니다.
          아래 체크리스트대로 보면, 대부분의 낚시 업체는 1~2분 안에 걸러집니다.
        </p>

        {/* Quick chips */}
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-semibold text-gray-700">
            요금 함정
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-semibold text-gray-700">
            사은품 지연
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-semibold text-gray-700">
            연락두절
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-semibold text-gray-700">
            문서 증빙
          </span>
        </div>
      </div>
    </div>

    {/* LAYOUT: sticky TOC + content */}
    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[260px,1fr]">
      {/* Sticky TOC */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5">
          <div className="text-sm font-extrabold text-gray-900">빠른 이동</div>
          <div className="mt-4 space-y-2 text-sm">
            <a href="#anti-scam-step1" className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50">
              1) 터무니없는 요금
            </a>
            <a href="#anti-scam-step2" className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50">
              2) 사은품 분할/지연
            </a>
            <a href="#anti-scam-step3" className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50">
              3) 연락두절/정보부실
            </a>
            <a href="#anti-scam-final" className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50">
              마지막 30초 점검
            </a>
          </div>

          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-xs font-extrabold text-gray-900">팁</div>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              상담할 때는 “말”보다 <span className="font-semibold">조건표(캡처)</span>가 중요합니다.
              조건을 문서로 남기지 못하는 곳은 피하세요.
            </p>
          </div>
        </div>
      </aside>

      {/* CONTENT */}
      <div className="space-y-10">
        {/* STEP 1 */}
        <section id="anti-scam-step1" className="rounded-3xl border border-blue-200 bg-blue-50/40 p-6 sm:p-9">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-extrabold text-white">
                STEP 1
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                “통신사보다 말도 안 되게 싸다”는 요금
              </h3>
            </div>

            <p className="text-lg sm:text-xl leading-relaxed text-gray-800">
              한 번쯤 이런 멘트를 들어봤을 겁니다.
              <span className="font-semibold"> “데이터 무제한 월 2만원대”, “인터넷+TV 월 1만원대”</span>.
              문제는, 이런 제안이 진짜로 싸서가 아니라 <span className="font-semibold">“처음에만 싸게 보이게 만드는 구조”</span>인 경우가 많다는 겁니다.
            </p>

            {/* 2-column info blocks */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <div className="text-base font-extrabold text-gray-900">자주 쓰는 ‘회수’ 방식</div>
                <ul className="mt-3 space-y-2 text-base leading-relaxed text-gray-700">
                  <li className="flex gap-2">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-blue-500" />
                    <span>고가 요금제/부가서비스를 몇 개월 유지 조건으로 붙임</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-blue-500" />
                    <span>카드 발급/자동이체 등 실적 조건을 숨기거나 축소 설명</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-blue-500" />
                    <span>해지/변경 시 위약금, 사은품 환수 조건을 나중에 말함</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <div className="text-base font-extrabold text-gray-900">바로 걸러내는 질문 3개</div>
                <div className="mt-3 space-y-3">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="text-sm font-extrabold text-gray-900">Q1. 월 요금 ‘확정 금액’은?</div>
                    <p className="mt-1 text-base leading-relaxed text-gray-700">
                      “월 얼마”를 딱 잘라 말 못하면 위험합니다. 조건에 따라 달라진다는 말은
                      결국 <span className="font-semibold">조건이 핵심</span>이라는 뜻입니다.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="text-sm font-extrabold text-gray-900">Q2. 유지 조건/환수 기준은?</div>
                    <p className="mt-1 text-base leading-relaxed text-gray-700">
                      “몇 개월 유지?”, “중도 해지 시 환수?”를 문서로 남겨달라고 하세요.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="text-sm font-extrabold text-gray-900">Q3. 조건표 캡처 가능?</div>
                    <p className="mt-1 text-base leading-relaxed text-gray-700">
                      캡처/문서 제공을 피하면 “나중에 말 바꾸기” 확률이 올라갑니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger chips */}
            <div className="mt-5 rounded-2xl border border-blue-200 bg-white p-5">
              <div className="text-base font-extrabold text-gray-900">위험 멘트(나오면 속도 줄이기)</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-900">
                  “일단 설치부터 하고요”
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-900">
                  “다들 이렇게 해요”
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-900">
                  “지금만 되는 혜택”
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-900">
                  “조건은 나중에 정리”
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* STEP 2 */}
        <section id="anti-scam-step2" className="rounded-3xl border border-amber-200 bg-amber-50/40 p-6 sm:p-9">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-amber-600 px-4 py-1.5 text-sm font-extrabold text-white">
                STEP 2
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                사은품 “분할 입금/몇 달 뒤 지급”은 레드카드
              </h3>
            </div>

            <p className="text-lg sm:text-xl leading-relaxed text-gray-800">
              <span className="font-semibold">“개통되면 일부 먼저, 나머지는 6개월 뒤 / 1년 뒤”</span>.
              이 구조는 고객이 시간이 지나면서 증빙을 놓치고, 담당자가 바뀌고, 연락이 늘어지며,
              결국 “지급이 흐려지는” 방향으로 작동하기 쉽습니다.
            </p>

            {/* Timeline */}
            <div className="mt-4 rounded-2xl border border-amber-200 bg-white p-6">
              <div className="text-base font-extrabold text-gray-900">자주 보이는 진행 흐름</div>
              <div className="mt-4 space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 h-3 w-3 rounded-full bg-amber-500" />
                  <p className="text-base leading-relaxed text-gray-700">
                    <span className="font-semibold text-gray-900">가입 전:</span> “사은품 크게 드려요” (조건은 짧게)
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-3 w-3 rounded-full bg-amber-500" />
                  <p className="text-base leading-relaxed text-gray-700">
                    <span className="font-semibold text-gray-900">개통 직후:</span> “분할로 먼저 일부 지급” (나머지는 n개월 후)
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-3 w-3 rounded-full bg-amber-500" />
                  <p className="text-base leading-relaxed text-gray-700">
                    <span className="font-semibold text-gray-900">몇 달 뒤:</span> “담당자 변경/정산 이슈/조건 변경” 같은 이유로 지연
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-3 w-3 rounded-full bg-amber-500" />
                  <p className="text-base leading-relaxed text-gray-700">
                    <span className="font-semibold text-gray-900">결말:</span> 고객이 지쳐서 포기하거나, 지급 분쟁으로 번짐
                  </p>
                </div>
              </div>
            </div>

            {/* Compare cards */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-amber-200 bg-white p-5">
                <div className="text-base font-extrabold text-gray-900">안전한 운영은 보통</div>
                <ul className="mt-3 space-y-2 text-base leading-relaxed text-gray-700">
                  <li className="flex gap-2">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-amber-500" />
                    <span>“개통 확인 후 ○일 이내”처럼 지급 시점이 명확</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-amber-500" />
                    <span>지급 조건/환수 기준을 문서(카톡/페이지)로 제공</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-amber-500" />
                    <span>“예외 조건”을 먼저 설명(정직한 곳일수록 불리한 것도 말함)</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-white p-5">
                <div className="text-base font-extrabold text-gray-900">바로 쓰는 문장(그대로 복붙)</div>
                <div className="mt-3 space-y-3">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-base leading-relaxed text-gray-700">
                      “사은품 지급 시점이 <span className="font-semibold">개통 후 며칠 이내</span>인지,
                      <span className="font-semibold"> 문서로</span> 안내 가능할까요?”
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-base leading-relaxed text-gray-700">
                      “중도 해지/정지/미납 시 <span className="font-semibold">환수 기준</span>도 같이 알려주세요.”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* One-liner */}
            <div className="mt-5 rounded-2xl border border-amber-200 bg-white p-5">
              <div className="text-base font-extrabold text-gray-900">한 줄 결론</div>
              <p className="mt-2 text-lg leading-relaxed text-gray-800">
                “나중에 드릴게요”는 대부분 <span className="font-semibold">나중에 안 줄 수 있는 구조</span>입니다.
                지급 시점이 명확하지 않으면 피하는 게 맞습니다.
              </p>
            </div>
          </div>
        </section>

        {/* STEP 3 */}
        <section id="anti-scam-step3" className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 sm:p-9">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-rose-600 px-4 py-1.5 text-sm font-extrabold text-white">
                STEP 3
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                회사 정보가 부실하고, 설치 후 연락이 느려진다
              </h3>
            </div>

            <p className="text-lg sm:text-xl leading-relaxed text-gray-800">
              설치 전까지는 답이 빠른데, 설치가 끝나면 “확인해볼게요”만 남기고 늦어지는 케이스가 많습니다.
              이때 고객은 사은품/조건/환수 같은 핵심을 확인하려고 해도 연결이 안 됩니다.
              그래서 <span className="font-semibold">‘연락 가능한 구조’ 자체가 안전장치</span>입니다.
            </p>

            {/* 3 column checklist */}
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-rose-200 bg-white p-5">
                <div className="text-base font-extrabold text-gray-900">사업자 정보</div>
                <p className="mt-2 text-base leading-relaxed text-gray-700">
                  사이트 하단에 사업자 정보가 공개돼 있는지 확인하세요.
                  숨기거나 애매하면 사후 책임도 흐려집니다.
                </p>
              </div>
              <div className="rounded-2xl border border-rose-200 bg-white p-5">
                <div className="text-base font-extrabold text-gray-900">증빙(문서)</div>
                <p className="mt-2 text-base leading-relaxed text-gray-700">
                  요금/사은품/유지/환수 조건을 캡처로 남길 수 있어야 합니다.
                  말로만 진행하면 분쟁 때 고객이 불리합니다.
                </p>
              </div>
              <div className="rounded-2xl border border-rose-200 bg-white p-5">
                <div className="text-base font-extrabold text-gray-900">연락 채널</div>
                <p className="mt-2 text-base leading-relaxed text-gray-700">
                  카톡만 있는 곳보다, 최소한 이메일/문의 채널이 명확한 곳이 안전합니다.
                  연락 두절은 대부분 여기서 시작됩니다.
                </p>
              </div>
            </div>

            {/* “If this happens” box */}
            <div className="mt-5 rounded-2xl border border-rose-200 bg-white p-6">
              <div className="text-base font-extrabold text-gray-900">
                설치 후 이런 일이 생기면 이렇게 대응하세요
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-sm font-extrabold text-gray-900">상황</div>
                  <p className="mt-2 text-base leading-relaxed text-gray-700">
                    “사은품 지급이 늦어짐 / 조건이 바뀜 / 환수 기준을 말 바꿈”
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-sm font-extrabold text-gray-900">대응</div>
                  <p className="mt-2 text-base leading-relaxed text-gray-700">
                    상담 당시 캡처(카톡/문자/페이지)로
                    <span className="font-semibold"> 조건을 재확인 요청</span>하고,
                    가능하면 <span className="font-semibold">요청 내용을 기록</span>으로 남기세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL checklist */}
        <section id="anti-scam-final" className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-9">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              마지막 30초 점검 (이거만 해도 거의 방어됩니다)
            </h3>
            <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
              신청 전에 아래 4가지를 “문서로” 확인하면, 분쟁 대부분이 사라집니다.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { title: "월 요금 확정 금액", desc: "‘조건 포함’ 최종 월 요금이 숫자로 확정되어야 합니다." },
                { title: "사은품 지급 시점", desc: "개통 확인 후 ○일 이내처럼 시점이 명확해야 합니다." },
                { title: "유지/환수 기준", desc: "몇 개월 유지인지, 중도 해지/정지/미납 시 환수 여부." },
                { title: "연락 가능한 채널", desc: "문제 생겼을 때 연락할 이메일/문의 채널이 명확해야 합니다." },
              ].map((x) => (
                <div key={x.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="text-base font-extrabold text-gray-900">{x.title}</div>
                  <p className="mt-2 text-base leading-relaxed text-gray-700">{x.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleApply}
                className="h-14 w-full max-w-md rounded-2xl bg-gray-900 px-7 text-base sm:text-lg font-extrabold text-white shadow-sm transition hover:opacity-95 active:scale-[0.99]"
              >
                신청하기
              </button>
            </div>

            <p className="mt-4 text-center text-sm sm:text-base text-gray-500">
              팁: 상담 중 “조건표 캡처 가능할까요?” 한 마디면 대부분 걸러집니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</section>
{/* ▲ 사기 업체 피하는법 */}

        </div>
      </div>

      <BottomPriceBar
        telco={telco}
        total={total}
        includeTv={includeTv}
        internetSelected={internetSelected}
        tvSelected={tvSelected}
        onApply={handleApply}
      />
    </div>
  );
}
