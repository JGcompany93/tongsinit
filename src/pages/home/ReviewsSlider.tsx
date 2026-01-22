import { useEffect, useMemo, useState } from "react";
import type { Review } from "./types";

function Stars5() {
  return (
    <div className="flex items-center gap-1 text-yellow-500 text-lg leading-none">
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </div>
  );
}

/**
 * - 모바일(sm 미만): 1개
 * - PC(sm 이상): 3개
 */
export default function ReviewsSlider({ reviews }: { reviews: Review[] }) {
  const [visible, setVisible] = useState(3);
  const total = reviews.length;

  const [index, setIndex] = useState(0);
  const [noAnim, setNoAnim] = useState(false);

  useEffect(() => {
    const computeVisible = () => {
      const isMobile = window.matchMedia("(max-width: 639px)").matches;
      setVisible(isMobile ? 1 : 3);
    };

    computeVisible();
    window.addEventListener("resize", computeVisible);
    return () => window.removeEventListener("resize", computeVisible);
  }, []);

  useEffect(() => {
    setNoAnim(true);
    setIndex(0);
    const t = window.setTimeout(() => setNoAnim(false), 0);
    return () => window.clearTimeout(t);
  }, [visible]);

  const items = useMemo(() => {
    if (total === 0) return [];
    return [...reviews, ...reviews.slice(0, Math.min(visible, total))];
  }, [reviews, total, visible]);

  useEffect(() => {
    if (total <= visible) return;
    const t = window.setInterval(() => setIndex((i) => i + 1), 3200);
    return () => window.clearInterval(t);
  }, [total, visible]);

  useEffect(() => {
    if (total <= visible) return;
    if (index === total) {
      const timer = window.setTimeout(() => {
        setNoAnim(true);
        setIndex(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setNoAnim(false));
        });
      }, 720);
      return () => window.clearTimeout(timer);
    }
  }, [index, total, visible]);

  const translatePct = (index * 100) / visible;

  return (
    <div className="mt-12">
      <div className="rounded-[34px] border border-white/20 bg-white/10 p-4 backdrop-blur">
        <div className="overflow-hidden rounded-[28px]">
          <div
            className="flex"
            style={{
              transform: `translateX(-${translatePct}%)`,
              transition: noAnim
                ? "none"
                : "transform 680ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {items.map((x, i) => (
              <div
                key={`${x.desc}-${i}`}
                className="shrink-0 px-4"
                style={{ width: `${100 / visible}%` }}
              >
                <div className="h-full rounded-[28px] bg-white border border-black/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)] p-8 min-h-[290px] flex flex-col">
                  <div className="flex items-start justify-between gap-5">
                    <Stars5 />
                    <span className="shrink-0 rounded-full bg-white text-gray-900 border border-black/15 px-4 py-1.5 text-sm font-extrabold">
                      {x.moveTo}
                    </span>
                  </div>

                  <div className="mt-6 text-[18px] text-gray-800 leading-relaxed flex-1">
                    {x.desc}
                  </div>

                  <div className="mt-8 text-base font-extrabold text-gray-900">
                    {x.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 네비게이터 없음 */}
    </div>
  );
}
