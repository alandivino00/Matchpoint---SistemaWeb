import Link from "next/link";
import { EventItem } from "@/types/event";

type EventCardProps = {
  event: EventItem;
};

function getViabilidadeLabel(indice: number) {
  if (indice >= 70) return { label: "Alta", color: "text-green-400" };
  if (indice >= 40) return { label: "Média", color: "text-yellow-400" };
  return { label: "Baixa", color: "text-red-400" };
}

function getEsporteIcon(esporte: string) {
  const s = esporte.toUpperCase();
  if (s.includes("FUTSAL") || s.includes("FUTEBOL")) return "⚽";
  if (s.includes("VÔLEI") || s.includes("VOLEI")) return "🏐";
  if (s.includes("BASQUETE")) return "🏀";
  if (s.includes("HANDEBOL")) return "🤾";
  return "🏅";
}

export default function EventCard({ event }: EventCardProps) {
  const { label, color } = getViabilidadeLabel(event.indice);

  return (
    <Link href={`/eventos/${event.id}`}>
      <article className="cursor-pointer rounded-2xl bg-[#09054A] p-5 text-[#FFAA00] shadow-sm hover:opacity-90 transition-opacity">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">{getEsporteIcon(event.esporte)}</span>
          <div>
            <h3 className="text-lg font-bold">{event.esporte}</h3>
            <p className="text-sm opacity-80">{event.local}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>{event.data} - {event.horario}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>👥</span>
            <span>{event.confirmados}/{event.maxJogadores} confirmados</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#FFAA00]/20">
            <div
              className="h-full rounded-full bg-[#FFAA00] transition-all"
              style={{ width: `${event.indice}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs">
            <span>{event.indice}%</span>
            <span className={color}>{label}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}