"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export default function PerfilPage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [perfil, setPerfil] = useState({
    nome: "",
    email: "",
    atletica: "",
    curso: "",
    sobre: "",
  });

  useEffect(() => {
  if (!user) return;
  apiFetch(`/users/${user.id}`).then((data) => {
    setPerfil({
      nome: data.nome ?? "",
      email: data.email ?? "",
      atletica: data.atletica ?? "",
      curso: data.curso ?? "",
      sobre: data.sobre ?? "",
    });
  });
}, [user]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    if (!user) return;
    setLoading(true);
    try {
      await apiFetch(`/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(perfil),
      });
      setEditing(false);
    } catch {
      alert("Erro ao salvar perfil.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#09054A]">Perfil</h1>
        {editing ? (
          <div className="flex gap-3">
            <button type="button" onClick={() => setEditing(false)} className="rounded-lg border border-[#09054A] px-4 py-2 font-semibold text-[#09054A]">Cancelar</button>
            <button type="button" onClick={handleSave} disabled={loading} className="rounded-lg bg-[#09054A] px-4 py-2 font-semibold text-white disabled:opacity-60">
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setEditing(true)} className="rounded-lg border border-[#09054A] px-4 py-2 font-semibold text-[#09054A]">Editar perfil</button>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          {(["nome", "email", "atletica", "curso"] as const).map((field) => (
            <div key={field}>
              <h2 className="mb-2 text-xl font-bold text-[#09054A] capitalize">{field}</h2>
              {editing ? (
                <input name={field} value={perfil[field]} onChange={handleChange} className="w-full rounded-lg border border-[#1D2A8A] p-3 outline-none" />
              ) : (
                <p className="text-lg text-[#09054A]">{perfil[field] || "—"}</p>
              )}
            </div>
          ))}
        </div>

        <div>
          <h2 className="mb-2 text-xl font-bold text-[#09054A]">Sobre mim</h2>
          {editing ? (
            <textarea name="sobre" value={perfil.sobre} onChange={handleChange} className="h-32 w-full rounded-lg border border-[#1D2A8A] p-3 outline-none" />
          ) : (
            <p className="text-lg text-[#09054A]">{perfil.sobre || "—"}</p>
          )}
        </div>
      </div>
    </section>
  );
}