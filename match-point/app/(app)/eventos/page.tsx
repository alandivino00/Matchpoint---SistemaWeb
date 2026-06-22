"use client";

import { useEffect, useMemo, useState } from "react";
import EventCard from "@/components/EventCard";
import FilterPanel from "@/components/FilterPanel";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { EventItem } from "@/types/event";

export default function EventosPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("provavel");
  const [sportFilter, setSportFilter] = useState("Todos");

  useEffect(() => {
    apiFetch("/events")
      .then((data) => setEvents(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = useMemo(() => {
    const result = events.filter((event) => {
      const matchesSearch =
        event.esporte.toLowerCase().includes(search.toLowerCase()) ||
        event.local.toLowerCase().includes(search.toLowerCase());
      const matchesSport =
        sportFilter === "Todos" ||
        event.esporte.toLowerCase() === sportFilter.toLowerCase();
      return matchesSearch && matchesSport;
    });

    if (sortBy === "provavel") return [...result].sort((a, b) => b.indice - a.indice);
    if (sortBy === "mais-confirmados") return [...result].sort((a, b) => b.confirmados - a.confirmados);
    return result;
  }, [events, search, sortBy, sportFilter]);

  return (
    <section>
      {/* Header */}
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#09054A]">Eventos</h1>
          <p className="text-sm text-[#09054A]">Encontre treinos e participe</p>
        </div>

        <div className="flex flex-1 items-center justify-center px-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl rounded-xl border border-slate-400 px-4 py-2.5 outline-none"
            placeholder="Buscar eventos, atléticas ou locais..."
          />
        </div>

        <div className="flex items-center gap-3 text-[#09054A]">
          <button type="button" className="text-2xl">🔔</button>
          <button type="button" className="text-2xl">👤</button>
          <span className="font-semibold">{user?.nome ?? "Usuário"}</span>
          <span>▼</span>
        </div>
      </header>

      {/* Ordenar */}
      <div className="mb-6 flex justify-end">
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#09054A]">Ordenar por</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-[#09054A] px-4 py-2 pr-8 text-sm text-[#09054A] outline-none"
            >
              <option value="provavel">Mais prováveis</option>
              <option value="mais-confirmados">Mais confirmados</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-2.5 text-[#09054A]">▼</span>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      {loading ? (
        <p className="text-[#09054A]">Carregando eventos...</p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <FilterPanel sportFilter={sportFilter} setSportFilter={setSportFilter} />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.length === 0 ? (
              <p className="text-slate-500 col-span-full">Nenhum evento encontrado.</p>
            ) : (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}