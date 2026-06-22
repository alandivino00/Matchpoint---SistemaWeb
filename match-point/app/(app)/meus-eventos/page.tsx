"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { EventItem } from "@/types/event";

type TabType = "confirmados" | "criados";

export default function MeusEventosPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("confirmados");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const route =
      activeTab === "confirmados"
        ? `/users/${user.id}/events`
        : `/events/by-creator/${user.id}`;

    apiFetch(route)
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeTab, user]);

  async function handleCancelarPresenca(eventId: string) {
    if (!user) return;
    try {
      await apiFetch(`/events/${eventId}/participants`, {
        method: "DELETE",
        body: JSON.stringify({ userId: user.id }),
      });
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch {
      alert("Erro ao cancelar presença.");
    }
  }

  async function handleCancelarEvento(eventId: string) {
    try {
      await apiFetch(`/events/${eventId}`, { method: "DELETE" });
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch {
      alert("Erro ao cancelar evento.");
    }
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#09054A]">Meus eventos</h1>
        <button
          type="button"
          onClick={() => router.push("/criar-evento")}
          className="rounded-lg border border-[#09054A] px-4 py-2 font-semibold text-[#09054A] hover:bg-[#09054A] hover:text-white transition-colors"
        >
          Criar evento +
        </button>
      </div>

      <div className="mb-6 flex gap-6 border-b border-slate-300">
        <button
          type="button"
          onClick={() => setActiveTab("confirmados")}
          className={`pb-2 font-semibold ${
            activeTab === "confirmados"
              ? "border-b-2 border-[#09054A] text-[#09054A]"
              : "text-slate-500"
          }`}
        >
          Eventos confirmados
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("criados")}
          className={`pb-2 font-semibold ${
            activeTab === "criados"
              ? "border-b-2 border-[#09054A] text-[#09054A]"
              : "text-slate-500"
          }`}
        >
          Eventos criados
        </button>
      </div>

      <h2 className="mb-4 text-xl font-bold text-[#09054A]">
        {activeTab === "confirmados" ? "Eventos confirmados" : "Eventos criados"}
      </h2>

      {loading ? (
        <p className="text-[#09054A]">Carregando...</p>
      ) : events.length === 0 ? (
        <p className="text-slate-500">Nenhum evento encontrado.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-[#09054A]">
          <table className="w-full text-sm text-[#FFAA00]">
            <thead>
              <tr className="border-b border-[#FFAA00]/20">
                <th className="px-6 py-4 text-left font-bold">Esporte</th>
                <th className="px-6 py-4 text-left font-bold">Local</th>
                <th className="px-6 py-4 text-left font-bold">Data</th>
                <th className="px-6 py-4 text-left font-bold">Horário</th>
                <th className="px-6 py-4 text-left font-bold">Confirmados</th>
                <th className="px-6 py-4 text-left font-bold">Índice</th>
                <th className="px-6 py-4 text-left font-bold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-[#FFAA00]/10 last:border-0">
                  <td className="px-6 py-4 font-semibold">{event.esporte}</td>
                  <td className="px-6 py-4">{event.local}</td>
                  <td className="px-6 py-4">{event.data}</td>
                  <td className="px-6 py-4">{event.horario}</td>
                  <td className="px-6 py-4">
                    {event.confirmados}/{event.maxJogadores}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-[#FFAA00]/20">
                        <div
                          className="h-full rounded-full bg-[#FFAA00]"
                          style={{ width: `${event.indice}%` }}
                        />
                      </div>
                      <span className="text-xs">{event.indice}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {activeTab === "criados" ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => router.push(`/eventos/${event.id}`)}
                          className="rounded-lg border border-[#FFAA00] px-3 py-1 text-xs font-semibold hover:bg-[#FFAA00] hover:text-[#09054A] transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCancelarEvento(event.id)}
                          className="rounded-lg border border-[#FFAA00] px-3 py-1 text-xs font-semibold hover:bg-[#FFAA00] hover:text-[#09054A] transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleCancelarPresenca(event.id)}
                        className="rounded-lg border border-[#FFAA00] px-3 py-1 text-xs font-semibold hover:bg-[#FFAA00] hover:text-[#09054A] transition-colors"
                      >
                        Cancelar presença
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}