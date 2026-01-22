// src/components/Header.tsx
import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

// ✅ Supabase 세션용
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

// 로고 이미지
import Logo from "../assets/logo.svg";

type NavLinkArgs = { isActive: boolean };

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // ✅ 로그인 세션 상태
  const [session, setSession] = useState<Session | null>(null);
  const user: User | null = session?.user ?? null;

  // ✅ 프로필 드롭다운 상태 (데스크톱/모바일 공용)
  const [profileOpen, setProfileOpen] = useState(false);

  // ✅ 데스크톱 메뉴
  const items = useMemo(
    () => [
      { label: "홈", to: "/" },
      { label: "인터넷", to: "/internet" },
      { label: "휴대폰", to: "/phone" },
      { label: "꿀팁모음", to: "/tips" },
      { label: "이벤트", to: "/events" }
    ],
    []
  );

  const mobileItems = useMemo(() => items, [items]);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
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

  // ✅ 세션 최초 로드 + 로그인/로그아웃 반영
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  // ✅ 바깥 클릭 시 프로필 드롭다운 닫기 (ref 충돌 방지: closest 사용)
  useEffect(() => {
    if (!profileOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 프로필 영역(버튼+드롭다운) 내부 클릭이면 유지
      if (target.closest('[data-profile-root="true"]')) return;

      setProfileOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [profileOpen]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    setProfileOpen(false);
    setMobileOpen(false);
  };

  const isActivePath = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname === to;

  // ✅ 표시용(드롭다운에서만 보여줄 정보)
  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    user?.email ||
    "사용자";

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const fallbackChar = (user?.email ?? "U")[0]?.toUpperCase?.() ?? "U";

  // ✅ 원형 프로필 버튼(공용)
  const ProfileButton = ({ className }: { className: string }) => (
    <button
      type="button"
      onClick={() => setProfileOpen((v) => !v)}
      className={className}
      aria-label="프로필 메뉴"
      aria-expanded={profileOpen}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="profile"
          className="h-full w-full rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="text-sm font-semibold text-gray-600">{fallbackChar}</span>
      )}
    </button>
  );

  // ✅ 프로필 드롭다운(공용) - "내 정보" + "로그아웃"
  const ProfileDropdown = ({ align }: { align: "right" | "left" }) => (
    <div
      className={[
        "absolute mt-3 w-60 rounded-xl border border-gray-200 bg-white shadow-lg",
        align === "right" ? "right-0" : "left-0"
      ].join(" ")}
      role="menu"
      aria-label="프로필 메뉴"
    >
      <div className="px-4 py-3">
        <div className="text-sm font-semibold text-gray-900 truncate">
          {displayName}
        </div>
        <div className="mt-1 text-xs text-gray-500 truncate">{user?.email}</div>
      </div>

      <div className="border-t border-gray-100">
        <NavLink
          to="/profile"
          onClick={() => {
            setProfileOpen(false);
            setMobileOpen(false);
          }}
          className="block w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
          role="menuitem"
        >
          내 정보
        </NavLink>

        <button
          type="button"
          onClick={signOut}
          className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
          role="menuitem"
        >
          로그아웃
        </button>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      {/* 데스크톱 고정폭 정책 */}
      <div className="min-w-[1200px]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center">
            {/* ===== 데스크톱: 좌측(로고) ===== */}
            <div className="desktop-only flex items-center justify-end pr-40">
              <NavLink to="/" className="flex items-center">
                <img src={Logo} alt="로고" className="h-11 w-auto object-contain" />
              </NavLink>
            </div>

            {/* ===== 데스크톱: 중앙(메뉴) ===== */}
            <nav className="desktop-only flex items-center justify-center whitespace-nowrap">
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

            {/* ===== 데스크톱: 우측(로그인/프로필) ===== */}
            <div className="desktop-only flex items-center justify-start pl-40">
              {!user ? (
                <NavLink
                  to="/login"
                  className="
                    rounded-xl
                    bg-gray-100
                    px-5 py-2.5
                    text-[15px]
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-200
                  "
                >
                  로그인
                </NavLink>
              ) : (
                <div data-profile-root="true" className="relative">
                  {/* ✅ 헤더엔 원형 프로필만 */}
                  <ProfileButton className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:bg-gray-50 hover:ring-2 hover:ring-gray-200" />
                  {profileOpen && <ProfileDropdown align="right" />}
                </div>
              )}
            </div>

            {/* ===== 모바일: 좌측(햄버거) ===== */}
            <div className="mobile-only flex items-center justify-start">
              <button
                className="inline-flex items-center justify-center p-2"
                onClick={() => setMobileOpen(true)}
                aria-label="메뉴 열기"
                aria-expanded={mobileOpen}
                type="button"
              >
                <span className="relative block h-6 w-6">
                  <span className="absolute left-0 top-[6px] h-[2px] w-6 rounded-full bg-gray-500" />
                  <span className="absolute left-0 top-[12px] h-[2px] w-6 rounded-full bg-gray-500" />
                  <span className="absolute left-0 top-[18px] h-[2px] w-6 rounded-full bg-gray-500" />
                </span>
              </button>
            </div>

            {/* ===== 모바일: 중앙(로고) ===== */}
            <div className="mobile-only flex items-center justify-center">
              <NavLink to="/" className="flex items-center">
                <img src={Logo} alt="로고" className="h-10 w-auto object-contain" />
              </NavLink>
            </div>

            {/* ===== 모바일: 우측(로그인/프로필) ===== */}
            <div className="mobile-only flex items-center justify-end">
              {!user ? (
                <NavLink
                  to="/login"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-800 transition hover:bg-gray-50"
                >
                  로그인
                </NavLink>
              ) : (
                <div data-profile-root="true" className="relative">
                  {/* ✅ 모바일도 원형 프로필만 */}
                  <ProfileButton className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:bg-gray-50" />
                  {profileOpen && <ProfileDropdown align="right" />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== 모바일 드로어 ===== */}
      {createPortal(
        <div
          className={[
            "mobile-only fixed inset-0 z-[9999]",
            mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          ].join(" ")}
          aria-hidden={!mobileOpen}
        >
          <div className="absolute inset-0 top-[72px]">
            {/* 오버레이 */}
            <div
              className={[
                "absolute inset-0 bg-gray-900/60 transition-opacity duration-300",
                mobileOpen ? "opacity-100" : "opacity-0"
              ].join(" ")}
              onClick={() => setMobileOpen(false)}
            />

            {/* 드로어 */}
            <aside
              className={[
                "absolute left-0 top-0 h-full w-[78vw] max-w-[320px] bg-white shadow-xl transition-transform duration-300 ease-out",
                mobileOpen ? "translate-x-0" : "-translate-x-full"
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

              {/* ✅ 로그인 상태 요약(모바일 드로어 상단) */}
              <div className="border-b px-5 py-4">
                {!user ? (
                  <div className="text-sm text-gray-600">
                    로그인해서 더 빠르게 진행하세요.
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="profile"
                        className="h-10 w-10 rounded-full border object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-gray-100 text-sm text-gray-600">
                        {fallbackChar}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold text-gray-900">
                        {displayName}
                      </div>
                      <div className="truncate text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* 메뉴 리스트 */}
              <nav className="px-3 py-4">
                {mobileItems.map((it) => {
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
                            : "text-gray-900 hover:bg-gray-50"
                        ].join(" ")
                      }
                    >
                      <span>{it.label}</span>
                      <svg
                        viewBox="0 0 24 24"
                        className={[
                          "h-5 w-5",
                          active ? "text-blue-600" : "text-gray-400"
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

                {/* ✅ 드로어 하단: 로그인/로그아웃 버튼 */}
                {!user ? (
                  <NavLink
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 block rounded-xl border border-gray-200 bg-white px-4 py-3 text-center font-bold text-gray-900 hover:bg-gray-50"
                  >
                    로그인
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    onClick={signOut}
                    className="mt-4 block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-center font-bold text-gray-900 hover:bg-gray-50"
                  >
                    로그아웃
                  </button>
                )}
              </nav>
            </aside>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
