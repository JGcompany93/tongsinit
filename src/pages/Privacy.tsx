// src/pages/Privacy.tsx
import { useNavigate } from "react-router-dom";

export default function Privacy() {
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

      <h1 className="text-2xl font-extrabold text-gray-900">
        개인정보처리방침
      </h1>

      <section className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          제이지컴퍼니(이하 “회사”)는 개인정보 보호법 등 관계 법령을 준수하며,
          이용자의 개인정보 보호를 중요하게 생각합니다.
        </p>

        <h2 className="font-bold text-gray-900">
          1. 수집하는 개인정보 항목
        </h2>
        <p>
          이름, 연락처(휴대전화번호), 주소, 상담 및 가입 신청 관련 정보
        </p>

        <h2 className="font-bold text-gray-900">
          2. 개인정보 수집 및 이용 목적
        </h2>
        <p>
          통신상품 가입 상담 및 신청 중개, 개통 및 사은품 지급 확인,
          상담 이력 관리 및 서비스 관련 안내
        </p>

        <h2 className="font-bold text-gray-900">
          3. 개인정보 보유 및 이용 기간
        </h2>
        <p>
          개인정보는 목적 달성 후 지체 없이 파기하되, 관계 법령에 따라 보관이
          필요한 경우 해당 기간 동안 보관합니다.
        </p>

        <h2 className="font-bold text-gray-900">
          4. 개인정보의 제3자 제공
        </h2>
        <p>
          회사는 통신상품 가입 및 개통 처리를 위해 필요한 범위 내에서 통신사 및
          제휴 대리점에 개인정보를 제공할 수 있습니다.
        </p>

        <h2 className="font-bold text-gray-900">
          5. 개인정보의 활용(안내 연락)
        </h2>
        <p>
          회사는 상담 이력 관리 및 서비스 관련 안내를 위해 이용자의 연락처 정보를
          활용하여 카카오톡, 문자메시지, 이메일 등을 통해 안내를 제공할 수 있습니다.
        </p>

        <h2 className="font-bold text-gray-900">
          6. 이용자의 권리
        </h2>
        <p>
          이용자는 언제든지 개인정보 열람, 정정, 삭제를 요청할 수 있습니다.
        </p>

        <h2 className="font-bold text-gray-900">
          7. 개인정보 보호책임자
        </h2>
        <p>
          개인정보 보호책임자: 제이지컴퍼니<br />
          문의 이메일: tongsinit@gmail.com
        </p>

        <p className="pt-6 text-xs text-gray-400">
          본 방침은 사이트 게시일로부터 적용됩니다.
        </p>
      </section>
    </main>
  );
}
