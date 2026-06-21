"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { EventItem } from "@/types/event";

type TabType = "confirmados" | "criados";

export default function MeusEventosPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("confirmados");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const route = activeTab === "confirmados"
      ? `/participants/user/${user.id}`
      : `/events?creatorId=${user.id}`;

    apiFetch(route)
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeTab, user]);

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-[#09054A]">Meus eventos</h1>

      <div className="mb-8 flex gap-4 border-b border-slate-300">
        <button type="button" onClick={() => setActiveTab("confirmados")} className={`pb-2 font-semibold ${activeTab === "confirmados" ? "border-b-2 border-[#09054A] text-[#09054A]" : "text-slate-500"}`}>
          Eventos confirmados
        </button>
        <button type="button" onClick={() => setActiveTab("criados")} className={`pb-2 font-semibold ${activeTab === "criados" ? "border-b-2 border-[#09054A] text-[#09054A]" : "text-slate-500"}`}>
          Eventos criados
        </button>
      </div>

      {loading ? (
        <p className="text-[#09054A]">Carregando...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}