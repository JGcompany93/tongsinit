// src/components/Header.tsx
import { useEffect, useMemo, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { createPortal } from "react-dom";

// 로고 이미지
import Logo from "../assets/logo.svg";

type NavLinkArgs = { isActive: boolean };
type TelcoQuickKey = "SK" | "KT" | "LGU+" | "SKYLIFE" | "HELLO";

const TELCO_KEYS: TelcoQuickKey[] = ["SK", "KT", "LGU+", "SKYLIFE", "HELLO"];
const isTelcoKey = (v: string | null): v is TelcoQuickKey =>
  !!v && TELCO_KEYS.includes(v as TelcoQuickKey);

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ✅ 메뉴: 홈 + 5개 통신사(바로 인터넷으로 이동)
  const items = useMemo(
    () => [
      { kind: "link" as const, label: "홈", to: "/" },
      { kind: "telco" as const, label: "SK", telco: "SK" as TelcoQuickKey },
      { kind: "telco" as const, label: "LG", telco: "LGU+" as TelcoQuickKey },
      { kind: "telco" as const, label: "KT", telco: "KT" as TelcoQuickKey },
      {
        kind: "telco" as const,
        label: "스카이라이프",
        telco: "SKYLIFE" as TelcoQuickKey,
      },
      {
        kind: "telco" as const,
        label: "헬로비전",
        telco: "HELLO" as TelcoQuickKey,
      },
    ],
    []
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // 모바일 드로어 열렸을 때 스크롤 방지 + ESC 닫기
  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const isActivePath = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname === to;

  const goInternetWithTelco = (telco: TelcoQuickKey) => {
    const params = new URLSearchParams();
    params.set("telco", telco);
    setMobileOpen(false);
    navigate(`/internet?${params.toString()}`);
  };

  // ✅ 현재 인터넷 페이지에서 선택된 통신사(헤더 강조용)
  const selectedTelcoOnInternet: TelcoQuickKey | null = (() => {
    if (location.pathname !== "/internet") return null;
    const q = searchParams.get("telco");
    return isTelcoKey(q) ? q : null;
  })();

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      {/* ✅ 데스크톱에서만 고정폭 정책 적용 (모바일에서는 절대 min-w 강제하지 않음) */}
      <div className="w-full lg:min-w-[1200px]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid h-[72px] grid-cols-3 items-center">
            {/* ===== 데스크톱: 좌측(로고) ===== */}
            <div className="hidden lg:flex items-center justify-end pr-40">
              <NavLink to="/" className="flex items-center">
                <img
                  src={Logo}
                  alt="로고"
                  className="h-11 w-auto object-contain"
                />
              </NavLink>
            </div>

            {/* ===== 데스크톱: 중앙(메뉴) ===== */}
            <nav className="hidden lg:flex items-center justify-center whitespace-nowrap">
              {items.map((it) => {
                if (it.kind === "telco") {
                  const active = selectedTelcoOnInternet === it.telco;

                  return (
                    <button
                      key={`telco-${it.telco}`}
                      type="button"
                      onClick={() => goInternetWithTelco(it.telco)}
                      className={[
                        "group relative mx-1 rounded-lg px-3 py-2",
                        "text-[18px] font-semibold tracking-[-0.015em]",
                        active
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-blue-600",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      <span className="relative z-10">{it.label}</span>
                      <span
                        className={[
                          "pointer-events-none absolute left-1/2 top-[42px] h-[2px] -translate-x-1/2 rounded-full bg-blue-600 transition-all duration-300",
                          active
                            ? "w-10 opacity-100"
                            : "w-0 opacity-0 group-hover:w-10 group-hover:opacity-100",
                        ].join(" ")}
                      />
                    </button>
                  );
                }

                const active = isActivePath(it.to);
                return (
                  <NavLink
                    key={it.to}
                    to={it.to}
                    end={it.to === "/"}
                    className={({ isActive }: NavLinkArgs) =>
                      [
                        "group relative mx-1 rounded-lg px-3 py-2",
                        "text-[18px] font-semibold tracking-[-0.015em]",
                        isActive || active
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-blue-600",
                      ].join(" ")
                    }
                  >
                    <span className="relative z-10">{it.label}</span>
                    <span
                      className={[
                        "pointer-events-none absolute left-1/2 top-[42px] h-[2px] -translate-x-1/2 rounded-full bg-blue-600 transition-all duration-300",
                        active
                          ? "w-10 opacity-100"
                          : "w-0 opacity-0 group-hover:w-10 group-hover:opacity-100",
                      ].join(" ")}
                    />
                  </NavLink>
                );
              })}
            </nav>

            {/* ===== 데스크톱: 우측(전화번호 - 텍스트) ===== */}
            <div className="hidden lg:flex items-center justify-start pl-40">
              <div className="leading-tight">
                <div className="text-[16px] font-semibold text-gray-700">
                  고객센터
                </div>
                <div className="text-[20px] font-extrabold text-gray-900 tracking-tight">
                  1877-1093
                </div>
              </div>
            </div>

            {/* ===== 모바일: 좌측(햄버거) ===== */}
            <div className="flex lg:hidden items-center justify-start">
              <button
                className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-50"
                onClick={() => setMobileOpen(true)}
                aria-label="메뉴 열기"
                aria-expanded={mobileOpen}
                type="button"
              >
                <span className="relative block h-6 w-6">
                  <span className="absolute left-0 top-[6px] h-[2px] w-6 rounded-full bg-gray-600" />
                  <span className="absolute left-0 top-[12px] h-[2px] w-6 rounded-full bg-gray-600" />
                  <span className="absolute left-0 top-[18px] h-[2px] w-6 rounded-full bg-gray-600" />
                </span>
              </button>
            </div>

            {/* ===== 모바일: 중앙(로고) ===== */}
            <div className="flex lg:hidden items-center justify-center">
              <NavLink to="/" className="flex items-center">
                <img
                  src={Logo}
                  alt="로고"
                  className="h-10 w-auto object-contain"
                />
              </NavLink>
            </div>

            {/* ===== 모바일: 우측(전화번호 - 텍스트) ===== */}
            <div className="flex lg:hidden items-center justify-end">
              <div className="text-right leading-tight">
                <div className="text-xs font-semibold text-gray-600">
                  고객센터
                </div>
                <div className="text-[15px] font-extrabold text-gray-900">
                  1877-1093
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 모바일 드로어 ===== */}
      {createPortal(
        <div
          className={[
            "lg:hidden fixed inset-0 z-[9999]",
            mobileOpen ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
          aria-hidden={!mobileOpen}
        >
          {/* ✅ 헤더 높이(72px) 아래부터 덮기 */}
          <div className="absolute inset-0 top-[72px]">
            {/* 오버레이 */}
            <div
              className={[
                "absolute inset-0 bg-gray-900/60 transition-opacity duration-300",
                mobileOpen ? "opacity-100" : "opacity-0",
              ].join(" ")}
              onClick={() => setMobileOpen(false)}
            />

            {/* 드로어 */}
            <aside
              className={[
                "absolute left-0 top-0 h-full w-[78vw] max-w-[320px] bg-white shadow-xl transition-transform duration-300 ease-out",
                mobileOpen ? "translate-x-0" : "-translate-x-full",
              ].join(" ")}
              role="dialog"
              aria-modal="true"
              aria-label="모바일 메뉴"
            >
              {/* 상단 헤더 */}
              <div className="flex items-center justify-between border-b px-5 py-4">
                <NavLink
                  to="/"
                  className="flex items-center"
                  onClick={() => setMobileOpen(false)}
                >
                  <img
                    src={Logo}
                    alt="로고"
                    className="h-9 w-auto object-contain"
                  />
                </NavLink>

                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                  aria-label="메뉴 닫기"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 전화번호 안내 */}
              <div className="border-b px-5 py-4">
                <div className="text-sm font-semibold text-gray-700">
                  고객센터
                </div>
                <div className="mt-1 text-xl font-extrabold text-gray-900">
                  1877-1093
                </div>
              </div>

              {/* 메뉴 리스트 */}
              <nav className="px-3 py-4">
                {items.map((it) => {
                  if (it.kind === "telco") {
                    const active = selectedTelcoOnInternet === it.telco;

                    return (
                      <button
                        key={`m-telco-${it.telco}`}
                        type="button"
                        onClick={() => goInternetWithTelco(it.telco)}
                        className={[
                          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition",
                          active
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-900 hover:bg-gray-50",
                        ].join(" ")}
                      >
                        <span>{it.label}</span>
                        <svg
                          viewBox="0 0 24 24"
                          className={[
                            "h-5 w-5",
                            active ? "text-blue-600" : "text-gray-400",
                          ].join(" ")}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    );
                  }

                  return (
                    <NavLink
                      key={it.to}
                      to={it.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold text-gray-900 transition hover:bg-gray-50"
                    >
                      <span>{it.label}</span>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </NavLink>
                  );
                })}
              </nav>
            </aside>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
