export default function FilterPanel() {
  return (
    <aside className="w-full max-w-[260px] rounded-2xl border border-[#1D2A8A] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Filtros</h2>
        <button className="text-sm underline">Limpar filtros</button>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <label className="mb-1 block font-semibold">Esporte</label>
          <select className="w-full rounded-lg border border-[#1D2A8A] p-2">
            <option>Todos</option>
            <option>Futsal</option>
            <option>Vôlei</option>
            <option>Basquete</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-semibold">Data</label>
          <select className="w-full rounded-lg border border-[#1D2A8A] p-2">
            <option>Selecione</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-semibold">Atlética</label>
          <select className="w-full rounded-lg border border-[#1D2A8A] p-2">
            <option>Todas</option>
          </select>
        </div>

        <button className="w-full rounded-lg bg-[#09054A] px-4 py-2 font-semibold text-white">
          Aplicar filtros
        </button>
      </div>
    </aside>
  );
}