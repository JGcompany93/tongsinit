// src/pages/internet/components/BottomPriceBar.tsx
import SlotNumber from "./SlotNumber";
import { formatSpeed } from "../utils";
import type { InternetPlan, TvPlan, TelcoKey } from "../types";

import ktLogo from "../../../assets/telco-kt.png";
import skLogo from "../../../assets/telco-sk.svg";
import lguLogo from "../../../assets/telco-lgu.jpg";
import skylifeLogo from "../../../assets/telco-skylife.jpeg";
import helloLogo from "../../../assets/telco-hello.svg";

type Props = {
  telco: TelcoKey;
  total: number;
  includeTv: boolean;
  internetSelected: InternetPlan | null;
  tvSelected: TvPlan | null;
  onApply: () => void;
};

const TELCO_LOGO: Record<TelcoKey, string> = {
  KT: ktLogo,
  SK: skLogo,
  "LGU+": lguLogo,
  SKYLIFE: skylifeLogo,
  HELLO: helloLogo,
};

export default function BottomPriceBar({
  telco,
  total,
  includeTv,
  internetSelected,
  tvSelected,
  onApply,
}: Props) {
  const internetSpeed = internetSelected
    ? formatSpeed(internetSelected.speedMbps)
    : "";
  const tvName = tvSelected?.name ?? "";

  const productText = [internetSpeed || undefined, includeTv ? tvName || undefined : undefined]
    .filter(Boolean)
    .join(" + ");

  return (
    <>
      {/* ✅ 1) 화면 전체 채우는 "고정 바" */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
        {/* ✅ 모바일은 카드/텍스트가 더 높게 느껴져서 배경 높이 여유 */}
        <div className="h-[108px] lg:h-[92px]" />
      </div>

      {/* ✅ 2) 카드 */}
      <div className="fixed bottom-3 lg:bottom-4 left-1/2 z-50 -translate-x-1/2">
        {/* ✅ 모바일: 화면 폭에 맞추고, PC: 기존 860px 유지 */}
        <div className="w-[calc(100vw-24px)] max-w-[860px] rounded-2xl border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
          <div className="px-4 lg:px-6 py-3 lg:py-4">
            {/* ✅ 모바일: 세로 스택 / PC: 기존 3컬럼 */}
            <div className="grid gap-3 lg:items-center lg:gap-3 lg:[grid-template-columns:140px_minmax(0,1fr)_auto]">
              {/* 1) 로고 */}
              <div className="shrink-0">
                <div className="flex items-center h-[36px] lg:h-[44px] w-[120px] lg:w-[140px]">
                  <img
                    src={TELCO_LOGO[telco]}
                    alt={telco}
                    className="h-full w-auto object-contain"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>

              {/* 2) 상품 | 요금 */}
              <div className="min-w-0 lg:pl-4">
                {/* ✅ 모바일: 상품/요금을 같은 줄에 배치, 좁으면 자연스럽게 내려가게 */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 min-w-0">
                  {/* 상품명 */}
                  <div className="min-w-0 flex-1">
                    <div className="truncate whitespace-nowrap text-[15px] lg:text-lg font-semibold text-gray-900">
                      {productText || "상품 선택"}
                    </div>
                  </div>

                  {/* ✅ PC에서만 구분선 */}
                  <span className="hidden lg:block h-5 w-px bg-gray-300 shrink-0" />

                  {/* 요금 */}
                  <div className="shrink-0">
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap text-blue-600">
                      <span className="text-sm lg:text-base font-semibold leading-none">
                        월
                      </span>
                      <span className="text-[30px] lg:text-4xl font-semibold leading-none tabular-nums">
                        <SlotNumber value={total} />
                      </span>
                      <span className="text-sm lg:text-base font-semibold leading-none">
                        원
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3) 버튼 */}
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={onApply}
                  className="
                    h-11 lg:h-12 w-full lg:w-auto lg:min-w-[132px]
                    whitespace-nowrap
                    rounded-xl bg-indigo-600 px-5 lg:px-6
                    text-[15px] lg:text-base font-semibold text-white
                    transition hover:bg-indigo-700 active:scale-[0.99]
                  "
                >
                  상담 신청
                </button>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200/80" />
        </div>
      </div>
    </>
  );
}
