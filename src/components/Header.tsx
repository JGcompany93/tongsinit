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
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6">
        {/* 3컬럼: 좌 / 중 / 우  (PC는 기존 유지, 모바일만 배치 변경) */}
        <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center">
          {/* 좌측: PC 로고 유지 / 모바일 햄버거 */}
          <div className="flex items-center justify-start">
            {/* PC 로고 (기존 그대로) */}
            <div className="hidden lg:flex items-center justify-start">
              <NavLink to="/" className="group flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-gray-900" />
                <span className="text-xl font-bold tracking-[-0.02em] text-gray-900 transition-colors group-hover:text-blue-600">
                  로고
                </span>
              </NavLink>
            </div>

            {/* 모바일: 햄버거 버튼 (맨 왼쪽) */}
            <button
              className="lg:hidden inline-flex items-center justify-center p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={mobileOpen}
            >
              {/* 투명 배경 + 회색 줄 3개 */}
              <span className="relative block h-6 w-6">
                <span className="absolute left-0 top-[6px] h-[2px] w-6 rounded-full bg-gray-500" />
                <span className="absolute left-0 top-[12px] h-[2px] w-6 rounded-full bg-gray-500" />
                <span className="absolute left-0 top-[18px] h-[2px] w-6 rounded-full bg-gray-500" />
              </span>
            </button>
          </div>

          {/* 중앙: PC 메뉴 유지 / 모바일 로고 중앙 */}
          <div className="flex items-center justify-center">
            {/* PC 중앙 메뉴 (기존 그대로) */}
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

                    {/* 밑줄 슬롯 */}
                    <span className="pointer-events-none absolute left-1/2 top-[42px] h-[2px] w-10 -translate-x-1/2 rounded-full bg-transparent" />

                    {/* 밑줄: 활성/hover */}
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

            {/* 모바일 로고 (헤더 정중앙) */}
            <NavLink to="/" className="lg:hidden group flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gray-900" />
              <span className="text-[18px] font-bold tracking-[-0.02em] text-gray-900 transition-colors group-hover:text-blue-600">
                로고
              </span>
            </NavLink>
          </div>

          {/* 우측: PC 로그인 유지 / 모바일은 빈 공간(정중앙 고정용) */}
          <div className="flex items-center justify-end gap-2">
            <NavLink
              to="/login"
              className="hidden lg:inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-[15px] font-semibold text-gray-600 transition-colors hover:bg-gray-200"
            >
              로그인
            </NavLink>
          </div>
        </div>
      </div>

      {/* 모바일 드로어 메뉴 (모바일만)
          - 헤더(72px) 아래에서만 나오게 해서 "헤더/기존 메뉴와 겹침" 방지 */}
      <div
        className={[
          "lg:hidden",
          "fixed left-0 right-0 bottom-0 top-[72px] z-[60]",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        ].join(" ")}
        aria-hidden={!mobileOpen}
      >
        {/* 오버레이: 남는 공간 회색 어둡게 */}
        <div
          className={[
            "absolute inset-0 bg-gray-900/40",
            "transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          ].join(" ")}
          onClick={() => setMobileOpen(false)}
        />

        {/* 왼쪽 패널 (햄버거가 왼쪽이므로 패널도 왼쪽에서 나오게) */}
        <aside
          className={[
            "absolute left-0 top-0 h-full w-[78vw] max-w-[320px] bg-white shadow-xl",
            "transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          ].join(" ")}
        >
          {/* 상단 영역 */}
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gray-900" />
              <span className="text-[16px] font-bold tracking-[-0.02em] text-gray-900">
                메뉴
              </span>
            </div>

            <button
              className="inline-flex items-center justify-center rounded-lg bg-gray-100 p-2 text-gray-700 hover:bg-gray-200 transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="메뉴 닫기"
            >
              {/* X 아이콘 */}
              <span className="relative block h-5 w-5">
                <span className="absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-gray-700" />
                <span className="absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-gray-700" />
              </span>
            </button>
          </div>

          {/* 메뉴 리스트 */}
          <nav className="px-4 py-4">
            <div className="flex flex-col gap-1">
              {items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  end={it.to === "/"}
                  className={({ isActive }: NavLinkArgs) =>
                    [
                      "group rounded-xl px-4 py-3",
                      "text-[16px] font-semibold tracking-[-0.015em]",
                      "transition-colors",
                      isActive
                        ? "text-blue-600 bg-blue-50/60"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/60"
                    ].join(" ")
                  }
                >
                  <span className="inline-flex items-center gap-2">
                    {/* 기존 파란 점 느낌 제거: hover에서도 색 안 바뀌게 */}
                    <span className="h-1.5 w-1.5 rounded-full bg-transparent" />
                    {it.label}
                  </span>
                </NavLink>
              ))}
            </div>

            {/* 로그인 버튼 */}
            <div className="mt-4">
              <NavLink
                to="/login"
                className="inline-flex w-full items-center justify-center rounded-xl bg-gray-100 px-4 py-3 text-[15px] font-semibold text-gray-600 transition-colors hover:bg-gray-200"
              >
                로그인
              </NavLink>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
