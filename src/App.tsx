// src/App.tsx
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Internet from "./pages/internet";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

import FullscreenGuard from "./components/FullscreenGuard";

export default function App() {
  // ✅ 모바일에서는 FullscreenGuard 자체를 렌더하지 않도록 차단
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      // 모바일/태블릿 폭에서는 가드 비활성화
      setIsMobile(window.matchMedia("(max-width: 1023px)").matches);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* PC에서 창이 화면 대비 너무 작아지면 "전체화면에서만 이용" 오버레이 */}
      {!isMobile && <FullscreenGuard minRatio={0.9} pcOnly />}

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/internet" element={<Internet />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
