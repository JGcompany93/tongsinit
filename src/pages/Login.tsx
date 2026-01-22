// src/pages/Login.tsx
import { useState } from "react";
import { supabase } from "../lib/supabase";

type Provider = "google" | "kakao";

export default function Login() {
  const [loading, setLoading] = useState<Provider | null>(null);

  const signInOAuth = async (provider: Provider) => {
    try {
      setLoading(provider);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) alert(error.message);
    } finally {
      setLoading(null);
    }
  };

  const comingSoon = (name: string) => {
    alert(`${name} 로그인은 다음 단계에서 바로 붙일게요. (현재 UI만 적용됨)`);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex min-h-[calc(100vh-72px)] items-center justify-center py-10">
          <div className="w-full max-w-[520px] rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-7">
              <h1 className="text-[22px] font-bold tracking-[-0.02em] text-gray-900">
                로그인
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                간편 로그인으로 빠르게 시작하세요.
              </p>
            </div>

            <div className="grid gap-3">
              {/* Google */}
              <button
                onClick={() => signInOAuth("google")}
                disabled={loading !== null}
                className={[
                  "group relative flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white",
                  "text-sm font-semibold text-gray-900 transition",
                  "hover:bg-gray-50 active:scale-[0.99]",
                  "disabled:cursor-not-allowed disabled:opacity-60"
                ].join(" ")}
              >
                <span className="absolute left-4 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white">
                  {/* Google G (간단 SVG) */}
                  <svg viewBox="0 0 48 48" className="h-4 w-4">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.72 1.22 9.25 3.62l6.9-6.9C35.97 2.52 30.43 0 24 0 14.62 0 6.52 5.38 2.56 13.22l8.02 6.22C12.6 13.07 17.86 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.14 24.55c0-1.64-.15-3.22-.43-4.75H24v9h12.43c-.54 2.9-2.18 5.36-4.66 7.03l7.18 5.57C43.21 37.52 46.14 31.6 46.14 24.55z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.58 28.44a14.5 14.5 0 0 1 0-8.88l-8.02-6.22A23.96 23.96 0 0 0 0 24c0 3.89.93 7.57 2.56 10.66l8.02-6.22z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.43 0 11.83-2.12 15.77-5.77l-7.18-5.57c-2 1.35-4.58 2.14-8.59 2.14-6.14 0-11.4-3.57-13.42-8.94l-8.02 6.22C6.52 42.62 14.62 48 24 48z"
                    />
                  </svg>
                </span>

                {loading === "google" ? "구글로 이동 중..." : "구글로 계속하기"}
              </button>

              {/* Kakao (UI만, 아직 세팅 전이면 comingSoon로) */}
              <button
                onClick={() => comingSoon("카카오")}
                disabled={loading !== null}
                className={[
                  "relative flex h-12 w-full items-center justify-center gap-2 rounded-xl",
                  "bg-[#FEE500] text-[14px] font-semibold text-[#191600]",
                  "transition hover:brightness-[0.98] active:scale-[0.99]",
                  "disabled:cursor-not-allowed disabled:opacity-60"
                ].join(" ")}
                type="button"
              >
                <span className="absolute left-4 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#191600]/10">
                  {/* Kakao 말풍선 느낌 간단 아이콘 */}
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#191600]">
                    <path d="M12 3C6.48 3 2 6.42 2 10.64c0 2.64 1.77 4.96 4.47 6.33l-.9 3.27a.5.5 0 0 0 .76.56l3.9-2.6c.58.08 1.17.12 1.77.12 5.52 0 10-3.42 10-7.68S17.52 3 12 3z" />
                  </svg>
                </span>
                카카오로 계속하기
              </button>

              {/* Email */}
              <button
                onClick={() => comingSoon("이메일")}
                disabled={loading !== null}
                className={[
                  "relative flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white",
                  "text-sm font-semibold text-gray-900 transition hover:bg-gray-50 active:scale-[0.99]",
                  "disabled:cursor-not-allowed disabled:opacity-60"
                ].join(" ")}
                type="button"
              >
                <span className="absolute left-4 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h16v12H4z" />
                    <path d="M4 7l8 6 8-6" />
                  </svg>
                </span>
                이메일로 계속하기
              </button>

              {/* Phone */}
              <button
                onClick={() => comingSoon("휴대폰")}
                disabled={loading !== null}
                className={[
                  "relative flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white",
                  "text-sm font-semibold text-gray-900 transition hover:bg-gray-50 active:scale-[0.99]",
                  "disabled:cursor-not-allowed disabled:opacity-60"
                ].join(" ")}
                type="button"
              >
                <span className="absolute left-4 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2h8v20H8z" />
                    <path d="M10 5h4" />
                    <path d="M12 19h0.01" />
                  </svg>
                </span>
                휴대폰으로 계속하기
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-4 text-xs leading-relaxed text-gray-600">
              처음 로그인하면 자동으로 회원가입됩니다. 로그아웃 후 다시 로그인하면
              기존 계정으로 바로 로그인됩니다.
            </div>

            <div className="mt-6 text-center text-xs text-gray-400">
              계속하면 서비스 이용약관 및 개인정보처리방침에 동의한 것으로 간주됩니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
