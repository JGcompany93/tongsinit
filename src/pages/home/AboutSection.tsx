import ScrollHint from "./ScrollHint";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0A2B7A] min-h-[95svh]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.18),transparent_45%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5 text-white">
            <div className="text-xs font-semibold tracking-wide text-white/70">
              ABOUT US
            </div>

            <h2 className="mt-14 text-5xl md:text-6xl font-extrabold leading-[1.08]">
              통신잇은
              <br />
              <span className="inline-block mt-7">가능합니다</span>
            </h2>

            <p className="mt-8 text-white/80 text-base md:text-lg leading-relaxed">
              복잡한 조건은 덜어내고, 고객에게 필요한 선택만 정리합니다.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  icon: "🎯",
                  title: "고객 맞춤형 상담",
                  desc: "사용 패턴과 예산에 맞춰 가장 유리한 조건만 선별해 안내합니다.",
                },
                {
                  icon: "🔎",
                  title: "조건 한눈에 정리",
                  desc: "약정·요금·혜택을 헷갈리지 않게 핵심만 깔끔하게 정리합니다.",
                },
                {
                  icon: "💸",
                  title: "혜택 최적화 제안",
                  desc: "가능한 혜택 조합을 비교해 고객에게 유리한 선택을 제안합니다.",
                },
              ].map((x) => (
                <div
                  key={x.title}
                  className="rounded-2xl bg-white px-8 py-7 border border-black/5 shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 text-3xl leading-none mt-1">
                      {x.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="text-gray-900 text-3xl md:text-4xl font-extrabold">
                        {x.title}
                      </div>
                      <div className="mt-2 text-gray-600 text-sm md:text-base leading-relaxed">
                        {x.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-white/60 text-sm">
              ※ 상담은 무료이며, 원치 않으실 경우 언제든지 중단하실 수 있습니다.
            </div>
          </div>
        </div>
      </div>

      {/* ✅ ABOUT ↔ PROCESS 사이 */}
      <ScrollHint href="#process" />
    </section>
  );
}
