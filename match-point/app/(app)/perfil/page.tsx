export default function PerfilPage() {
  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#09054A]">Perfil</h1>
        <button className="rounded-lg border border-[#09054A] px-4 py-2 font-semibold text-[#09054A]">
          Editar perfil
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
          <h2 className="text-xl font-bold">Eventos confirmados</h2>
          <p className="mt-6 text-5xl font-bold">12</p>
        </div>

        <div className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
          <h2 className="text-xl font-bold">Eventos criados</h2>
          <p className="mt-6 text-5xl font-bold">12</p>
        </div>

        <div className="rounded-2xl bg-[#09054A] p-6 text-[#FFAA00]">
          <h2 className="text-xl font-bold">Presença</h2>
          <p className="mt-6 text-5xl font-bold">87%</p>
        </div>
      </div>
    </section>
  );
}