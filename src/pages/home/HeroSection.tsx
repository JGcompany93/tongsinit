import { useMemo, useRef } from "react";
import QuickIcon from "../../assets/quick-icon.png";
import type { Carrier } from "./types";
import ScrollHint from "./ScrollHint";

type Props = {
  name: string;
  setName: (v: string) => void;

  p1: string;
  p2: string;
  setP2: (v: string) => void;

  p3: string;
  setP3: (v: string) => void;

  carrier: Carrier | null;
  setCarrier: (v: Carrier) => void;

  agree: boolean;
  setAgree: (v: boolean) => void;

  canSubmit: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

export default function HeroSection({
  name,
  setName,
  p1,
  p2,
  setP2,
  p3,
  setP3,
  carrier,
  setCarrier,
  agree,
  setAgree,
  canSubmit,
  onSubmit,
}: Props) {
  const carriers: Carrier[] = useMemo(() => ["KT", "LG", "SKT"], []);
  const p2Ref = useRef<HTMLInputElement>(null);
  const p3Ref = useRef<HTMLInputElement>(null);

  const onlyDigits = (v: string) => v.replace(/\D/g, "");

  return (
    <section className="relative min-h-[105svh] overflow-hidden bg-[#0B1E5B]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 -left-44 h-[560px] w-[560px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-[620px] w-[620px] rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_85%_28%,rgba(99,102,241,0.20),transparent_45%),radial-gradient(circle_at_30%_85%,rgba(59,130,246,0.18),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.10] mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.45%22/%3E%3C/svg%3E')]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full pt-24 sm:pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 text-white pt-2">
            <div className="relative">
              <div className="pointer-events-none absolute -left-4 top-6 hidden md:block h-24 w-[2px] bg-gradient-to-b from-white/0 via-yellow-300/80 to-white/0" />

              <h1 className="mt-2 font-extrabold tracking-tight leading-[1.05]">
                <span className="block text-4xl md:text-5xl lg:text-[56px]">
                  인터넷·TV·유심 변경시
                </span>

                <span className="relative mt-6 inline-block text-5xl md:text-6xl lg:text-[68px]">
                  <span className="shine-hot drop-shadow-[0_18px_38px_rgba(255,110,0,0.18)]">
                    전국 최대 혜택
                  </span>
                </span>

                <span className="mt-4 block text-5xl md:text-6xl lg:text-[68px]">
                  당일 지급 가능!
                </span>
              </h1>

              <div className="mt-10 flex flex-wrap gap-2">
                {["당일 현금", "무료 상담", "조건 확인 1분"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-4 py-2 text-sm font-extrabold border border-white/18 bg-white/12 text-white backdrop-blur"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* ✅ 혜택 유의 문구 */}
              <p className="mt-4 text-xs sm:text-sm text-white/70">
                ※ 혜택은 통신사, 상품, 조건에 따라 상이합니다.
              </p>

              <div className="pointer-events-none mt-9 h-px w-[420px] max-w-full bg-gradient-to-r from-white/0 via-white/35 to-white/0" />
            </div>
          </div>

          <div className="lg:col-span-5 lg:justify-self-end mt-4 sm:mt-6">
            <div className="w-full max-w-[520px]">
              <div className="relative rounded-3xl bg-white border border-black/5 overflow-hidden shadow-[0_28px_0_rgba(0,0,0,0.12),0_52px_110px_rgba(0,0,0,0.30)]">
                <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
                <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[680px] -translate-x-1/2 rounded-full bg-blue-500/12 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center justify-between bg-[#2563EB] px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img src={QuickIcon} alt="" className="h-7 w-7" />
                      <h3 className="text-lg font-extrabold text-white">
                        빠른견적받기
                      </h3>
                    </div>
                    <span className="text-xs text-white/90">
                      전문 상담원이 빠르게 연락해요!
                    </span>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-5 px-6 py-6">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-900">
                        이름
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름을 입력하세요"
                        className="h-12 w-full rounded-xl border border-gray-300 px-4 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-900">
                        휴대폰 번호
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          value={p1}
                          readOnly
                          className="h-12 rounded-xl border border-gray-300 bg-gray-100 text-center text-lg font-semibold"
                        />
                        <input
                          ref={p2Ref}
                          value={p2}
                          onChange={(e) => {
                            const v = onlyDigits(e.target.value).slice(0, 4);
                            setP2(v);
                            if (v.length === 4) p3Ref.current?.focus();
                          }}
                          inputMode="numeric"
                          placeholder="1234"
                          className="h-12 rounded-xl border border-gray-300 text-center text-lg font-semibold focus:outline-none focus:border-blue-600"
                        />
                        <input
                          ref={p3Ref}
                          value={p3}
                          onChange={(e) =>
                            setP3(onlyDigits(e.target.value).slice(0, 4))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && p3.length === 0) {
                              p2Ref.current?.focus();
                            }
                          }}
                          inputMode="numeric"
                          placeholder="5678"
                          className="h-12 rounded-xl border border-gray-300 text-center text-lg font-semibold focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-900">
                        희망 통신사
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {carriers.map((c) => {
                          const active = carrier === c;
                          return (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setCarrier(c)}
                              className={[
                                "relative h-11 rounded-xl border text-sm font-extrabold transition-all duration-200",
                                active
                                  ? "border-blue-600 bg-blue-50 text-blue-700 shadow-[0_10px_22px_rgba(37,99,235,0.18)]"
                                  : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                              ].join(" ")}
                            >
                              {active && (
                                <span className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-blue-500/25" />
                              )}
                              {c}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={() => setAgree(!agree)}
                        className="h-4 w-4 accent-blue-600"
                      />
                      <span className="text-sm text-gray-700">
                        개인정보 수집 및 이용에 동의합니다.
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={[
                        "h-12 w-full rounded-xl font-extrabold text-white transition-all duration-200",
                        canSubmit
                          ? "bg-blue-600 hover:brightness-110 active:scale-[0.99]"
                          : "bg-gray-300 cursor-not-allowed",
                      ].join(" ")}
                    >
                      무료 상담 신청
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ HERO ↔ ABOUT 사이 */}
      <ScrollHint href="#about" />

      <style>{`
        .shine-hot {
          background: linear-gradient(
            90deg,
            rgba(255,214,10,0.98) 0%,
            rgba(255,120,0,0.98) 30%,
            rgba(255,30,0,0.98) 50%,
            rgba(255,120,0,0.98) 70%,
            rgba(255,214,10,0.98) 100%
          );
          background-size: 240% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: hotFlow 2.0s linear infinite;
        }
        @keyframes hotFlow {
          0% { background-position: 0% 50%; filter: brightness(1.00) saturate(1.05); }
          50% { background-position: 100% 50%; filter: brightness(1.14) saturate(1.20); }
          100% { background-position: 0% 50%; filter: brightness(1.00) saturate(1.05); }
        }
      `}</style>
    </section>
  );
}
