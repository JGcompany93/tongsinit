export default function SlotNumber({ value }: { value: number }) {
  const str = value.toLocaleString("ko-KR");

  return (
    <span className="inline-flex items-baseline leading-none">
      {str.split("").map((ch, i) => {
        if (ch === ",") {
          return (
            <span key={`c-${i}`} className="mx-[0.08em] leading-none">
              ,
            </span>
          );
        }

        const digit = Number(ch);

        return (
          <span
            key={`d-${i}`}
            className="relative inline-block h-[1em] w-[0.65em] overflow-hidden"
          >
            <span
              className="absolute left-0 top-0 w-full transition-transform duration-500 ease-out will-change-transform"
              style={{ transform: `translateY(-${digit}em)` }}
            >
              {Array.from({ length: 10 }).map((_, n) => (
                <div
                  key={n}
                  className="h-[1em] w-full text-center leading-[1em]"
                >
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
