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
      { label: "고객지원", to: "/support" }
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
    // ✅ bg-white/80 -> bg-white (완전 불투명)
    // ✅ 필요 없으면 backdrop-blur 제거(아래처럼)
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center">
          {/* 좌측 */}
          <div className="flex items-center justify-start">
            {/* PC 로고 */}
            <div className="hidden lg:flex items-center">
              <NavLink to="/" className="flex items-center">
                <img
                  src={Logo}
                  alt="로고"
                  className="h-11 w-auto object-contain"
                />
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
                          : "text-gray-500 hover:text-blue-600"
                      ].join(" ")
                    }
                  >
                    <span className="relative z-10">{it.label}</span>
                    <span
                      className={[
                        "pointer-events-none absolute left-1/2 top-[42px] h-[2px] -translate-x-1/2 rounded-full bg-blue-600 transition-all duration-300",
                        active
                          ? "w-10 opacity-100"
                          : "w-0 opacity-0 group-hover:w-10 group-hover:opacity-100"
                      ].join(" ")}
                    />
                  </NavLink>
                );
              })}
            </nav>

            {/* 모바일 중앙 로고 */}
            <NavLink to="/" className="lg:hidden flex items-center">
              <img
                src={Logo}
                alt="로고"
                className="h-10 w-auto object-contain"
              />
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
            mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          ].join(" ")}
        >
          <div className="absolute inset-0 top-[72px]">
            <div
              className={[
                "absolute inset-0 bg-gray-900/60 transition-opacity duration-300",
                mobileOpen ? "opacity-100" : "opacity-0"
              ].join(" ")}
              onClick={() => setMobileOpen(false)}
            />

            <aside
              className={[
                "absolute left-0 top-0 h-full w-[78vw] max-w-[320px] bg-white shadow-xl transition-transform duration-300 ease-out",
                mobileOpen ? "translate-x-0" : "-translate-x-full"
              ].join(" ")}
            >
              {/* 모바일 메뉴 내부는 기존 구조 그대로 사용 */}
            </aside>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
