import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <div className="relative rounded-2xl bg-white p-10 shadow-sm border">
          {/* 뒤로가기 아이콘 (더 크게) */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
            className="absolute left-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* 로고 */}
          <div className="mb-8 flex items-center justify-center gap-2 pt-2">
            <div className="h-9 w-9 rounded-xl bg-gray-900" />
            <span className="text-xl font-bold tracking-[-0.02em] text-gray-900">
              로고
            </span>
          </div>

          <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
            시작하기
          </h1>

          {/* 4개 버튼: 카카오 / 휴대폰 / 구글 / 네이버 */}
          <div className="space-y-4">
            <button
              type="button"
              className="w-full rounded-xl bg-[#FEE500] px-5 py-4 text-base font-semibold text-[#191600] hover:brightness-95 transition flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.438 2 10.68c0 2.72 1.86 5.12 4.67 6.46-.2.75-.72 2.72-.82 3.14-.13.51.18.5.38.37.16-.1 2.53-1.7 3.55-2.39.72.1 1.47.15 2.22.15 5.523 0 10-3.438 10-7.68C22 6.438 17.523 3 12 3z" />
              </svg>
              카카오로 시작하기
            </button>

            <button
              type="button"
              className="w-full rounded-xl bg-gray-900 px-5 py-4 text-base font-semibold text-white hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                <path d="M11 18h2" />
              </svg>
              휴대폰으로 시작하기
            </button>

            <button
              type="button"
              className="w-full rounded-xl bg-white px-5 py-4 text-base font-semibold text-gray-800 hover:bg-gray-50 transition flex items-center justify-center gap-2 border border-gray-200"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M21.35 11.1H12v2.9h5.35c-.5 2.9-2.98 4.1-5.35 4.1-3.23 0-5.85-2.62-5.85-5.85S8.77 6.4 12 6.4c1.74 0 2.94.74 3.62 1.38l1.98-1.98C16.33 4.62 14.37 3.6 12 3.6 7.23 3.6 3.35 7.48 3.35 12.25S7.23 20.9 12 20.9c4.77 0 7.92-3.35 7.92-8.05 0-.55-.06-1.05-.17-1.75z" />
              </svg>
              Google로 시작하기
            </button>

            <button
              type="button"
              className="w-full rounded-xl bg-[#03C75A] px-5 py-4 text-base font-semibold text-white hover:brightness-95 transition flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M7 6h3.2l3.6 5.2V6H17v12h-3.2l-3.6-5.2V18H7V6z" />
              </svg>
              네이버로 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
