// src/pages/Privacy.tsx
export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-2xl font-extrabold text-gray-900">
        개인정보처리방침
      </h1>

      <section className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          제이지컴퍼니(이하 “회사”)는 이용자의 개인정보를 중요시하며, 「개인정보
          보호법」을 준수합니다.
        </p>

        <h2 className="text-base font-bold text-gray-900">
          1. 수집하는 개인정보 항목
        </h2>
        <p>이름, 연락처, 주소, 가입 상담 내용</p>

        <h2 className="text-base font-bold text-gray-900">
          2. 개인정보 수집 목적
        </h2>
        <p>
          통신상품 가입 상담 및 신청 진행, 서비스 제공에 따른 본인 확인
        </p>

        <h2 className="text-base font-bold text-gray-900">
          3. 개인정보 보유 및 이용 기간
        </h2>
        <p>
          상담 완료 후 1년 또는 관련 법령에 따른 보관 기간
        </p>

        <h2 className="text-base font-bold text-gray-900">
          4. 개인정보 제3자 제공
        </h2>
        <p>
          통신상품 가입 진행을 위해 통신사(KT, SK, LG 등)에 필요한 정보가
          제공될 수 있습니다.
        </p>

        <h2 className="text-base font-bold text-gray-900">
          5. 개인정보 보호책임자
        </h2>
        <p>책임자: 조현아</p>

        <p className="pt-6 text-xs text-gray-400">
          본 방침은 웹사이트 게시일로부터 적용됩니다.
        </p>
      </section>
    </main>
  );
}
