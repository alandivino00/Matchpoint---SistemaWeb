"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/eventos");
    } catch {
      setError("Email ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
        <section className="flex flex-col items-center justify-center text-[#09054A]">
          <div className="mb-8 h-44 w-44 rounded-full border-4 border-[#09054A]" />
          <h1 className="text-5xl font-black tracking-tight">
            MATCH<span className="text-[#FFAA00]">POINT</span>
          </h1>
          <p className="mt-3 text-sm tracking-[0.3em] text-slate-500">
            TREINE. PARTICIPE. CONECTE-SE.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[560px]">
          <h2 className="mb-6 text-3xl font-bold text-[#09054A]">Entrar</h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#09054A]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#1D2A8A] p-3 outline-none"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#09054A]">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#1D2A8A] p-3 outline-none"
                placeholder="••••••••••••"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#09054A] py-3 font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <button
              type="button"
              className="w-full rounded-lg border border-[#1D2A8A] py-3 font-semibold text-[#09054A]"
            >
              Cadastrar-se
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}