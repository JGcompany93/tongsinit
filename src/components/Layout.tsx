import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen text-gray-900">
      <Header />

      {/* ✅ 헤더 아래 여백 제거: py-8 -> pt-0 */}
      <main className="w-full pt-0">
        <Outlet />
      </main>

    </div>
  );
}
