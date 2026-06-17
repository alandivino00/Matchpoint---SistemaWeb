type FilterPanelProps = {
  sportFilter: string;
  setSportFilter: (value: string) => void;
};

export default function FilterPanel({
  sportFilter,
  setSportFilter,
}: FilterPanelProps) {
  return (
    <aside className="w-full max-w-[260px] rounded-2xl border border-[#1D2A8A] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-[#09054A]">Filtros</h2>
        <button
          type="button"
          onClick={() => setSportFilter("Todos")}
          className="text-sm underline text-[#09054A]"
        >
          Limpar filtros
        </button>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <label className="mb-1 block font-semibold text-[#09054A]">
            Esporte
          </label>
          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            className="w-full rounded-lg border border-[#1D2A8A] p-2 outline-none"
          >
            <option value="Todos">Todos</option>
            <option value="FUTSAL">Futsal</option>
            <option value="VÔLEI">Vôlei</option>
            <option value="BASQUETE">Basquete</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-semibold text-[#09054A]">
            Data
          </label>
          <select className="w-full rounded-lg border border-[#1D2A8A] p-2 outline-none">
            <option>Selecione</option>
            <option>09/05/2026</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-semibold text-[#09054A]">
            Atlética
          </label>
          <select className="w-full rounded-lg border border-[#1D2A8A] p-2 outline-none">
            <option>Todas</option>
          </select>
        </div>
      </div>
    </aside>
  );
}