import Link from "next/link";
import { EventItem } from "@/types/event";

export default function EventCard({ event }: { event: EventItem }) {
  const percent = Math.round((event.confirmados / event.maxJogadores) * 100);

  return (
    <article className="rounded-xl bg-[#09054A] p-5 text-[#FFAA00] shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold">{event.esporte}</h3>
        <p className="text-sm">{event.local}</p>
      </div>

      <div className="space-y-2 text-sm">
        <p>{event.data} - {event.horario}</p>
        <p>{event.confirmados}/{event.maxJogadores} confirmados</p>
        <p>Índice: {percent}%</p>
      </div>

      <Link
        href={`/eventos/${event.id}`}
        className="mt-4 inline-block rounded-lg border border-[#FFAA00] px-4 py-2 text-sm font-semibold"
      >
        Ver detalhes
      </Link>
    </article>
  );
}