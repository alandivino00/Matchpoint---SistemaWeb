"use client";

import { useEffect, useMemo, useState } from "react";
import EventCard from "@/components/EventCard";
import FilterPanel from "@/components/FilterPanel";
import { apiFetch } from "@/lib/api";
import { EventItem } from "@/types/event";

export default function EventosPage() {
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
      <header className="mb-8 flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#09054A]">Eventos</h1>
          <p className="text-[#09054A]">Encontre treinos e participe</p>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-400 px-4 py-3 outline-none xl:max-w-[420px]"
            placeholder="Buscar eventos, atléticas ou locais..."
          />
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#09054A]">Ordenar por</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-[#09054A] px-3 py-2 text-sm outline-none"
            >
              <option value="provavel">Mais prováveis</option>
              <option value="mais-confirmados">Mais confirmados</option>
            </select>
          </div>
        </div>
      </header>

      {loading ? (
        <p className="text-[#09054A]">Carregando eventos...</p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <FilterPanel sportFilter={sportFilter} setSportFilter={setSportFilter} />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}