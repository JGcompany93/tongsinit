import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

type NavLinkArgs = { isActive: boolean };

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const items = useMemo(
    () => [
      { label: "홈", to: "/" },
      { label: "인터넷", to: "/internet" },
      { label: "핸드폰", to: "/phone" },
      { label: "게시판", to: "/board" },
      { label: "후기", to: "/reviews" },
      { label: "고객지원", to: "/support" }
    ],
    []
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActivePath = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname === to;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6">
        {/* 3컬럼: 좌(로고) / 중(메뉴) / 우(로그인) */}
        <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center">
          {/* 로고 (너무 가운데로 당기지 않음) */}
          <div className="flex items-center justify-start">
            <NavLink to="/" className="group flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gray-900" />
              <span className="text-xl font-bold tracking-[-0.02em] text-gray-900 transition-colors group-hover:text-blue-600">
                로고
              </span>
            </NavLink>
          </div>

          {/* 중앙 메뉴 */}
          <nav className="hidden lg:flex items-center justify-center whitespace-nowrap">
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
                      "text-[18px] font-semibold tracking-[-0.015em] whitespace-nowrap",
                      "transition-colors duration-200",
                      (isActive || active)
                        ? "text-blue-600"
                        : "text-gray-500 hover:text-blue-600"
                    ].join(" ")
                  }
                >
                  <span className="relative z-10">{it.label}</span>

                  {/* 밑줄 슬롯(항상 공간 차지해서 흔들림 방지) */}
                  <span className="pointer-events-none absolute left-1/2 top-[42px] h-[2px] w-10 -translate-x-1/2 rounded-full bg-transparent" />

                  {/* 밑줄: 활성은 항상, 비활성은 hover 시 스르륵 */}
                  <span
                    className={[
                      "pointer-events-none absolute left-1/2 top-[42px] h-[2px] -translate-x-1/2 rounded-full",
                      "bg-blue-600",
                      "transition-all duration-300",
                      active
                        ? "w-10 opacity-100"
                        : "w-0 opacity-0 group-hover:w-10 group-hover:opacity-100"
                    ].join(" ")}
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* 우측: 로그인 + 모바일 메뉴 */}
          <div className="flex items-center justify-end gap-2">
            <NavLink
              to="/login"
              className="hidden lg:inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-[15px] font-semibold text-gray-600 transition-colors hover:bg-gray-200"
            >
              로그인
            </NavLink>

            <button
              className="lg:hidden inline-flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="메뉴"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? "닫기" : "메뉴"}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {mobileOpen && (
          <div className="lg:hidden pb-4">
            <div className="mt-3 rounded-xl border bg-white shadow-sm">
              <div className="grid grid-cols-2 gap-2 p-3">
                {items.map((it) => (
                  <NavLink
                    key={it.to}
                    to={it.to}
                    end={it.to === "/"}
                    className={({ isActive }: NavLinkArgs) =>
                      [
                        "rounded-lg px-3 py-2 text-center text-[16px] font-semibold transition-colors whitespace-nowrap",
                        isActive
                          ? "text-blue-600 bg-blue-50/60"
                          : "text-gray-500 hover:text-blue-600 hover:bg-blue-50/60"
                      ].join(" ")
                    }
                  >
                    {it.label}
                  </NavLink>
                ))}

                <NavLink
                  to="/login"
                  className="col-span-2 rounded-lg bg-gray-100 px-3 py-2 text-center text-[15px] font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  로그인
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
