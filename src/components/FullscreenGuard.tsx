import { useEffect, useMemo, useState } from "react";

type Props = {
  /** 화면 대비 최소 비율 (예: 0.9 = 화면의 90% 이상이어야 통과) */
  minRatio?: number;
  /** PC에서만 적용 */
  pcOnly?: boolean;
};

function isPcDevice() {
  return (
    window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? true
  );
}

export default function FullscreenGuard({ minRatio = 0.9, pcOnly = true }: Props) {
  const [blocked, setBlocked] = useState(false);

  const enabled = useMemo(() => {
    if (!pcOnly) return true;
    return typeof window !== "undefined" ? isPcDevice() : true;
  }, [pcOnly]);

  useEffect(() => {
    if (!enabled) return;

    const check = () => {
      const avail = window.screen?.availWidth || window.innerWidth;
      // 창 너비가 화면(모니터) 대비 minRatio 미만이면 차단
      setBlocked(window.innerWidth < avail * minRatio);
    };

    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [enabled, minRatio]);

  if (!enabled || !blocked) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 7h18" />
            <path d="M7 7v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7" />
            <path d="M8 12h8" />
          </svg>
        </div>

        <h2 className="text-lg font-extrabold text-gray-900">
          전체화면에서만 이용 가능합니다
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          브라우저 창을 최대화하거나 전체화면(F11)으로 전환해 주세요.
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              alert("브라우저 창을 최대화(□) 또는 F11(전체화면)을 사용해 주세요.");
            }}
            className="h-11 rounded-xl bg-black px-4 text-sm font-semibold text-white hover:bg-gray-900 transition"
          >
            전체화면 방법 보기
          </button>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="h-11 rounded-xl bg-gray-100 px-4 text-sm font-semibold text-gray-800 hover:bg-gray-200 transition"
          >
            새로고침
          </button>
        </div>
      </div>
    </div>
  );
}
