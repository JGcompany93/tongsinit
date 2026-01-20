import { useMemo, useState } from "react";
import type { ReactNode } from "react";

type TelcoKey = "SK" | "KT" | "LGU+" | "SKYLIFE" | "HELLO";

type InstallFeeRow = {
  telco: TelcoKey;
  internetOnly: string; // 예: "36,300원"
  internetTv: string;   // 예: "56,100원"
  note?: string;
};

type FaqItem = {
  q: string;
  a: ReactNode;
};

/* =======================
   외부 링크
======================= */
const COVERAGE_LINKS: { label: string; url: string }[] = [
  { label: "SK", url: "https://www.bworld.co.kr/myb/product/join/address/svcAveSearch.do" },
  { label: "KT", url: "https://help.kt.com/serviceinfo/SearchHomePhone.do" },
  {
    label: "LG U+",
    url: "https://www.lguplus.com/support/online/coverage-check?utm_campaign=o25ushopmkt01pfm&utm_source=google&utm_medium=network_shoppingfeed_traffic_cpc&utm_content=img-%EC%83%81%EC%8B%9C-%EC%87%BC%ED%95%91%ED%94%BC%EB%93%9C.NONE&utm_term=NONE&gad_source=1&gad_campaignid=22052340456&gbraid=0AAAAAqq5A4FWD8QAxExgZD4fqlhFK7qUJ&gclid=CjwKCAiAybfLBhAjEiwAI0mBBt8qPa6qCFNdKxK0ZZccWhdvbzokyq2eYaS_6q9BN3BVpKB07a8abRoCupsQAvD_BwE",
  },
];

/* =======================
   설치비 표(표 참조)
   - 실제 금액만 채우면 됩니다.
======================= */
const INSTALL_FEES: InstallFeeRow[] = [
  { telco: "SK", internetOnly: "-", internetTv: "-", note: "상품/지역/설치 조건에 따라 변동될 수 있어요." },
  { telco: "KT", internetOnly: "-", internetTv: "-", note: "상품/지역/설치 조건에 따라 변동될 수 있어요." },
  { telco: "LGU+", internetOnly: "-", internetTv: "-", note: "상품/지역/설치 조건에 따라 변동될 수 있어요." },
  { telco: "SKYLIFE", internetOnly: "-", internetTv: "-", note: "상품/지역/설치 조건에 따라 변동될 수 있어요." },
  { telco: "HELLO", internetOnly: "-", internetTv: "-", note: "상품/지역/설치 조건에 따라 변동될 수 있어요." },
];

function cx(...arr: Array<string | false | null | undefined>) {
  return arr.filter(Boolean).join(" ");
}

/* =======================
   UI: 설치비 표
======================= */
function InstallFeeTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="text-[13px] font-extrabold text-gray-900">설치비 안내 (표 참조)</div>
        <div className="mt-1 text-xs text-gray-600">
          설치비는 통신사/상품/설치 환경(주말·야간 등)에 따라 달라질 수 있습니다.
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[720px] w-full text-left">
          <thead className="bg-gray-50">
            <tr className="text-xs font-bold text-gray-700">
              <th className="px-5 py-3">통신사</th>
              <th className="px-5 py-3">인터넷 단독 설치비</th>
              <th className="px-5 py-3">인터넷+TV 설치비</th>
              <th className="px-5 py-3">비고</th>
            </tr>
          </thead>
          <tbody>
            {INSTALL_FEES.map((r) => (
              <tr key={r.telco} className="border-t border-gray-100 text-sm">
                <td className="px-5 py-4 font-extrabold text-gray-900">{r.telco}</td>
                <td className="px-5 py-4 text-gray-700">{r.internetOnly}</td>
                <td className="px-5 py-4 text-gray-700">{r.internetTv}</td>
                <td className="px-5 py-4 text-xs text-gray-600">{r.note ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =======================
   UI: 설치 가능 조회 링크
======================= */
function CoverageLinks() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {COVERAGE_LINKS.map((it) => (
        <a
          key={it.label}
          href={it.url}
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl border border-gray-200 bg-white p-4 transition hover:bg-gray-50"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-extrabold text-gray-900">{it.label}</div>
            <span className="text-xs font-semibold text-blue-600 group-hover:underline">
              설치 가능 확인하기
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-600">
            주소 입력으로 설치 가능 여부를 확인할 수 있어요.
          </div>
        </a>
      ))}
    </div>
  );
}

/* =======================
   UI: 아코디언
======================= */
function AccordionItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <div className="flex gap-2">
            <span className="shrink-0 text-[13px] font-extrabold text-gray-900">Q :</span>
            <span className="text-[15px] sm:text-base font-extrabold text-gray-900 leading-snug">
              {q}
            </span>
          </div>
        </div>

        <span
          className={cx(
            "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition",
            open && "rotate-180"
          )}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      <div
        className={cx(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden px-5 pb-5">
          <div className="flex gap-2 text-[15px] sm:text-base leading-relaxed text-gray-700">
            <span className="shrink-0 text-[13px] font-extrabold text-gray-900">A :</span>
            <div className="min-w-0">{a}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =======================
   UI: 페이지 네비
======================= */
function PageNav({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={cx(
          "h-10 px-3 rounded-xl border text-sm font-semibold transition",
          page === 1
            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        )}
      >
        이전
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        const active = p === page;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={cx(
              "h-10 w-10 rounded-xl border text-sm font-extrabold transition",
              active
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            )}
            aria-current={active ? "page" : undefined}
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={cx(
          "h-10 px-3 rounded-xl border text-sm font-semibold transition",
          page === totalPages
            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        )}
      >
        다음
      </button>
    </div>
  );
}

/* =======================
   FAQ (단일 리스트)
======================= */
const FAQ: FaqItem[] = [
  { q: "제대로 설치비는 얼마인가요?", a: <InstallFeeTable /> },
  {
    q: "설치는 보통 얼마나 걸리나요?",
    a: (
      <div className="space-y-2">
        <div>보통 영업일 기준 1~3일 내 설치되요.</div>
        <div>하지만 당일 혹은 원하는 날짜가 있다면 담당 직원에게 전달하면 맞춤 설치를 받을 수 있어요!</div>
      </div>
    ),
  },
  { q: "설치 가능 지역인지 모르겠어요", a: <CoverageLinks /> },
  { q: "설치 일정은 제가 직접 정하나요?", a: <div>네, 원하는 시간이 따로 있다면 담당 직원에게 말하면 일정을 조절할 수 있어요</div> },
  {
    q: "당일 설치도 가능한가요?",
    a: <div>네, 스케줄이 남아있다면 당연히 가능해요. 하지만 당일은 예약이 금방 마감되기 때문에 보통 1~3일 정도 안에 설치해요</div>,
  },
  { q: "주말이나 공휴일에도 설치가 되나요?", a: <div>네. 물론 가능해요! 하지만 조건에 따라 추가 요금이 발생될 수 있어요</div> },
  { q: "기사님 방문 시간은 미리 알 수 있나요?", a: <div>네, 고객님께 미리 연락드려 시간을 조율해요</div> },
  { q: "설치 날짜 변경이 가능한가요?", a: <div>네, 당연히 가능해요. 담당직원에게 전달하면 실시간으로 설치 일정을 수정할 수 있어요!</div> },
  { q: "기사님 방문 전에 제가 준비해야 할 게 있나요?", a: <div>딱히 준비할건 없지만 설치하려면 해당 장소에 누군가 있어야 설치할 수 있어요!</div> },
  { q: "집 구조 때문에 설치가 안 될 수도 있나요?", a: <div>네, 집의 구조라든지 지역의 광케이블 여부에 따라 설치가 안될 수 있어요</div> },
  { q: "벽 타공(구멍 뚫기)이 꼭 필요한가요?", a: <div>집 구조에 따라 필요한 경우가 있고 필요하지 않은 경우가 있어요!</div> },
  { q: "전세/월세인데 설치해도 문제 없나요?", a: <div>네, 문제 없습니다! 하지만 가끔 집주인/건물주 동의가 필요한 경우가 생길 수 있어요. 담당 직원이 안내해드려요!</div> },
  { q: "설치하다가 추가 비용이 발생할 수도 있나요?", a: <div>평일 야간이나 주말에 설치 받는다면 추가비용이 발생할 수 있어요</div> },
  { q: "이전 세입자가 쓰던 선을 그대로 사용해도 되나요?", a: <div>허락을 받았다면 상관없지만 나중에 문제가 생길 수 있으니 주의하셔야해요!</div> },

  { q: "월 요금은 정확히 얼마인가요?", a: <div>월요금은 상품 구성에 따라 달라요. 회사 대표번호로 연락주시면 친절히 알려드려요!</div> },
  { q: "약정은 꼭 3년이어야 하나요?", a: <div>유선은 모든 통신사가 3년으로 정해져 있어요! (무선은 1년/2년도 있어요)</div> },
  { q: "약정 없이도 가입할 수 있나요?", a: <div>약정 없이 가입은 불가능해요</div> },
  { q: "중간에 해지하면 위약금은 얼마나 나오나요?", a: <div>위약금은 상품, 통신사, 기간에 따라 달라요. 대표번호로 연락주시면 자세히 안내해드려요!</div> },
  { q: "이사 가면 위약금이 발생하나요?", a: <div>통신사 설치가 불가한 지역이면 위약금이 청구될 수 있지만, 이사 자체만으로 위약금이 청구되지는 않아요!</div> },
  { q: "요금은 언제부터 청구되나요?", a: <div>요금은 가입일 기준으로 일할 계산되어 청구되요!</div> },
  { q: "첫 달 요금이 많이 나오는 이유가 뭔가요?", a: <div>첫달은 설치비/부가 비용 등으로 더 많이 나온다고 느끼실 수 있어요!</div> },
  { q: "자동이체 꼭 해야 하나요?", a: <div>카드/계좌 자동이체는 괜찮지만, 지로로 변경 시 혜택 조건에 영향이 있을 수 있어요</div> },
  { q: "카드 할인이나 결합 할인은 중복 적용되나요?", a: <div>네, 조건에 따라 카드할인/결합할인/복지할인 등이 중복 적용될 수 있어요!</div> },
  { q: "요금이 나중에 오르는 경우도 있나요?", a: <div>기본 요금이 갑자기 오르진 않아요. 다만 부가서비스/소액결제 등이 있으면 당월 청구액이 올라갈 수 있어요!</div> },

  { q: "사은품은 언제 입금되나요?", a: <div>오후 3시 전이면 당일, 이후라면 익일 입금돼요. 주말이 끼면 다음 영업일에 입금돼요!</div> },
  { q: "사은품은 현금인가요, 상품권인가요?", a: <div>KT와 스카이라이프는 정책상 상품권이 포함될 수 있어요. 나머지는 전액 현금 지급이에요!</div> },
  { q: "설치 당일 바로 받을 수 있나요?", a: <div>네, 3시 전이면 당일 바로 입금되요!</div> },
  { q: "사은품 금액은 왜 업체마다 다른가요?", a: <div>사은품은 가이드 기준이 있어, 과도하게 높은 조건은 주의가 필요해요!</div> },
  { q: "사은품 못 받는 경우도 있나요?", a: <div>설치 불가 지역, 미납/체납 등으로 개통이 불가능한 경우가 있을 수 있어요</div> },
  { q: "중간에 취소하면 사은품은 어떻게 되나요?", a: <div>설치 전 취소는 불이익이 없지만, 설치 후 취소/해지 시 사은품이 반환될 수 있어요</div> },
  { q: "사은품 지급일이 주말이면 어떻게 되나요?", a: <div>다음 영업일에 입금돼요!</div> },
  { q: "가족 명의로 가입해도 사은품 받을 수 있나요?", a: <div>가능해요. 다만 가족관계 증명서와 본인 확인 절차가 필요할 수 있어요</div> },

  { q: "500메가랑 1기가 체감 차이가 있나요?", a: <div>사용 환경에 따라 체감 차이가 있어요. 문의 주시면 맞춤형으로 도와드려요!</div> },
  { q: "와이파이 속도가 느린데 이유가 뭔가요?", a: <div>집 구조/거리/벽/간섭 등 다양한 환경 요인에 따라 속도 체감이 달라질 수 있어요!</div> },
  { q: "통신사마다 품질 차이가 많이 나나요?", a: <div>지역 망 구성에 따라 차이가 날 수 있어요. 설치 가능 조회 후 추천 받는 것이 좋아요!</div> },
  { q: "집이 넓은데 와이파이가 잘 안되요", a: <div>넓은 공간은 증폭기 또는 메시 와이파이를 고려하셔야 해요!</div> },
  { q: "지금 쓰는 통신사랑 같은 곳으로 해야 하나요?", a: <div>아뇨, 꼭 같은 통신사로 하실 필요는 없어요. 연락 주시면 혜택 좋은 곳으로 안내해드려요!</div> },
  { q: "가족 통신사도 같이 변경할 수 있나요?", a: <div>네, 가능합니다! 결합/추가 혜택은 조건에 따라 달라요</div> },
  { q: "TV까지 같이 하면 뭐가 더 좋은가요?", a: <div>구성에 따라 혜택이 달라질 수 있고, 시청 환경도 개선될 수 있어요</div> },
  { q: "신규가입이랑 재약정 중 뭐가 유리한가요?", a: <div>조건에 따라 달라요. 비교해서 가장 유리한 방향으로 안내해드려요!</div> },
  { q: "이사 예정인데 언제 신청하는 게 좋나요?", a: <div>이사 날짜가 정해지면 미리 문의 주시면 일정/조건 맞춰 도와드려요!</div> },
  { q: "이사 전에 미리 가입해도 되나요?", a: <div>네, 미리 가입하셔도 괜찮아요!</div> },
  { q: "명의 변경도 가능한가요?", a: <div>조건에 따라 가능하며, 변경 이력에 따라 혜택 조건이 달라질 수 있어요. 담당자 안내를 받아주세요</div> },
  { q: "인터넷만 쓰다가 TV를 나중에 추가할 수 있나요?", a: <div>네, 당연히 추가할 수 있어요</div> },
  { q: "기존 인터넷 해지는 제가 해야 하나요?", a: <div>기존 통신사의 인터넷은 고객센터를 통해 직접 해지를 해야해요</div> },
  { q: "이전 설치 비용도 발생하나요?", a: <div>인터넷 이전 시 조건에 따라 이전 비용이 나올 수 있어요</div> },
  { q: "나중에 문제가 생기면 누구에게 연락하나요?", a: <div>가입 내용은 담당자, 장애/기술 지원은 통신사 고객센터로 문의해요</div> },
  { q: "개인정보는 안전하게 관리되나요?", a: <div>네, 개인정보는 회사가 가장 중요하게 생각하고 안전하게 관리해요</div> },
];

export default function Support() {
  const totalPages = 5;

  const [page, setPage] = useState(1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { pageItems, from, to, total } = useMemo(() => {
    const total = FAQ.length;
    const size = Math.ceil(total / totalPages);
    const from = (page - 1) * size;
    const to = Math.min(total, from + size);
    const pageItems = FAQ.slice(from, to);
    return { pageItems, from, to, total };
  }, [page, totalPages]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="space-y-6">
          {/* 상단 문구 (박스 없이) */}
          <div className="text-[15px] sm:text-base text-gray-700 leading-relaxed">
            추가로 궁금한게 있으면 통신잇으로 연락주시면 상담 도와드리겠습니다.
          </div>

          {/* 페이지 정보 */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              전체 {total}개 중 <span className="font-bold text-gray-900">{from + 1}</span> -{" "}
              <span className="font-bold text-gray-900">{to}</span> 표시
            </div>
            <div className="text-sm font-semibold text-gray-700">
              페이지 {page} / {totalPages}
            </div>
          </div>

          {/* FAQ */}
          <div className="grid gap-3">
            {pageItems.map((it, i) => {
              const globalIndex = from + i;
              const open = openIndex === globalIndex;

              return (
                <AccordionItem
                  key={`${globalIndex}-${it.q}`}
                  q={it.q}
                  a={it.a}
                  open={open}
                  onToggle={() => setOpenIndex((prev) => (prev === globalIndex ? null : globalIndex))}
                />
              );
            })}
          </div>

          {/* Pagination */}
          <PageNav
            page={page}
            totalPages={totalPages}
            onChange={(p) => {
              setPage(p);
              setOpenIndex(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    </div>
  );
}
