import { eventsMock } from "@/lib/mock";

export default function EventoDetalhePage({
  params,
}: {
  params: { id: string };
}) {
  const event = eventsMock.find((item) => item.id === params.id);

  if (!event) return <div>Evento não encontrado.</div>;

  return (
    <section className="space-y-6">
      <button className="text-[#09054A] font-semibold">← Voltar</button>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00] lg:col-span-1">
          <h1 className="text-3xl font-bold">{event.esporte}</h1>
          <div className="mt-8 space-y-4 text-sm">
            <p><strong>Data:</strong> {event.data}</p>
            <p><strong>Horário:</strong> {event.horario}</p>
            <p><strong>Máximo de jogadores:</strong> {event.confirmados}/{event.maxJogadores}</p>
          </div>
        </article>

        <article className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
          <h2 className="text-xl font-bold">Informações</h2>
          <p className="mt-6 text-sm">{event.descricao}</p>
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
        <button className="mt-6 rounded-xl bg-[#FFAA00] px-6 py-3 font-bold text-[#09054A]">
          Confirmar presença
        </button>
      </div>
    </section>
  );
}