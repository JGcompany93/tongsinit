import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

// 로고 이미지
import Logo from "../assets/logo.svg";

type NavLinkArgs = { isActive: boolean };

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const items = useMemo(
    () => [
      { label: "홈", to: "/" },
      { label: "인터넷", to: "/internet" },
      { label: "고객지원", to: "/support" },
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

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center">
          {/* 좌측 */}
          <div className="flex items-center justify-start">
            {/* PC 로고 */}
            <div className="hidden lg:flex items-center">
              <NavLink to="/" className="flex items-center">
                <img src={Logo} alt="로고" className="h-11 w-auto object-contain" />
              </NavLink>
            </div>

            {/* 모바일 햄버거 */}
            <button
              className="lg:hidden inline-flex items-center justify-center p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={mobileOpen}
            >
              <span className="relative block h-6 w-6">
                <span className="absolute left-0 top-[6px] h-[2px] w-6 rounded-full bg-gray-500" />
                <span className="absolute left-0 top-[12px] h-[2px] w-6 rounded-full bg-gray-500" />
                <span className="absolute left-0 top-[18px] h-[2px] w-6 rounded-full bg-gray-500" />
              </span>
            </button>
          </div>

          {/* 중앙 */}
          <div className="flex items-center justify-center">
            {/* PC 메뉴 */}
            <nav className="hidden lg:flex items-center whitespace-nowrap">
              {items.map((it) => {
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

            {/* 모바일 중앙 로고 */}
            <NavLink to="/" className="lg:hidden flex items-center">
              <img src={Logo} alt="로고" className="h-10 w-auto object-contain" />
            </NavLink>
          </div>

          {/* 우측 */}
          <div className="flex items-center justify-end">
            <span className="hidden lg:block text-[20px] font-semibold text-gray-700 tracking-wide">
              1111-2222
            </span>
          </div>
        </div>
      </div>

      {/* 모바일 드로어 */}
      {createPortal(
        <div
          className={[
            "lg:hidden fixed inset-0 z-[9999]",
            mobileOpen ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
          aria-hidden={!mobileOpen}
        >
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
              aria-label="모바일 메뉴"
            >
              {/* 상단 헤더 */}
              <div className="flex items-center justify-between border-b px-5 py-4">
                <NavLink
                  to="/"
                  className="flex items-center"
                  onClick={() => setMobileOpen(false)}
                >
                  <img src={Logo} alt="로고" className="h-9 w-auto object-contain" />
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

              {/* 메뉴 리스트 */}
              <nav className="px-3 py-4">
                {items.map((it) => {
                  const active = isActivePath(it.to);
                  return (
                    <NavLink
                      key={it.to}
                      to={it.to}
                      end={it.to === "/"}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }: NavLinkArgs) =>
                        [
                          "flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition",
                          isActive || active
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-900 hover:bg-gray-50",
                        ].join(" ")
                      }
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
                    </NavLink>
                  );
                })}

                <div className="mt-4 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-xs font-semibold text-gray-500">고객센터</div>
                  <div className="mt-1 text-lg font-extrabold text-gray-900">
                    1111-2222
                  </div>
                </div>
              </nav>
            </aside>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
