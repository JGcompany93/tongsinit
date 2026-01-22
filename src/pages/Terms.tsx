// src/pages/Terms.tsx
import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        ← 뒤로가기
      </button>

      <h1 className="text-2xl font-extrabold text-gray-900">이용약관</h1>

      <section className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          본 약관은 제이지컴퍼니(이하 “회사”)가 운영하는 통신잇 웹사이트(이하
          “사이트”)를 통해 제공하는 통신상품 가입 상담 및 신청 중개 서비스의
          이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을
          목적으로 합니다.
        </p>

        <h2 className="font-bold text-gray-900">제1조 (서비스의 성격)</h2>
        <p>
          회사는 인터넷, TV, 휴대폰 등 통신상품의 가입 상담 및 신청을 중개·대행하는
          역할을 수행하며, 실제 통신서비스의 계약 체결, 개통, 요금 청구 및 사후
          관리는 각 통신사의 책임 하에 이루어집니다.
        </p>

        <h2 className="font-bold text-gray-900">제2조 (정보의 제공 및 변경)</h2>
        <p>
          사이트 및 광고에 표시된 요금, 할인, 사은품 정보는 예시 또는 최대 기준이며,
          통신사 정책 및 이용자의 가입 조건에 따라 변경될 수 있습니다. 최종 조건은
          상담 및 가입 절차를 통해 확정됩니다.
        </p>

        <h2 className="font-bold text-gray-900">제3조 (사은품 지급 및 환수)</h2>
        <p>
          사은품은 통신상품 개통 완료 및 약정 유지 조건 충족 시 제공됩니다.
          이용자가 약정 기간 중 해지, 명의 변경, 일시 정지, 요금 미납 등으로
          유지 조건을 충족하지 못한 경우 이미 지급된 사은품은 환수될 수 있으며,
          환수는 현금 반환 또는 이에 준하는 방식으로 진행될 수 있습니다.
        </p>

        <h2 className="font-bold text-gray-900">제4조 (책임의 제한)</h2>
        <p>
          회사는 통신사 정책 변경, 시스템 장애, 천재지변 등 회사의 통제 범위를
          벗어난 사유로 발생한 손해에 대해 책임을 지지 않습니다.
        </p>

        <h2 className="font-bold text-gray-900">제5조 (분쟁 해결 및 관할)</h2>
        <p>
          본 약관과 관련하여 발생한 분쟁에 대해서는 대한민국 법을 적용하며,
          회사 본점 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.
        </p>

        <p className="pt-6 text-xs text-gray-400">
          본 약관은 사이트 게시일로부터 시행됩니다.
        </p>
      </section>
    </main>
  );
}
