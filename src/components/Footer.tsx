// src/components/Footer.tsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 사업자 정보 */}
          <div>
            <div className="text-sm font-extrabold text-gray-900">
              제이지컴퍼니
            </div>

            <dl className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="flex gap-2">
                <dt className="w-[140px] shrink-0 text-gray-500">사이트명</dt>
                <dd className="font-medium">통신잇</dd>
              </div>

              <div className="flex gap-2">
                <dt className="w-[140px] shrink-0 text-gray-500">대표자</dt>
                <dd className="font-medium">조현아</dd>
              </div>

              <div className="flex gap-2">
                <dt className="w-[140px] shrink-0 text-gray-500">
                  사업자등록번호
                </dt>
                <dd className="font-medium">199-58-00806</dd>
              </div>

              <div className="flex gap-2">
                <dt className="w-[140px] shrink-0 text-gray-500">주소</dt>
                <dd className="font-medium">
                  경기도 오산시 경기대로761번길 17
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex items-center gap-3 text-xs text-gray-600">
              <Link
                to="/terms"
                className="font-medium hover:text-gray-900"
              >
                이용약관
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                to="/privacy"
                className="font-medium hover:text-gray-900"
              >
                개인정보처리방침
              </Link>
            </div>
          </div>

          {/* 안내사항 */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <div className="text-sm font-extrabold text-gray-900">안내사항</div>
            <div className="mt-3 space-y-3 text-xs leading-relaxed text-gray-700">
              <p>
                요금, 할인 및 사은품 정보는 통신사 정책과 가입 조건에 따라
                변경될 수 있으며, 최종 내용은 상담 후 확정됩니다.
              </p>
              <p>
                사은품은 개통 완료 및 유지 조건 충족 시 지급됩니다.
              </p>
              <p>
                본 사이트는 통신사 공식 고객센터가 아닌, 통신상품 가입 상담 및
                판매를 대행하는 업체입니다.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-400">
          © {new Date().getFullYear()} 제이지컴퍼니. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
