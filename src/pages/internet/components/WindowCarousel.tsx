// src/pages/internet/components/WindowCarousel.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

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
      className="absolute top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50 transition"
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
        {dir === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}

export default function WindowCarousel<T extends { id: string }>({
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
  renderCard: (item: T, active: boolean) => ReactNode;
  className?: string;
  cardClassName?: string;
  emptyClassName?: string;
}) {
  // ✅ PC 전용(기존 유지)
  const windowSize = 3;
  const [start, setStart] = useState(0);
  const maxStart = Math.max(0, items.length - windowSize);

  // ✅ 모바일/PC 분기
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)"); // lg
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    if (start > maxStart) setStart(maxStart);
  }, [maxStart, start]);

  const canLeft = start > 0;
  const canRight = start < maxStart;

  const visible = useMemo(
    () => items.slice(start, start + windowSize),
    [items, start]
  );

  // 기본 카드 스타일(기존 톤 유지)
  const baseCard =
    "rounded-xl border border-gray-300 px-3 py-5 text-left transition min-h-[132px]";
  const baseEmpty =
    "rounded-xl border border-transparent px-3 py-5 min-h-[132px]";

  const activeClass = "border border-blue-700 bg-blue-50";
  const idleClass = "border border-gray-300 bg-white hover:bg-gray-50";

  // ✅ 선택 변경 시: 모바일에서는 해당 카드로 스크롤(체감 개선)
  useEffect(() => {
    if (!selectedId) return;

    // PC는 기존 start/window로 제어하므로 scroll 처리 불필요
    if (isDesktop) return;

    const el = scrollerRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>(`[data-card-id="${selectedId}"]`);
    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [selectedId, isDesktop]);

  // =========================
  // ✅ PC(데스크톱): 기존 그대로
  // =========================
  if (isDesktop) {
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
                  active ? activeClass : idleClass,
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

  // =========================
  // ✅ 모바일: 스와이프 캐러셀(자연스럽게)
  // =========================
  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        ref={scrollerRef}
        className={[
          "flex w-full gap-3 py-2",
          "overflow-x-auto scroll-smooth",
          "snap-x snap-mandatory",
          "pr-2",
          // 스크롤바 숨김
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        ].join(" ")}
      >
        {items.map((item) => {
          const active = item.id === selectedId;

          return (
            <button
              key={item.id}
              type="button"
              data-card-id={item.id}
              onClick={() => onSelect(item.id)}
              className={[
                // ✅ 모바일 카드 폭(고정 3칸 그리드 대신 자연스러운 폭)
                "shrink-0 snap-start",
                "w-[150px] sm:w-[170px]",
                cardClassName ?? baseCard,
                active ? activeClass : idleClass,
              ].join(" ")}
            >
              {renderCard(item, active)}
            </button>
          );
        })}

        {/* 끝 여백(마지막 카드가 화면에 붙는 느낌 방지) */}
        <div className={["shrink-0 w-2", emptyClassName ?? ""].join(" ")} />
      </div>
    </div>
  );
}
