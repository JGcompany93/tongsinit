import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="text-gray-700">페이지를 찾을 수 없습니다.</p>
      <Link className="text-sm font-medium text-gray-900 underline" to="/">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
