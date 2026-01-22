// src/pages/Login.tsx
import { supabase } from "../lib/supabase";

export default function Login() {
  const signInGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <button
        onClick={signInGoogle}
        className="h-12 px-6 rounded-lg border"
      >
        구글로 로그인
      </button>
    </div>
  );
}
