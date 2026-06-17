"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import { myConfirmedEvents, myCreatedEvents } from "@/lib/mock";

type TabType = "confirmados" | "criados";

export default function MeusEventosPage() {
  const [activeTab, setActiveTab] = useState<TabType>("confirmados");

  const events =
    activeTab === "confirmados" ? myConfirmedEvents : myCreatedEvents;

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-[#09054A]">Meus eventos</h1>

      <div className="mb-8 flex gap-4 border-b border-slate-300">
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}