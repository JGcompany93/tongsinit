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

  const productText = [
    internetSpeed || undefined,
    includeTv ? tvName || undefined : undefined,
  ]
    .filter(Boolean)
    .join(" + ");

  return (
    <>
      {/* ✅ 1) 화면 전체 채우는 "고정 바" (이게 기준점) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
        {/* 높이 확보(카드가 올라와도 뒤 배경이 안정적으로 받쳐줌) */}
        <div className="h-[92px]" />
      </div>

      {/* ✅ 2) 카드: 화면(뷰포트) 기준으로 좌표 고정 → 절대 안 흔들리게 */}
      <div className="fixed bottom-4 left-[50vw] z-50 -translate-x-1/2">
        {/* 폭은 기존 느낌 유지(고정) */}
        <div className="w-[860px] rounded-2xl border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
          <div className="px-6 py-4">
            <div className="grid items-center gap-3 [grid-template-columns:140px_minmax(0,1fr)_auto]">
              {/* 1) 로고 */}
              <div className="shrink-0">
                <div className="flex items-center h-[44px] w-[140px]">
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
              <div className="min-w-0 pl-4">
                <div className="flex items-center gap-8 min-w-0">
                  {/* 상품명 */}
                  <div className="min-w-0 flex-1">
                    <div className="truncate whitespace-nowrap text-lg font-semibold text-gray-900">
                      {productText || "상품 선택"}
                    </div>
                  </div>

                  {/* 구분선 */}
                  <span className="h-5 w-px bg-gray-300 shrink-0" />

                  {/* 요금 */}
                  <div className="shrink-0">
                    <div className="flex items-baseline gap-2 whitespace-nowrap text-blue-600">
                      <span className="text-base font-semibold leading-none">
                        월
                      </span>
                      <span className="text-4xl font-semibold leading-none tabular-nums">
                        <SlotNumber value={total} />
                      </span>
                      <span className="text-base font-semibold leading-none">
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
                    h-12 min-w-[132px]
                    whitespace-nowrap
                    rounded-xl bg-indigo-600 px-6
                    text-base font-semibold text-white
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
