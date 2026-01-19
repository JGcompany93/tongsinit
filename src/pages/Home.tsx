export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="text-gray-700">
        기본 헤더바가 있는 프론트엔드 초기 뼈대입니다. 여기서 섹션/컴포넌트를
        늘려가면 됩니다.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Card 1</h2>
          <p className="mt-2 text-sm text-gray-600">
            홈 화면에 들어갈 콘텐츠 영역 예시입니다.
          </p>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Card 2</h2>
          <p className="mt-2 text-sm text-gray-600">
            Tailwind로 빠르게 UI를 확장할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
