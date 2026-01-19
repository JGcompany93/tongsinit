import { useEffect, useMemo, useState } from "react";

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

function formatWon(n: number) {
  return `${n.toLocaleString("ko-KR")}원`;
}

function formatSpeed(speedMbps: number) {
  return speedMbps >= 1000 ? "1 Gbps" : `${speedMbps} Mbps`;
}

/** ✅ 총요금 슬롯머신 숫자 (항상 보이게: 1em 단위로 이동) */
function SlotNumber({ value }: { value: number }) {
  const str = value.toLocaleString("ko-KR");

  return (
    <span className="inline-flex items-baseline">
      {str.split("").map((ch, i) => {
        if (ch === ",") {
          return (
            <span key={`c-${i}`} className="mx-[0.08em]">
              ,
            </span>
          );
        }

        const digit = Number(ch);

        return (
          <span
            key={`d-${i}`}
            className="relative inline-block h-[1em] w-[0.65em] overflow-hidden align-baseline"
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

  // ✅ 기본(인터넷/TV) 박스 스타일
  const baseCard = "rounded-lg border px-3 py-7 text-left transition min-h-[160px]";
  const baseEmpty = "rounded-lg border border-transparent px-3 py-7 min-h-[160px]";

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
                cardClassName ?? baseCard,
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
            <div key={`empty-${i}`} className={emptyClassName ?? baseEmpty} />
          )
        )}
      </div>
    </div>
  );
}

/** ✅ 데이터 */
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
      // ✅ 추가: 스카이라이프 1기가(단독 35,200 / 결합은 기존 로직대로 bundlePrice 사용)
      { id: "sky_i_1000", speedMbps: 1000, name: "기가 1G", soloPrice: 35200, bundlePrice: 0 },
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

/* =========================
   ✅ 사은품 매핑 (총요금에만 표시)
   ========================= */
type GiftKey = `${TelcoKey}|${string}|${"SOLO" | "TV"}|${string}`;
type Gift = { amountMan: number }; // 만원 단위

function makeGiftKey(
  telco: TelcoKey,
  internetId: string | null,
  includeTv: boolean,
  tvId: string | null
): GiftKey | null {
  if (!internetId) return null;
  const mode = includeTv ? "TV" : "SOLO";
  const tvPart = includeTv ? (tvId ?? "NONE") : "NONE";
  return `${telco}|${internetId}|${mode}|${tvPart}` as GiftKey;
}

function formatGiftMan(n: number) {
  return `${n}만원`;
}

const GIFTS: Partial<Record<GiftKey, Gift>> = {
  /* KT 단독 */
  "KT|kt_i_100|SOLO|NONE": { amountMan: 9 },
  "KT|kt_i_500|SOLO|NONE": { amountMan: 14 },
  "KT|kt_i_1000|SOLO|NONE": { amountMan: 14 },
  /* KT + TV */
  "KT|kt_i_100|TV|kt_t_238": { amountMan: 37 },
  "KT|kt_i_100|TV|kt_t_240": { amountMan: 37 },
  "KT|kt_i_100|TV|kt_t_263": { amountMan: 37 },
  "KT|kt_i_100|TV|kt_t_250": { amountMan: 37 },
  "KT|kt_i_500|TV|kt_t_238": { amountMan: 45 },
  "KT|kt_i_500|TV|kt_t_240": { amountMan: 45 },
  "KT|kt_i_500|TV|kt_t_263": { amountMan: 45 },
  "KT|kt_i_500|TV|kt_t_250": { amountMan: 45 },
  "KT|kt_i_1000|TV|kt_t_238": { amountMan: 45 },
  "KT|kt_i_1000|TV|kt_t_240": { amountMan: 45 },
  "KT|kt_i_1000|TV|kt_t_263": { amountMan: 45 },
  "KT|kt_i_1000|TV|kt_t_250": { amountMan: 45 },

  /* LGU+ 단독 */
  "LGU+|lgu_i_100|SOLO|NONE": { amountMan: 20 },
  "LGU+|lgu_i_500|SOLO|NONE": { amountMan: 23 },
  "LGU+|lgu_i_1000|SOLO|NONE": { amountMan: 23 },
  /* LGU+ + TV */
  "LGU+|lgu_i_100|TV|lgu_t_219": { amountMan: 40 },
  "LGU+|lgu_i_100|TV|lgu_t_225": { amountMan: 40 },
  "LGU+|lgu_i_100|TV|lgu_t_253": { amountMan: 40 },
  "LGU+|lgu_i_500|TV|lgu_t_219": { amountMan: 47 },
  "LGU+|lgu_i_500|TV|lgu_t_225": { amountMan: 47 },
  "LGU+|lgu_i_500|TV|lgu_t_253": { amountMan: 47 },
  "LGU+|lgu_i_1000|TV|lgu_t_219": { amountMan: 47 },
  "LGU+|lgu_i_1000|TV|lgu_t_225": { amountMan: 47 },
  "LGU+|lgu_i_1000|TV|lgu_t_253": { amountMan: 47 },

  /* SK 단독 */
  "SK|sk_i_100|SOLO|NONE": { amountMan: 11 },
  "SK|sk_i_500|SOLO|NONE": { amountMan: 17 },
  "SK|sk_i_1000|SOLO|NONE": { amountMan: 17 },
  /* SK + TV */
  "SK|sk_i_100|TV|sk_t_182": { amountMan: 40 },
  "SK|sk_i_100|TV|sk_t_236": { amountMan: 40 },
  "SK|sk_i_100|TV|sk_t_252": { amountMan: 40 },
  "SK|sk_i_500|TV|sk_t_182": { amountMan: 48 },
  "SK|sk_i_500|TV|sk_t_236": { amountMan: 48 },
  "SK|sk_i_500|TV|sk_t_252": { amountMan: 48 },
  "SK|sk_i_1000|TV|sk_t_182": { amountMan: 48 },
  "SK|sk_i_1000|TV|sk_t_236": { amountMan: 48 },
  "SK|sk_i_1000|TV|sk_t_252": { amountMan: 48 },

  /* SKYLIFE 단독 */
  "SKYLIFE|sky_i_100|SOLO|NONE": { amountMan: 10 },
  "SKYLIFE|sky_i_200|SOLO|NONE": { amountMan: 12 },
  "SKYLIFE|sky_i_500|SOLO|NONE": { amountMan: 14 },
  "SKYLIFE|sky_i_1000|SOLO|NONE": { amountMan: 15 },

  /* SKYLIFE + TV */
  "SKYLIFE|sky_i_100|TV|sky_t_193": { amountMan: 35 },
  "SKYLIFE|sky_i_100|TV|sky_t_206": { amountMan: 35 },
  "SKYLIFE|sky_i_200|TV|sky_t_193": { amountMan: 36 },
  "SKYLIFE|sky_i_200|TV|sky_t_206": { amountMan: 36 },
  "SKYLIFE|sky_i_500|TV|sky_t_193": { amountMan: 42 },
  "SKYLIFE|sky_i_500|TV|sky_t_206": { amountMan: 42 },
  "SKYLIFE|sky_i_1000|TV|sky_t_193": { amountMan: 48 },
  "SKYLIFE|sky_i_1000|TV|sky_t_206": { amountMan: 48 },

  /* HELLO 단독 */
  "HELLO|hello_i_100|SOLO|NONE": { amountMan: 13 },
  "HELLO|hello_i_500|SOLO|NONE": { amountMan: 18 },
  "HELLO|hello_i_1000|SOLO|NONE": { amountMan: 20 },
  /* HELLO + TV */
  "HELLO|hello_i_100|TV|hello_t_102": { amountMan: 23 },
  "HELLO|hello_i_100|TV|hello_t_109": { amountMan: 30 },
  "HELLO|hello_i_100|TV|hello_t_245": { amountMan: 30 },
  "HELLO|hello_i_500|TV|hello_t_102": { amountMan: 31 },
  "HELLO|hello_i_500|TV|hello_t_109": { amountMan: 35 },
  "HELLO|hello_i_500|TV|hello_t_245": { amountMan: 35 },
  "HELLO|hello_i_1000|TV|hello_t_102": { amountMan: 34 },
  "HELLO|hello_i_1000|TV|hello_t_109": { amountMan: 40 },
  "HELLO|hello_i_1000|TV|hello_t_245": { amountMan: 40 },
};

export default function Internet() {
  const [telco, setTelco] = useState<TelcoKey>("SK");
  const [includeTv, setIncludeTv] = useState(false);

  const catalog = useMemo(
    () => CATALOG.find((c) => c.telco === telco) ?? CATALOG[0],
    [telco]
  );

  const [internetId, setInternetId] = useState<string | null>(null);
  const [tvId, setTvId] = useState<string | null>(null);

  useEffect(() => {
    setInternetId(catalog.internet[0]?.id ?? null);
    setTvId(catalog.tv[0]?.id ?? null);
  }, [catalog]);

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

  // ✅ 현재 선택 조합의 사은품 (총요금에만 표시)
  const giftKey = makeGiftKey(telco, internetId, includeTv, tvId);
  const gift = giftKey ? GIFTS[giftKey] : undefined;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto w-full max-w-6xl px-6 py-6">
        <div className="space-y-12">
          {/* 배너 */}
          <div className="w-full rounded-xl border border-gray-300 bg-white px-6 py-6">
            <div className="text-lg font-semibold text-gray-900 tracking-[-0.02em]">
              통신사별 인터넷 · TV 요금을 한눈에 비교해보세요
            </div>
          </div>

          {/* 통신사 */}
          <section className="flex items-start justify-center gap-8">
            <div className="w-[140px] pt-2 text-xl font-bold">통신사</div>

            <div className="w-full max-w-[820px] pl-5">
              <WindowCarousel
                items={CATALOG.map((c) => ({ id: c.telco, label: c.label }))}
                selectedId={telco}
                onSelect={(id) => setTelco(id as TelcoKey)}
                // ✅ 통신사만 작게
                cardClassName="rounded-lg border px-3 py-4 text-left transition min-h-[72px]"
                emptyClassName="rounded-lg border border-transparent px-3 py-4 min-h-[72px]"
                renderCard={(item) => (
                  <div className="text-base font-extrabold">{item.label}</div>
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
                    <div className="text-3xl font-light text-black tracking-[-0.02em]">
                      {formatSpeed(p.speedMbps)}
                    </div>
                    <div className="text-sm font-medium text-gray-500">{p.name}</div>
                    <div className="pt-1 text-lg font-normal text-blue-600">
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
                      <div className="text-3xl font-light text-black tracking-[-0.02em]">
                        {p.channels} 채널
                      </div>
                      <div className="text-sm font-medium text-gray-500">{p.name}</div>
                      <div className="pt-1 text-lg font-normal text-blue-600">
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
                <div className="text-sm font-semibold text-gray-700">총 요금</div>

                <div className="mt-2 text-6xl font-semibold text-blue-600 tracking-[-0.02em]">
                  월 <SlotNumber value={total} />원
                </div>

                {/* ✅ 사은품은 총 요금에만 표시 */}
                {gift && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                      사은품
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatGiftMan(gift.amountMan)}
                    </span>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full rounded-lg bg-gray-900 py-5 text-sm font-semibold text-white hover:bg-gray-800 transition"
                  >
                    상담 신청
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
