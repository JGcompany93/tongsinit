import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Internet from "./pages/Internet";
import Phone from "./pages/Phone";
import Board from "./pages/Board";
import Reviews from "./pages/Reviews";
import Support from "./pages/Support";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* 로그인: 헤더/푸터 없는 단독 화면 */}
      <Route path="/login" element={<Login />} />

      {/* 나머지: 헤더/푸터 포함 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/internet" element={<Internet />} />
        <Route path="/phone" element={<Phone />} />
        <Route path="/board" element={<Board />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
