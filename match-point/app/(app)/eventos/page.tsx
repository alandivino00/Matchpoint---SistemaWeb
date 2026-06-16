import EventCard from "@/components/EventCard";
import FilterPanel from "@/components/FilterPanel";
import { eventsMock } from "@/lib/mock";

export default function EventosPage() {
  return (
    <section>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#09054A]">Eventos</h1>
        <p className="text-[#09054A]">Encontre treinos e participe</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <FilterPanel />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {eventsMock.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}