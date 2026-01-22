// src\pages\internet\InternetPage.tsx
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
                  // ✅ 왼쪽 정렬
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
                    // ✅ 왼쪽 정렬
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
