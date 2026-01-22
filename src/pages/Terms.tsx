// src/pages/Terms.tsx
export default function Terms() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-2xl font-extrabold text-gray-900">이용약관</h1>

      <section className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          본 약관은 제이지컴퍼니(이하 “회사”)가 운영하는 통신잇 웹사이트에서
          제공하는 서비스 이용과 관련하여 회사와 이용자 간의 권리, 의무 및
          책임사항을 규정함을 목적으로 합니다.
        </p>

        <h2 className="text-base font-bold text-gray-900">제1조 (서비스 내용)</h2>
        <p>
          회사는 인터넷, TV, 휴대폰 등 통신상품 가입 상담 및 신청을 중개하는
          서비스를 제공합니다. 실제 상품의 계약 및 개통은 각 통신사를 통해
          이루어집니다.
        </p>

        <h2 className="text-base font-bold text-gray-900">
          제2조 (책임의 한계)
        </h2>
        <p>
          회사는 통신사가 제공하는 요금, 할인, 사은품 정책의 변경에 대해 책임을
          지지 않으며, 최종 조건은 상담 및 가입 시점에 확정됩니다.
        </p>

        <h2 className="text-base font-bold text-gray-900">
          제3조 (서비스 이용 제한)
        </h2>
        <p>
          회사는 관련 법령을 위반하거나 부정한 목적으로 서비스를 이용하는 경우
          서비스 제공을 제한할 수 있습니다.
        </p>

        <p className="pt-6 text-xs text-gray-400">
          본 약관은 웹사이트 게시일로부터 적용됩니다.
        </p>
      </section>
    </main>
  );
}
