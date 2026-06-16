import EventCard from "@/components/EventCard";
import { myConfirmedEvents, myCreatedEvents } from "@/lib/mock";

export default function MeusEventosPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-[#09054A]">Meus eventos</h1>

      <div className="mb-8 flex gap-4 border-b border-slate-300">
        <button className="border-b-2 border-[#09054A] pb-2 font-semibold text-[#09054A]">
          Eventos confirmados
        </button>
        <button className="pb-2 font-semibold text-[#09054A]">
          Eventos criados
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {myCreatedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-[#09054A]">Confirmados</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {myConfirmedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}