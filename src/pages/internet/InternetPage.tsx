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

{/* ▼ 사기 업체 피하는법 (롱폼/큰 글씨/가독성 강화) */}
<section className="pt-8">
  <div className="mx-auto w-full max-w-[820px] pl-4">
    {/* 헤더 */}
    <div className="flex flex-col items-center gap-4 py-10">
      <img
        src={scrollDown}
        alt="scroll down"
        className="h-8 w-8 opacity-55"
        style={{ filter: "grayscale(1)" }}
        draggable={false}
      />
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 text-center">
        5분 만에 사기업체 피하는법
      </h2>
      <p className="text-base sm:text-lg text-gray-500 text-center leading-relaxed">
        인터넷·TV 가입은 “조건”을 잘못 잡으면 돈을 더 내고도,
        <br className="hidden sm:block" />
        사은품까지 못 받는 경우가 생깁니다.
        <br className="hidden sm:block" />
        아래 3가지만 체크하면 이상한 곳은 대부분 걸러집니다.
      </p>
    </div>

    {/* 인트로 박스 */}
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-7">
      <div className="text-sm sm:text-base font-extrabold text-gray-900">
        먼저, “사기/먹튀”는 이렇게 시작합니다
      </div>
      <ul className="mt-4 space-y-2.5 text-base sm:text-lg text-gray-700 leading-relaxed">
        <li>• 말도 안 되게 싼 요금으로 관심을 끈다</li>
        <li>• 사은품을 “나눠서” 준다고 한다</li>
        <li>• 설치 끝나면 연락이 느려지거나 사라진다</li>
      </ul>
      <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
        이 3개가 조합되면 거의 “정석”입니다.  
        반대로 말하면, 이 3개만 피하면 안전 확률이 급상승합니다.
      </p>
    </div>

    {/* STEP 1 */}
    <div className="mt-12 space-y-5">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-extrabold text-white">
          STEP 1
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          통신사보다 “터무니없이 싼” 요금제로 유혹
        </h3>
      </div>

      <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
        예를 들어 이런 말이 나오면 일단 멈추세요.
        <span className="font-semibold text-gray-900">
          {" "}
          “데이터 무제한 월 2만원대”, “인터넷+TV 월 1만원대”
        </span>
        처럼요.
        통신요금은 통신사 정책과 약정 구조가 있어서, 기본 틀을 한 방에 깨는 건 거의 어렵습니다.
      </p>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
        <div className="text-base sm:text-lg font-extrabold text-gray-900">
          이런 식으로 “뒤에서 회수”합니다
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm font-extrabold text-gray-900">조건 끼워넣기</div>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              고가 요금제 유지, 카드 발급, 부가서비스 몇 개월 유지 같은 조건을 붙여
              “처음만 싸게” 보이게 만드는 경우가 많습니다.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm font-extrabold text-gray-900">해지/위약금 유도</div>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              중간에 바꾸거나 해지하면 위약금이 커지는데,
              그걸 제대로 안내하지 않거나 “나중에 해결”이라고 얼버무립니다.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
        <div className="text-base sm:text-lg font-extrabold text-gray-900">
          바로 써먹는 체크 질문 (이거 물어보면 대부분 갈립니다)
        </div>
        <ul className="mt-3 space-y-2 text-lg text-gray-700 leading-relaxed">
          <li>• “월 요금이 정확히 얼마고, 그 요금이 유지되는 조건이 뭐예요?”</li>
          <li>• “부가서비스/카드/고가 요금제 유지 조건이 있어요?”</li>
          <li>• “조건 문서로 남겨주세요(캡처/문자/카톡).”</li>
        </ul>
      </div>
    </div>

    {/* 구분선 */}
    <div className="my-14 h-px w-full bg-gray-200" />

    {/* STEP 2 */}
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-extrabold text-white">
          STEP 2
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          사은품 “분할 입금 / 몇 달 뒤 지급”은 위험 신호
        </h3>
      </div>

      <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
        “개통되면 일부 먼저 드리고 나머지는 6개월 뒤”, “1년 유지하면 나머지 지급”
        이 말이 나오면 거의 대부분 여기서 문제가 시작됩니다.
        시간이 길어질수록 분쟁은 늘고, 고객은 증빙을 챙기기 어렵습니다.
      </p>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
        <div className="text-base sm:text-lg font-extrabold text-gray-900">
          분할 지급이 위험한 이유 (현실 버전)
        </div>
        <div className="mt-4 space-y-3 text-lg text-gray-700 leading-relaxed">
          <p>
            <span className="font-semibold text-gray-900">1)</span> 담당자가 바뀌면 “그런 약속 없었다”가 나오기 쉽습니다.
          </p>
          <p>
            <span className="font-semibold text-gray-900">2)</span> 업체가 광고비·정산 문제로 흔들리면 지급이 늦어지기 시작합니다.
          </p>
          <p>
            <span className="font-semibold text-gray-900">3)</span> 시간이 지나면 고객도 캡처/증빙을 놓치고, 결국 포기하게 됩니다.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
        <div className="text-base sm:text-lg font-extrabold text-gray-900">
          안전한 곳은 보통 이렇게 말합니다
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-sm font-extrabold text-gray-900">지급 기준이 명확</div>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              “개통 확인 후 ○일 이내 지급”처럼 시점이 분명합니다.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-sm font-extrabold text-gray-900">조건이 문서화</div>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              카톡/문자/안내 페이지로 조건을 남겨 줍니다.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="text-base sm:text-lg font-extrabold text-gray-900">
          한 줄 결론
        </div>
        <p className="mt-2 text-lg leading-relaxed text-gray-700">
          사은품을 “나눠서” 준다는 말이 나오면,
          <span className="font-semibold text-gray-900"> 지급이 아니라 ‘미루는 구조’</span>일 가능성이 큽니다.
        </p>
      </div>
    </div>

    {/* 구분선 */}
    <div className="my-14 h-px w-full bg-gray-200" />

    {/* STEP 3 */}
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-extrabold text-white">
          STEP 3
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          전화/사업자 정보가 부실하고, 설치 후 연락이 느려진다
        </h3>
      </div>

      <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
        정말 많이 나오는 케이스입니다.
        설치 전에는 답장이 빠르다가, 설치가 끝난 뒤부터 갑자기 “읽씹”, “답변 지연”이 시작됩니다.
        이때 문제가 생기면 고객은 어디에 연락해야 할지 막막해집니다.
      </p>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-7">
        <div className="text-base sm:text-lg font-extrabold text-gray-900">
          가입 전에 최소 확인 3종 세트
        </div>
        <ol className="mt-4 space-y-2 text-lg text-gray-700 leading-relaxed">
          <li>
            <span className="font-extrabold text-gray-900">1)</span>{" "}
            사업자 정보가 사이트에 공개돼 있는가
          </li>
          <li>
            <span className="font-extrabold text-gray-900">2)</span>{" "}
            유지 조건/환수 기준이 명확히 안내돼 있는가
          </li>
          <li>
            <span className="font-extrabold text-gray-900">3)</span>{" "}
            문제 생겼을 때 연락 가능한 창구가 있는가
          </li>
        </ol>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="text-base sm:text-lg font-extrabold text-gray-900">
          자주 나오는 “위험 멘트”
        </div>
        <div className="mt-3 space-y-2 text-lg text-gray-700 leading-relaxed">
          <p>• “일단 설치부터 하고 나중에 맞춰드릴게요.”</p>
          <p>• “그건 다들 그렇게 해요. 걱정 마세요.”</p>
          <p>• “지금 당장 신청해야 혜택 돼요.”</p>
        </div>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          이런 멘트가 나오면,
          <span className="font-semibold text-gray-900"> 조건을 문서로 남기는지</span>부터 확인하는 게 안전합니다.
        </p>
      </div>
    </div>

    {/* CTA */}
    <div className="mt-14 flex justify-center pb-2">
      <button
        onClick={handleApply}
        className="h-14 w-full max-w-md rounded-2xl bg-gray-900 px-7 text-base sm:text-lg font-extrabold text-white shadow-sm transition hover:opacity-95 active:scale-[0.99]"
      >
        신청하기
      </button>
    </div>

    <p className="mt-6 text-center text-sm sm:text-base text-gray-500">
      신청 전에 조건(요금/유지/환수/지급 시점)만 문서로 남겨두면,
      불필요한 분쟁이 거의 사라집니다.
    </p>
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
