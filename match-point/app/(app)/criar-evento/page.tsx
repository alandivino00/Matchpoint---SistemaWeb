"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function CriarEventoPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    esporte: "",
    local: "",
    data: "",
    horario: "",
    horarioFim: "",
    descricao: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/events", {
        method: "POST",
        body: JSON.stringify({ ...form, creatorId: user?.id }),
      });
      router.push("/eventos");
    } catch {
      alert("Erro ao criar evento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold text-[#09054A]">Criar evento</h1>
      <p className="mb-8 text-[#09054A]">Organize um novo treino</p>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
          <h2 className="mb-4 text-xl font-bold">Esporte e local</h2>
          <div className="space-y-4">
            <input name="esporte" value={form.esporte} onChange={handleChange} className="w-full rounded-lg border border-[#FFAA00] bg-transparent p-3 outline-none" placeholder="Selecione o esporte" required />
            <input name="local" value={form.local} onChange={handleChange} className="w-full rounded-lg border border-[#FFAA00] bg-transparent p-3 outline-none" placeholder="Local" required />
            <input name="data" value={form.data} onChange={handleChange} className="w-full rounded-lg border border-[#FFAA00] bg-transparent p-3 outline-none" placeholder="Data" required />
          </div>
        </div>

        <div className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
          <h2 className="mb-4 text-xl font-bold">Horário e regras</h2>
          <div className="space-y-4">
            <input name="horario" value={form.horario} onChange={handleChange} className="w-full rounded-lg border border-[#FFAA00] bg-transparent p-3 outline-none" placeholder="Horário de início" required />
            <input name="horarioFim" value={form.horarioFim} onChange={handleChange} className="w-full rounded-lg border border-[#FFAA00] bg-transparent p-3 outline-none" placeholder="Horário de fim" />
          </div>
        </div>

        <div className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
          <h2 className="mb-4 text-xl font-bold">Descrição</h2>
          <textarea name="descricao" value={form.descricao} onChange={handleChange} className="h-40 w-full rounded-lg border border-[#FFAA00] bg-transparent p-3 outline-none" placeholder="Adicione informações adicionais..." />
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={() => router.back()} className="rounded-lg border border-[#FFAA00] px-5 py-2 font-semibold">Cancelar</button>
            <button type="submit" disabled={loading} className="rounded-lg bg-[#FFAA00] px-5 py-2 font-semibold text-[#09054A] disabled:opacity-60">
              {loading ? "Criando..." : "Criar evento"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}