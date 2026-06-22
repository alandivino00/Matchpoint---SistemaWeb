type FilterPanelProps = {
  sportFilter: string;
  setSportFilter: (value: string) => void;
};

export default function FilterPanel({ sportFilter, setSportFilter }: FilterPanelProps) {
  return (
    <aside className="h-fit w-full rounded-2xl border border-[#1D2A8A] p-5">
      <div className="mb-5 flex items-center justify-between">
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
          <label className="mb-1 block font-semibold text-[#09054A]">Esporte</label>
          <div className="relative">
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#1D2A8A] p-2 pr-8 outline-none"
            >
              <option value="Todos">Todos</option>
              <option value="FUTSAL">Futsal</option>
              <option value="VÔLEI">Vôlei</option>
              <option value="BASQUETE">Basquete</option>
              <option value="HANDEBOL">Handebol</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-2.5 text-[#09054A]">▼</span>
          </div>
        </div>

        <div>
          <label className="mb-1 block font-semibold text-[#09054A]">Data</label>
          <div className="relative">
            <select className="w-full appearance-none rounded-lg border border-[#1D2A8A] p-2 pr-8 outline-none">
              <option>Selecione</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-2.5 text-[#09054A]">▼</span>
          </div>
        </div>

        <div>
          <label className="mb-1 block font-semibold text-[#09054A]">Atlética</label>
          <div className="relative">
            <select className="w-full appearance-none rounded-lg border border-[#1D2A8A] p-2 pr-8 outline-none">
              <option>Todas</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-2.5 text-[#09054A]">▼</span>
          </div>
        </div>

        <button
          type="button"
          className="mt-2 w-full rounded-xl bg-[#09054A] py-2.5 font-semibold text-white"
        >
          Aplicar filtros
        </button>
      </div>
    </aside>
  );
}