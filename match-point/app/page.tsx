"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

        {/* Lado esquerdo — logo + features */}
        <section className="flex flex-col items-center justify-center gap-8 text-[#09054A]">
          <Image
            src="/matchpoint_foto.jpg"
            alt="MatchPoint logo"
            width={320}
            height={320}
            className="object-contain"
            priority
          />

          <ul className="space-y-4 text-sm font-semibold">
            <li className="flex items-center gap-3">
              <span className="text-xl">🏃</span>
              Encontre treinos próximos
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl">✅</span>
              Confirme presença com facilidade
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl">👥</span>
              Construa uma comunidade ativa
            </li>
          </ul>
        </section>

        {/* Lado direito — formulário */}
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

            <div className="text-right">
              <button type="button" className="text-sm text-[#09054A] underline">
                Esqueceu sua senha?
              </button>
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

            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-slate-300" />
              <span className="text-sm text-slate-500">ou continue com</span>
              <div className="h-px flex-1 bg-slate-300" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-3 text-sm font-semibold text-[#09054A] hover:bg-slate-50"
              >
                <span>G</span> Entrar com Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-3 text-sm font-semibold text-[#09054A] hover:bg-slate-50"
              >
                🎓 Entrar com conta UFBA
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}