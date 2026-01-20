import { useEffect, useMemo, useState } from "react";

/* =======================
   Types
======================= */
type TelcoKey = "KT" | "LGU+" | "SK" | "SKYLIFE" | "HELLO";

type InternetPlan = {
  id: string;
  speedMbps: number;
  name: string;
  soloPrice: number;
  bundlePrice: number;
};

type TvPlan = {
  id: string;
  channels: number;
  name: string;
  price: number;
};

type TelcoCatalog = {
  telco: TelcoKey;
  label: string;
  internet: InternetPlan[];
  tv: TvPlan[];
};

/* =======================
   Utils
======================= */
function formatWon(n: number) {
  return `${n.toLocaleString("ko-KR")}원`;
}

function formatSpeed(speedMbps: number) {
  return speedMbps >= 1000 ? "1 Gbps" : `${speedMbps} Mbps`;
}

/* =======================
   Slot Number (Total)
======================= */
function SlotNumber({ value }: { value: number }) {
  const str = value.toLocaleString("ko-KR");

  return (
    <span className="inline-flex items-baseline leading-none">
      {str.split("").map((ch, i) => {
        if (ch === ",") {
          return (
            <span key={`c-${i}`} className="mx-[0.08em] leading-none">
              ,
            </span>
          );
        }

        const digit = Number(ch);

        return (
          <span
            key={`d-${i}`}
            className="relative inline-block h-[1em] w-[0.65em] overflow-hidden"
          >
            <span
              className="absolute left-0 top-0 w-full transition-transform duration-500 ease-out will-change-transform"
              style={{ transform: `translateY(-${digit}em)` }}
            >
              {Array.from({ length: 10 }).map((_, n) => (
                <div key={n} className="h-[1em] w-full text-center leading-[1em]">
                  {n}
                </div>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

/* =======================
   Carousel UI
======================= */
function ArrowButton({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "이전" : "다음"}
      className="absolute top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50 transition"
      style={dir === "left" ? { left: -10 } : { right: -10 }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 mx-auto text-gray-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}

/**
 * - 화면에는 항상 3개만 보임
 * - 버튼 누르면 1칸씩 이동
 * - 끝이면 해당 방향 버튼 숨김
 */
function WindowCarousel<T extends { id: string }>({
  items,
  selectedId,
  onSelect,
  renderCard,
  className,
  cardClassName,
  emptyClassName,
}: {
  items: T[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  renderCard: (item: T, active: boolean) => React.ReactNode;
  className?: string;
  cardClassName?: string;
  emptyClassName?: string;
}) {
  const windowSize = 3;
  const [start, setStart] = useState(0);

  const maxStart = Math.max(0, items.length - windowSize);

  useEffect(() => {
    if (start > maxStart) setStart(maxStart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, maxStart]);

  const canLeft = start > 0;
  const canRight = start < maxStart;

  const visible = items.slice(start, start + windowSize);

  // 기본(인터넷/TV) 카드: “세로 늘리고” + “테두리 진한 회색”
  const 나머지_카드 =
    "rounded-lg border border-gray-300 px-3 py-7 text-left transition min-h-[160px]";
  const 나머지_빈칸 =
    "rounded-lg border border-transparent px-3 py-7 min-h-[160px]";

  return (
    <div className={`relative ${className ?? ""}`}>
      {canLeft && (
        <ArrowButton
          dir="left"
          onClick={() => setStart((s) => Math.max(0, s - 1))}
        />
      )}
      {canRight && (
        <ArrowButton
          dir="right"
          onClick={() => setStart((s) => Math.min(maxStart, s + 1))}
        />
      )}

      <div className="grid grid-cols-3 gap-3 py-2">
        {visible.map((item) => {
          const active = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={[
                cardClassName ?? 나머지_카드,
                active
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-gray-300 bg-white hover:bg-gray-50",
              ].join(" ")}
            >
              {renderCard(item, active)}
            </button>
          );
        })}

        {Array.from({ length: Math.max(0, windowSize - visible.length) }).map(
          (_, i) => (
            <div key={`empty-${i}`} className={emptyClassName ?? 나머지_빈칸} />
          )
        )}
      </div>
    </div>
  );
}

/* =======================
   Catalog Data
======================= */
const CATALOG: TelcoCatalog[] = [
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

/* =======================
   Page
======================= */
export default function Internet() {
  const [telco, setTelco] = useState<TelcoKey>("SK");
  const [includeTv, setIncludeTv] = useState(false);

  const catalog = useMemo(
    () => CATALOG.find((c) => c.telco === telco) ?? CATALOG[0],
    [telco]
  );

  // ✅ 첫 렌더 0원/깜빡임 방지: 초기값을 데이터로 설정
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

  // ✅ TV 포함 켰는데 tvId 비어있으면 자동 채움
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

  // ✅ 통신사 변경 시 “총요금 구역 새로고침 느낌” 방지
  const handleSelectTelco = (nextTelco: TelcoKey) => {
    const nextCatalog = CATALOG.find((c) => c.telco === nextTelco) ?? CATALOG[0];
    setTelco(nextTelco);
    setInternetId(nextCatalog.internet[0]?.id ?? null);
    setTvId(nextCatalog.tv[0]?.id ?? null);
  };

  // ✅ 신청 버튼: 홈으로 이동
  const handleApply = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto w-full max-w-6xl px-6 py-6">
        <div className="space-y-12">
          {/* 배너 (문구 제거 요청 반영) */}

          {/* 통신사 */}
          <section className="flex items-start justify-center gap-8">
            <div className="w-[140px] pt-2 text-xl font-bold">통신사</div>

            <div className="w-full max-w-[820px] pl-5">
              <WindowCarousel
                items={CATALOG.map((c) => ({ id: c.telco, label: c.label }))}
                selectedId={telco}
                onSelect={(id) => handleSelectTelco(id as TelcoKey)}
                // 통신사 카드만 세로 작게
                cardClassName="rounded-lg border border-gray-300 px-3 py-4 text-left transition min-h-[72px]"
                emptyClassName="rounded-lg border border-transparent px-3 py-4 min-h-[72px]"
                renderCard={(item) => (
                  <div className="flex h-full w-full items-center justify-center">
                    {/* ✅ 모바일에서 너무 커/잘림 방지: 폰트만 반응형으로 축소 */}
                    <span className="font-extrabold tracking-wide text-sm sm:text-base">
                      {item.label}
                    </span>
                  </div>
                )}
              />
            </div>
          </section>

          {/* 인터넷 속도 */}
          <section className="flex items-start justify-center gap-8">
            <div className="w-[140px] pt-2 text-xl font-bold">인터넷 속도</div>

            <div className="w-full max-w-[820px] pl-5 space-y-3">
              <WindowCarousel
                key={`internet-${telco}-${includeTv ? "tv" : "solo"}`}
                items={catalog.internet}
                selectedId={internetId}
                onSelect={setInternetId}
                renderCard={(p) => (
                  <div className="space-y-3">
                    <div className="text-[28px] font-light text-black tracking-[-0.02em]">
                      {formatSpeed(p.speedMbps)}
                    </div>

                    <div className="text-sm font-medium text-gray-500">
                      {p.name}
                    </div>

                    <div className="pt-1 text-xl font-normal text-blue-600">
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
            <section className="flex items-start justify-center gap-8">
              <div className="w-[140px] pt-2 text-xl font-bold">TV 채널</div>

              <div className="w-full max-w-[820px] pl-5">
                <WindowCarousel
                  key={`tv-${telco}`}
                  items={catalog.tv}
                  selectedId={tvId}
                  onSelect={setTvId}
                  renderCard={(p) => (
                    <div className="space-y-3">
                      <div className="text-[28px] font-light text-black tracking-[-0.02em]">
                        {p.channels} 채널
                      </div>

                      <div className="text-sm font-medium text-gray-500">
                        {p.name}
                      </div>

                      <div className="pt-1 text-xl font-normal text-blue-600">
                        월 {formatWon(p.price)}
                      </div>
                    </div>
                  )}
                />
              </div>
            </section>
          )}

          {/* 총 요금 */}
          <section className="flex flex-col items-center justify-center gap-4">
            <div className="w-full max-w-[520px]">
              <div className="rounded-lg border border-gray-300 bg-white p-6 text-center">
                <div className="mt-2 flex items-center justify-center gap-1 text-blue-600 tracking-[-0.02em]">
                  <span className="text-2xl font-semibold leading-none relative top-[-0.06em]">
                    월
                  </span>

                  <span className="text-5xl font-semibold leading-none flex items-center">
                    <SlotNumber value={total} />
                  </span>

                  <span className="text-2xl font-semibold leading-none relative top-[-0.06em]">
                    원
                  </span>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleApply}
                    className="w-full rounded-lg bg-indigo-600 py-5 text-base font-semibold text-white transition hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.99]"
                  >
                    비밀 지원금 받기
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
