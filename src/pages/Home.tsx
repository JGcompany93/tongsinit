import { useEffect, useMemo, useRef, useState } from "react";
import QuickIcon from "../assets/quick-icon.png";

// ✅ PROCESS GIF (본인 파일명에 맞춰 교체)
import Step1Gif from "../assets/step1.gif";
import Step2Gif from "../assets/step2.gif";
import Step3Gif from "../assets/step3.gif";

type Carrier = "KT" | "LG" | "SKT";

type Review = {
  name: string;
  title: string;
  desc: string;
  moveTo: "KT로 이동" | "SK로 이동" | "LG로 이동";
};

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
 * ✅ 변경 포인트(요청사항)
 * - 모바일(sm 미만): 후기 1개씩 보이도록
 * - PC(sm 이상): 기존처럼 3개씩 유지
 *
 * 구현:
 * - visible을 반응형으로 계산 (모바일 1 / 그 외 3)
 * - translatePct와 item width를 visible에 맞춰 계산
 */
function ReviewsSlider({ reviews }: { reviews: Review[] }) {
  const [visible, setVisible] = useState(3);
  const total = reviews.length;

  const [index, setIndex] = useState(0);
  const [noAnim, setNoAnim] = useState(false);

  // ✅ 화면 크기에 따라 visible 변경 (모바일: 1, PC: 3)
  useEffect(() => {
    const computeVisible = () => {
      const isMobile = window.matchMedia("(max-width: 639px)").matches; // Tailwind sm 미만
      setVisible(isMobile ? 1 : 3);
    };

    computeVisible();
    window.addEventListener("resize", computeVisible);
    return () => window.removeEventListener("resize", computeVisible);
  }, []);

  // ✅ visible 변경 시 인덱스/애니메이션 안정화
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

export default function Home() {
  const carriers: Carrier[] = useMemo(() => ["KT", "LG", "SKT"], []);

  const [name, setName] = useState("");
  const [p1] = useState("010");
  const [p2, setP2] = useState("");
  const [p3, setP3] = useState("");
  const [carrier, setCarrier] = useState<Carrier | null>(null);
  const [agree, setAgree] = useState(true);

  const p2Ref = useRef<HTMLInputElement>(null);
  const p3Ref = useRef<HTMLInputElement>(null);

  const onlyDigits = (v: string) => v.replace(/\D/g, "");

  useEffect(() => {
    if (p2.length === 4) p3Ref.current?.focus();
  }, [p2]);

  const canSubmit =
    name.trim() && p2.length === 4 && p3.length === 4 && carrier && agree;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const phone = `${p1}-${p2}-${p3}`;
    console.log({ name, phone, carrier, agree });
    alert("신청이 접수되었습니다.");
  }

  const reviews: Review[] = useMemo(
    () => [
      {
        name: "김OO",
        title: "x",
        desc: "필요한 조건만 정리해줘서 고민이 줄었고, 진행이 빠르게 끝났습니다.",
        moveTo: "KT로 이동",
      },
      {
        name: "이OO",
        title: "x",
        desc: "지원 조건을 숨김 없이 설명해줘서 신뢰가 갔고 비교가 쉬웠어요.",
        moveTo: "SK로 이동",
      },
      {
        name: "박OO",
        title: "x",
        desc: "신청하자마자 연락이 와서 일정까지 한 번에 잡았습니다.",
        moveTo: "LG로 이동",
      },
      {
        name: "정OO",
        title: "x",
        desc: "강요 없이 필요한 것만 안내해줘서 부담이 전혀 없었습니다.",
        moveTo: "KT로 이동",
      },
      {
        name: "최OO",
        title: "x",
        desc: "중간 확인도 잘 해주고 설치 후에도 체크해줘서 편했습니다.",
        moveTo: "SK로 이동",
      },
      {
        name: "한OO",
        title: "x",
        desc: "복잡한 내용을 정리해줘서 이해가 쉬웠고 선택이 빨랐습니다.",
        moveTo: "LG로 이동",
      },
      {
        name: "서OO",
        title: "x",
        desc: "작은 질문에도 바로 답변해주고 안내가 정돈되어 있었습니다.",
        moveTo: "KT로 이동",
      },
      {
        name: "윤OO",
        title: "x",
        desc: "절차를 최소화해서 번거롭지 않았고 전체 흐름이 매끄러웠어요.",
        moveTo: "SK로 이동",
      },
      {
        name: "오OO",
        title: "x",
        desc: "응대 속도랑 정리 방식이 좋아서 재신청해도 여기로 할 듯합니다.",
        moveTo: "LG로 이동",
      },
    ],
    []
  );

  return (
    <>
      {/* ================== HERO ================== */}
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
                      최대 140만원 혜택
                    </span>
                  </span>

                  <span className="mt-4 block text-5xl md:text-6xl lg:text-[68px]">
                    당일 현금 지급!
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
                            onChange={(e) =>
                              setP2(onlyDigits(e.target.value).slice(0, 4))
                            }
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

      {/* ================== ABOUT (최종) ================== */}
      <section className="relative overflow-hidden bg-[#0A2B7A] min-h-[95svh]">
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
      </section>

      {/* ================== PROCESS ================== */}
      <section className="relative overflow-hidden bg-[#0B3AA8] min-h-[95svh]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_80%_35%,rgba(99,102,241,0.18),transparent_45%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-white">
            <span className="inline-flex items-center rounded-full bg-white/12 px-4 py-2 text-sm font-semibold">
              PROCESS
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-extrabold leading-tight">
              간편하게 진행해요!
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { title: "간편 접수", sub: "5분 만에 접수해요!", img: Step1Gif },
              { title: "로켓 설치", sub: "당일 설치도 가능해요!", img: Step2Gif },
              { title: "당일 입금", sub: "담당 직원에게 연락해요!", img: Step3Gif },
            ].map((x) => (
              <div
                key={x.title}
                className="relative rounded-3xl bg-white p-10 border border-black/5 shadow-[0_28px_0_rgba(0,0,0,0.14),0_48px_90px_rgba(0,0,0,0.28)]"
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-10px_20px_rgba(0,0,0,0.04)]" />
                <div className="relative">
                  <div className="flex justify-center">
                    <img
                      src={x.img}
                      alt=""
                      className="h-28 w-28 object-contain"
                      draggable={false}
                    />
                  </div>

                  <div className="mt-7 text-center">
                    <div className="text-2xl font-extrabold text-gray-900">
                      {x.title}
                    </div>
                    <div className="mt-3 text-base font-semibold text-gray-600">
                      {x.sub}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================== REVIEWS ================== */}
      <section className="relative overflow-hidden bg-[#0B4CC7] min-h-[95svh]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.18),transparent_45%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-white">
            <span className="inline-flex items-center rounded-full bg-white/12 px-4 py-2 text-sm font-semibold">
              REVIEWS
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-extrabold leading-tight">
              통신잇과 함께한 100% 리얼후기!
            </h2>
          </div>

          <ReviewsSlider reviews={reviews} />
        </div>

      </section>
    </>
  );
}
