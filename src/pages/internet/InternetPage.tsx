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

{/* ▼ 사기 업체 피하는법 (깔끔/시각화/예시 중심) */}
<section className="pt-10">
  <div className="mx-auto w-full max-w-6xl px-5">
    {/* 헤더 */}
    <div className="rounded-3xl border border-gray-200 bg-gray-50 p-7 sm:p-10">
      <div className="flex flex-col items-center text-center gap-4">
        <img
          src={scrollDown}
          alt="scroll down"
          className="h-8 w-8 opacity-55"
          style={{ filter: "grayscale(1)" }}
          draggable={false}
        />
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          5분 만에 사기업체 피하는법
        </h2>
        <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-gray-600">
          글로 길게 설명할 필요 없습니다. 아래 3가지 “패턴”만 보면 됩니다.
          <br className="hidden sm:block" />
          낚시 업체는 조건표(캡처)로 못 남깁니다.
        </p>

        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-semibold text-gray-700">
            체크리스트 3개
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-semibold text-gray-700">
            예시 포함
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-semibold text-gray-700">
            캡처로 끝
          </span>
        </div>
      </div>
    </div>

    {/* 3 카드: 요금 / 사은품 / 연락 */}
    <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
      {/* 1 */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        {/* 이미지/아이콘 자리 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-extrabold text-gray-900">1) 요금이 너무 싸다</div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            요금 함정
          </span>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-gray-700">
          “데이터 무제한 월 2만원대”, “인터넷+TV 월 1만원대”
          같은 말이 먼저 나오면 의심부터 하세요.
          진짜 싸게 보이게 만들고, 조건으로 회수하는 패턴이 많습니다.
        </p>

        <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm font-extrabold text-gray-900">현실 예시</div>
          <ul className="mt-3 space-y-2 text-base text-gray-700 leading-relaxed">
            <li>• “처음 3개월만 할인” → 이후 정상가로 상승</li>
            <li>• “카드 발급하면 할인” → 실적 조건 미충족 시 할인 없음</li>
            <li>• “부가서비스 2~3개 유지” → 안 하면 사은품/할인 취소</li>
          </ul>
        </div>

        <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <div className="text-sm font-extrabold text-blue-900">딱 1문장으로 거르기</div>
          <p className="mt-2 text-base leading-relaxed text-blue-900">
            “월 요금이 조건 포함해서 정확히 얼마인지, 캡처로 남겨주세요.”
          </p>
        </div>
      </div>

      {/* 2 */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-extrabold text-gray-900">2) 사은품을 나눠준다</div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
            먹튀 패턴
          </span>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-gray-700">
          “개통되면 일부 먼저, 나머지는 6개월/1년 뒤 지급”
          같은 분할·지연 지급은 대표적인 위험 신호입니다.
          시간이 지나면 증빙이 약해지고, 담당자가 바뀌며, 지급이 흐려집니다.
        </p>

        <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm font-extrabold text-gray-900">이 말이 나오면 주의</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              “나머지는 ○개월 뒤”
            </span>
            <span className="rounded-full bg-white border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              “1년 유지하면 지급”
            </span>
            <span className="rounded-full bg-white border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              “정산 끝나면 드려요”
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="text-sm font-extrabold text-amber-900">딱 1문장으로 거르기</div>
          <p className="mt-2 text-base leading-relaxed text-amber-900">
            “사은품은 개통 확인 후 언제 지급인지, 날짜 기준으로 안내해 주세요.”
          </p>
        </div>
      </div>

      {/* 3 */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-extrabold text-gray-900">3) 연락이 끊긴다</div>
          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
            사후 리스크
          </span>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-gray-700">
          설치 전엔 빠르다가 설치 후 갑자기 느려지면, 분쟁이 생겼을 때 답이 없습니다.
          특히 “전화 없음 + 카톡만” 구조는 리스크가 커집니다.
        </p>

        <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm font-extrabold text-gray-900">최소 확인 3개</div>
          <ul className="mt-3 space-y-2 text-base text-gray-700 leading-relaxed">
            <li>• 사업자 정보가 사이트에 공개돼 있는가</li>
            <li>• 유지/환수 기준이 안내돼 있는가</li>
            <li>• 문의 이메일/채널이 명확한가</li>
          </ul>
        </div>

        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <div className="text-sm font-extrabold text-rose-900">딱 1문장으로 거르기</div>
          <p className="mt-2 text-base leading-relaxed text-rose-900">
            “문제 생기면 어디로 문의하면 되나요? 공식 문의 채널 알려주세요.”
          </p>
        </div>
      </div>
    </div>

    {/* 한눈에 보는 표 */}
    <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
      <div className="text-xl sm:text-2xl font-extrabold text-gray-900">
        한눈에 보는 “정리표”
      </div>
      <p className="mt-2 text-base sm:text-lg text-gray-600 leading-relaxed">
        아래 표에서 한 줄이라도 “애매”하면 캡처 요청 → 회피하면 패스.
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200">
        <div className="grid grid-cols-3 bg-gray-50 text-sm sm:text-base font-bold text-gray-700">
          <div className="p-4">체크 항목</div>
          <div className="p-4 border-l border-gray-200">안전 신호</div>
          <div className="p-4 border-l border-gray-200">위험 신호</div>
        </div>

        <div className="grid grid-cols-3 text-sm sm:text-base text-gray-700">
          <div className="p-4">월 요금</div>
          <div className="p-4 border-l border-gray-200">조건 포함 “확정 금액” 제시</div>
          <div className="p-4 border-l border-gray-200">“대충 이 정도” + 조건 나중</div>

          <div className="p-4 border-t border-gray-200">사은품 지급</div>
          <div className="p-4 border-l border-t border-gray-200">개통 확인 후 “○일 이내”</div>
          <div className="p-4 border-l border-t border-gray-200">6개월/1년 뒤, 분할 지급</div>

          <div className="p-4 border-t border-gray-200">유지/환수</div>
          <div className="p-4 border-l border-t border-gray-200">유지 기간·환수 기준 명시</div>
          <div className="p-4 border-l border-t border-gray-200">“그런 건 없어요”/회피</div>

          <div className="p-4 border-t border-gray-200">증빙</div>
          <div className="p-4 border-l border-t border-gray-200">캡처/문서 제공 가능</div>
          <div className="p-4 border-l border-t border-gray-200">“전화로만 설명”</div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-7 flex justify-center">
        <button
          onClick={handleApply}
          className="h-14 w-full max-w-md rounded-2xl bg-gray-900 px-7 text-base sm:text-lg font-extrabold text-white shadow-sm transition hover:opacity-95 active:scale-[0.99]"
        >
          신청하기
        </button>
      </div>

      <p className="mt-4 text-center text-sm sm:text-base text-gray-500">
        팁: “캡처로 남겨주세요” 한 마디에 태도가 바뀌면, 그게 답입니다.
      </p>
    </div>

    {/* 이미지/아이콘 추천 (사용자가 교체할 수 있게) */}
    <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
      <div className="text-lg sm:text-xl font-extrabold text-gray-900">
        (선택) 여기에 넣으면 좋은 이미지/아이콘 예시
      </div>
      <p className="mt-2 text-base sm:text-lg text-gray-600 leading-relaxed">
        원하시면 아래처럼 “시각 아이콘”을 각 카드 맨 위에 넣으면 훨씬 보기 좋아집니다.
      </p>
      <ul className="mt-4 space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
        <li>• 요금: 가격표/계산기/원화 아이콘</li>
        <li>• 사은품: 선물상자/입금/타임라인 아이콘</li>
        <li>• 연락: 전화기/채팅/경고 아이콘</li>
        <li>• 표 섹션: 체크리스트/문서(캡처) 아이콘</li>
      </ul>
      <p className="mt-3 text-sm text-gray-500">
        이미지 파일은 사용자가 직접 넣을 수 있도록 구성했습니다.
      </p>
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
