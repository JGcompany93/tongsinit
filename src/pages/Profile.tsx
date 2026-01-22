import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (!error) setUser(data.user ?? null);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-500">
        불러오는 중…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-500">
        로그인 정보가 없습니다.
      </div>
    );
  }

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    "이름 없음";

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">내 정보</h1>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        {/* 프로필 요약 */}
        <div className="flex items-center gap-6">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="profile"
              className="h-20 w-20 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-gray-600">
              {displayName[0]}
            </div>
          )}

          <div>
            <div className="text-lg font-semibold text-gray-900">
              {displayName}
            </div>
            <div className="mt-1 text-sm text-gray-500">
              {user.email}
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-8 border-t" />

        {/* 계정 정보 */}
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">로그인 방식</span>
            <span className="font-medium text-gray-800">
              {user.app_metadata?.provider ?? "알 수 없음"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">가입일</span>
            <span className="font-medium text-gray-800">
              {new Date(user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
