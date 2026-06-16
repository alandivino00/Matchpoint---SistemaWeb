export default function CriarEventoPage() {
  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold text-[#09054A]">Criar evento</h1>
      <p className="mb-8 text-[#09054A]">Organize um novo treino</p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
          <h2 className="mb-4 text-xl font-bold">Esporte e local</h2>
          <div className="space-y-4">
            <input className="w-full rounded-lg border border-[#FFAA00] bg-transparent p-3 outline-none" placeholder="Selecione o esporte" />
            <input className="w-full rounded-lg border border-[#FFAA00] bg-transparent p-3 outline-none" placeholder="Local" />
            <input className="w-full rounded-lg border border-[#FFAA00] bg-transparent p-3 outline-none" placeholder="Data" />
          </div>
        </div>

        <div className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
          <h2 className="mb-4 text-xl font-bold">Horário e regras</h2>
          <div className="space-y-4">
            <input className="w-full rounded-lg border border-[#FFAA00] bg-transparent p-3 outline-none" placeholder="Horário" />
            <input className="w-full rounded-lg border border-[#FFAA00] bg-transparent p-3 outline-none" placeholder="Horário" />
          </div>
        </div>

        <div className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
          <h2 className="mb-4 text-xl font-bold">Descrição</h2>
          <textarea className="h-40 w-full rounded-lg border border-[#FFAA00] bg-transparent p-3 outline-none" placeholder="Adicione informações adicionais..." />
          <div className="mt-6 flex gap-3">
            <button className="rounded-lg border border-[#FFAA00] px-5 py-2 font-semibold">Cancelar</button>
            <button className="rounded-lg bg-[#FFAA00] px-5 py-2 font-semibold text-[#09054A]">Criar evento</button>
          </div>
        </div>
      </div>
    </section>
  );
}