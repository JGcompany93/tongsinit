import ScrollDownIcon from "../../assets/scroll-down.svg";

type Props = {
  href: string;
  label?: string;
  className?: string;
};

export default function ScrollHint({
  href,
  label = "아래로",
  className,
}: Props) {
  return (
    <>
      <a
        href={href}
        aria-label={`${label} 이동`}
        className={[
          "absolute bottom-6 left-1/2 -translate-x-1/2",
          "flex flex-col items-center gap-2",
          "transition-opacity duration-200",
          className ?? "",
        ].join(" ")}
      >
        <span className="text-[11px] font-semibold tracking-wide text-white/70">
          {label}
        </span>

        {/* ✅ 아이콘 1개 */}
        <img
          src={ScrollDownIcon}
          alt=""
          draggable={false}
          className="scroll-icon h-6 w-6"
        />
      </a>

      <style>{`
        .scroll-icon {
          animation: iconDown 1.2s ease-in-out infinite;
          filter: brightness(0) invert(1); /* 🔥 SVG 무조건 흰색 */
          opacity: 0.85;
          will-change: transform, opacity;
        }

        @keyframes iconDown {
          0% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(8px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
}
