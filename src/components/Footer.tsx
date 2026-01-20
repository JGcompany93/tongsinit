export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="text-sm font-extrabold text-gray-900">제이지컴퍼니</div>

            <dl className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="flex gap-2">
                <dt className="w-[140px] shrink-0 text-gray-500">대표자</dt>
                <dd className="font-medium">조현아</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[140px] shrink-0 text-gray-500">사업자등록번호</dt>
                <dd className="font-medium">199-58-00806</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[140px] shrink-0 text-gray-500">통신판매업 신고번호</dt>
                <dd className="font-medium">(신고 준비중)</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[140px] shrink-0 text-gray-500">주소</dt>
                <dd className="font-medium">경기도 오산시 경기대로76번길 17</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[140px] shrink-0 text-gray-500">고객센터</dt>
                <dd className="font-medium">010-XXXX-XXXX</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[140px] shrink-0 text-gray-500">이메일</dt>
                <dd className="font-medium">example@naver.com</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <div className="text-sm font-extrabold text-gray-900">안내사항</div>
            <div className="mt-3 space-y-4 text-xs leading-relaxed text-gray-700">
              <p>
                본 사이트에서 안내되는 혜택·할인·사은품 내용은 예시이며, 실제 적용 요금, 결합 할인 및
                사은품 지급 여부·금액은 가입 상품, 약정 조건, 휴대폰 회선 및 요금제 등에 따라 달라질 수 있고
                최종 내용은 상담 후 확정됩니다.
              </p>
              <p>
                사은품은 개통 완료 및 유지 조건 충족 시 지급되며, 지급 시점과 방식은 가입 조건에 따라
                상이할 수 있습니다.
              </p>
              <p>
                본 사이트는 통신사 공식 고객센터가 아니며, 통신상품 가입 상담 및 판매를 대행하는 업체입니다.
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
