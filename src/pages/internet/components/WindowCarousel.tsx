// src\pages\internet\components\WindowCarousel.tsx
import { useEffect, useState } from "react";
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
        {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
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
  const windowSize = 3;
  const [start, setStart] = useState(0);

  const maxStart = Math.max(0, items.length - windowSize);

  useEffect(() => {
    if (start > maxStart) setStart(maxStart);
  }, [items.length, maxStart]);

  const canLeft = start > 0;
  const canRight = start < maxStart;

  const visible = items.slice(start, start + windowSize);

  const baseCard =
    "rounded-lg border border-gray-300 px-3 py-5 text-left transition min-h-[132px]";
  const baseEmpty =
    "rounded-lg border border-transparent px-3 py-5 min-h-[132px]";

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
                  ? "border border-blue-700 bg-blue-50"
                  : "border border-gray-300 bg-white hover:bg-gray-50",
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
