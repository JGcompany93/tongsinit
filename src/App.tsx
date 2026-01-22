// src/App.tsx
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Internet from "./pages/internet";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

import FullscreenGuard from "./components/FullscreenGuard";

export default function App() {
  return (
    <>
      {/* PC에서 창이 화면 대비 너무 작아지면 "전체화면에서만 이용" 오버레이 */}
      <FullscreenGuard minRatio={0.9} pcOnly />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/internet" element={<Internet />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
