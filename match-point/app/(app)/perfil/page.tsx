"use client";

import { useState } from "react";

export default function PerfilPage() {
  const [editing, setEditing] = useState(false);
  const [perfil, setPerfil] = useState({
    nome: "João Silva",
    email: "joao.silva@ufba.br",
    atletica: "Pinguçu",
    curso: "Ciência da Computação",
    sobre: "Fã de esportes e treinos coletivos",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    setEditing(false);
    alert("Perfil atualizado com sucesso!");
  }

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#09054A]">Perfil</h1>

        {editing ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-lg border border-[#09054A] px-4 py-2 font-semibold text-[#09054A]"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-[#09054A] px-4 py-2 font-semibold text-white"
            >
              Salvar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-lg border border-[#09054A] px-4 py-2 font-semibold text-[#09054A]"
          >
            Editar perfil
          </button>
        )}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
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

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-xl font-bold text-[#09054A]">Nome</h2>
            {editing ? (
              <input
                name="nome"
                value={perfil.nome}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#1D2A8A] p-3 outline-none"
              />
            ) : (
              <p className="text-lg text-[#09054A]">{perfil.nome}</p>
            )}
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold text-[#09054A]">Email</h2>
            {editing ? (
              <input
                name="email"
                value={perfil.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#1D2A8A] p-3 outline-none"
              />
            ) : (
              <p className="text-lg text-[#09054A]">{perfil.email}</p>
            )}
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold text-[#09054A]">Atlética</h2>
            {editing ? (
              <input
                name="atletica"
                value={perfil.atletica}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#1D2A8A] p-3 outline-none"
              />
            ) : (
              <p className="text-lg text-[#09054A]">{perfil.atletica}</p>
            )}
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold text-[#09054A]">Curso</h2>
            {editing ? (
              <input
                name="curso"
                value={perfil.curso}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#1D2A8A] p-3 outline-none"
              />
            ) : (
              <p className="text-lg text-[#09054A]">{perfil.curso}</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-bold text-[#09054A]">Sobre mim</h2>
          {editing ? (
            <textarea
              name="sobre"
              value={perfil.sobre}
              onChange={handleChange}
              className="h-32 w-full rounded-lg border border-[#1D2A8A] p-3 outline-none"
            />
          ) : (
            <p className="text-lg text-[#09054A]">{perfil.sobre}</p>
          )}

          <div className="mt-8">
            <h2 className="mb-3 text-xl font-bold text-[#09054A]">Esportes</h2>
            <ul className="list-disc space-y-2 pl-6 text-[#09054A]">
              <li>Futebol: Goleiro</li>
              <li>Vôlei: Central</li>
              <li>League of Legends: Jungler</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}