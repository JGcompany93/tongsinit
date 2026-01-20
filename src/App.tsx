import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Internet from "./pages/Internet";

import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* 로그인: 헤더/푸터 없는 단독 화면 */}
      {/* 나머지: 헤더/푸터 포함 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/internet" element={<Internet />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
