import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen text-gray-900">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} My Site. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
