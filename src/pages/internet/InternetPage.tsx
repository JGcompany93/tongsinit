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

{/* ▼ 사기 업체 피하는법 (롱폼 가독성 버전) */}
<section className="pt-6">
  <div className="mx-auto w-full max-w-[820px] pl-4">
    {/* 헤더 */}
    <div className="flex flex-col items-center gap-3 py-8">
      <img
        src={scrollDown}
        alt="scroll down"
        className="h-6 w-6 opacity-50"
        style={{ filter: "grayscale(1)" }}
        draggable={false}
      />
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
        5분 만에 사기업체 피하는 법
      </h2>
      <p className="text-sm sm:text-base text-gray-500 text-center">
        인터넷·TV 가입, 아래 3가지만 알고 가면
        <br className="hidden sm:block" />
        쓸데없는 손해는 거의 막을 수 있습니다.
      </p>
    </div>

    {/* STEP 1 */}
    <div className="space-y-4 py-6">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white">
          STEP 1
        </span>
        <h3 className="text-lg font-extrabold text-gray-900">
          통신사보다 말도 안 되게 싼 요금제를 제안한다
        </h3>
      </div>

      <p className="text-sm leading-relaxed text-gray-700">
        “데이터 무제한이 월 2만원대”, “인터넷+TV가 커피값 수준”  
        이런 제안, 한 번쯤은 보셨을 겁니다.
      </p>

      <p className="text-sm leading-relaxed text-gray-700">
        하지만 현실적으로 통신 요금은 구조가 정해져 있습니다.
        통신사가 책정한 기본 요금에서 벗어나
        갑자기 몇 만 원이 빠지는 건 거의 불가능합니다.
      </p>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
        ✔️ 실제로는<br />
        · 고가 요금제 강제<br />
        · 카드 발급 조건<br />
        · 불필요한 부가서비스 유지<br />
        같은 조건을 뒤에 붙여서 회수하는 경우가 많습니다.
      </div>

      <p className="text-sm font-semibold text-gray-900">
        👉 “싸다”는 말보다,  
        <span className="text-blue-600"> 정확한 요금표와 유지 조건</span>을 먼저 확인하세요.
      </p>
    </div>

    {/* 구분선 */}
    <div className="my-8 h-px w-full bg-gray-200" />

    {/* STEP 2 */}
    <div className="space-y-4 py-6">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white">
          STEP 2
        </span>
        <h3 className="text-lg font-extrabold text-gray-900">
          사은품을 나눠서 준다고 한다
        </h3>
      </div>

      <p className="text-sm leading-relaxed text-gray-700">
        “개통되면 일부 먼저 드리고,  
        나머지는 6개월 뒤 / 1년 뒤에 드릴게요.”
      </p>

      <p className="text-sm leading-relaxed text-gray-700">
        이 말이 나오면 **위험 신호**입니다.
        시간이 지나면 담당자가 바뀌거나,
        업체가 사라지거나,
        조건을 이유로 지급을 미루는 경우가 정말 많습니다.
      </p>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
        ❌ 자주 발생하는 패턴<br />
        · “담당자가 퇴사했다”<br />
        · “조건이 바뀌었다”<br />
        · “다음 달에 처리된다”
      </div>

      <p className="text-sm font-semibold text-gray-900">
        👉 사은품은  
        <span className="text-blue-600">개통 확인 후 명확한 시점</span>에
        지급되는 곳이 안전합니다.
      </p>
    </div>

    {/* 구분선 */}
    <div className="my-8 h-px w-full bg-gray-200" />

    {/* STEP 3 */}
    <div className="space-y-4 py-6">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white">
          STEP 3
        </span>
        <h3 className="text-lg font-extrabold text-gray-900">
          회사 정보가 불분명하고, 연락이 끊긴다
        </h3>
      </div>

      <p className="text-sm leading-relaxed text-gray-700">
        회사 전화번호가 없거나,
        카카오톡만 남기고
        전화를 피하는 경우도 주의해야 합니다.
      </p>

      <p className="text-sm leading-relaxed text-gray-700">
        특히 설치 전에는 친절하다가,
        설치가 끝난 뒤부터
        연락이 잘 안 되는 패턴은 매우 흔합니다.
      </p>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
        ✔️ 최소한 이것들은 확인하세요<br />
        · 사업자 정보 공개 여부<br />
        · 유지 조건 및 환수 기준<br />
        · 연락 가능한 창구 존재 여부
      </div>
    </div>

    {/* CTA */}
    <div className="mt-10 flex justify-center">
      <button
        onClick={handleApply}
        className="h-12 w-full max-w-sm rounded-xl bg-gray-900 px-6 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-[0.99]"
      >
        조건 확인하고 신청하기
      </button>
    </div>
  </div>
</section>
{/* ▲ 사기 업체 피하는법 */}

          {/* ▲ 사기 업체 피하는법 섹션 */}
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
