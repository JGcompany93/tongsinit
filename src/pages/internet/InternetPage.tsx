// src/pages/internet/InternetPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

const TELCO_KEYS: TelcoKey[] = ["SK", "KT", "LGU+", "SKYLIFE", "HELLO"];
const isTelcoKey = (v: string | null): v is TelcoKey =>
  !!v && TELCO_KEYS.includes(v as TelcoKey);

export default function InternetPage() {
  const [searchParams] = useSearchParams();

  const [telco, setTelco] = useState<TelcoKey>(() => {
    const q = searchParams.get("telco");
    return isTelcoKey(q) ? q : "SK";
  });

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

  // ✅ 헤더에서 /internet?telco=XXX 로 들어왔을 때 "선택된 상태" 맞추기
  useEffect(() => {
    const q = searchParams.get("telco");
    if (!isTelcoKey(q)) return;
    if (q === telco) return;

    const nextCatalog = CATALOG.find((c) => c.telco === q) ?? CATALOG[0];
    setTelco(q);
    setInternetId(nextCatalog.internet[0]?.id ?? null);
    setTvId(nextCatalog.tv[0]?.id ?? null);
  }, [searchParams, telco]);

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
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto w-full max-w-6xl px-5 py-5 pb-[108px]">
        <div className="space-y-10">
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
                    item.id === "LGU+" || item.id === "HELLO" || item.id === "SKYLIFE";

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

          {/* ✅ 5분만에 사기업체 피하는법 (복구 / 짧게 1,2,3) */}
          <section className="pt-6">
            <div className="flex flex-col items-center text-center gap-3 py-6">
              <img
                src={scrollDown}
                alt="scroll down"
                className="h-7 w-7 opacity-60"
                style={{ filter: "grayscale(1)" }}
                draggable={false}
                loading="lazy"
              />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                5분 만에 사기업체 피하는법
              </h2>
              <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-gray-600">
                아래 3가지만 체크하면 대부분 걸러집니다.
              </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-8">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-extrabold text-blue-700">1</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    말도 안 되게 싼 요금
                  </div>
                </div>
                <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-700">
                  “월 1만원대”, “무제한 2만원대”처럼 과하게 낮은 가격이면,
                  카드/부가서비스/할인기간 같은 조건이 붙는 경우가 많습니다.
                  조건 포함한 <span className="font-semibold text-gray-900">확정 월요금</span>을
                  캡처로 먼저 받으세요.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-extrabold text-blue-700">2</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    사은품 분할/지연 지급
                  </div>
                </div>
                <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-700">
                  “6개월 뒤”, “1년 뒤”, “정산 끝나면”은 위험 신호입니다.
                  사은품은 <span className="font-semibold text-gray-900">개통 확인 후 ○일 이내</span>처럼
                  날짜 기준으로 문구를 남겨야 안전합니다.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-extrabold text-blue-700">3</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    연락/증빙이 애매한 곳
                  </div>
                </div>
                <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-700">
                  “전화로만 안내”, “나중에 정리”처럼 증빙을 피하는 곳은 주의하세요.
                  가입 전 안내 내용을 <span className="font-semibold text-gray-900">문자/카톡 캡처로 남길 수 있는지</span>
                  먼저 확인하면 분쟁을 크게 줄일 수 있습니다.
                </p>
              </div>
            </div>
          </section>
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
