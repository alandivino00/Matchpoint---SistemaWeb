"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { EventItem } from "@/types/event";

export default function EventoDetalhePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmado, setConfirmado] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    apiFetch(`/events/${id}`)
      .then(setEvent)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleConfirmar() {
    if (!user) return;
    setConfirmando(true);
    try {
      await apiFetch("/participants", {
        method: "POST",
        body: JSON.stringify({ eventId: id, userId: user.id }),
      });
      setConfirmado(true);
      setEvent((prev) => prev ? { ...prev, confirmados: prev.confirmados + 1 } : prev);
    } catch {
      alert("Erro ao confirmar presença.");
    } finally {
      setConfirmando(false);
    }
  }

  if (loading) return <p className="text-[#09054A]">Carregando...</p>;
  if (!event) return <div className="text-[#09054A]">Evento não encontrado.</div>;

  const percent = Math.round((event.confirmados / event.maxJogadores) * 100);

  return (
    <section className="space-y-6">
      <Link href="/eventos" className="font-semibold text-[#09054A]">← Voltar</Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00] lg:col-span-1">
          <h1 className="text-3xl font-bold">{event.esporte}</h1>
          <div className="mt-8 space-y-4 text-sm">
            <p><strong>Data:</strong> {event.data}</p>
            <p><strong>Horário:</strong> {event.horario}</p>
            <p><strong>Máximo de jogadores:</strong> {event.confirmados}/{event.maxJogadores}</p>
          </div>
          <div className="mt-10">
            <h2 className="mb-2 text-xl font-bold">Índice de viabilidade</h2>
            <p className="text-2xl font-bold">{percent}%</p>
          </div>
        </article>

        <article className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
          <h2 className="text-xl font-bold">Informações</h2>
          <p className="mt-6 text-sm">{event.descricao || "Sem descrição disponível."}</p>
          <div className="mt-8">
            <h3 className="text-lg font-bold">Local</h3>
            <p className="mt-2 text-sm">{event.local}</p>
          </div>
        </article>

        <article className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
          <h2 className="text-xl font-bold">Regras do evento</h2>
          <ul className="mt-6 space-y-3 text-sm">
            <li>☑ Aberto a todos</li>
            <li>☐ Apenas cursos parceiros</li>
            <li>☐ Somente minha atlética</li>
          </ul>
        </article>
      </div>

      <div className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
        <h2 className="text-xl font-bold">Confirmados ({event.confirmados})</h2>
        <button
          type="button"
          onClick={handleConfirmar}
          disabled={confirmado || confirmando}
          className="mt-6 rounded-xl bg-[#FFAA00] px-6 py-3 font-bold text-[#09054A] disabled:opacity-60"
        >
          {confirmado ? "Presença confirmada ✓" : confirmando ? "Confirmando..." : "Confirmar presença"}
        </button>
      </div>
    </section>
  );
}