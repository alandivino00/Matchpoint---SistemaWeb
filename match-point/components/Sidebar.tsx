"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/eventos", label: "Eventos" },
  { href: "/criar-evento", label: "Criar evento" },
  { href: "/meus-eventos", label: "Meus eventos" },
  { href: "/perfil", label: "Perfil" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-[240px] bg-[#09054A] px-6 py-8 text-[#FFAA00] md:flex md:flex-col">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-3 h-16 w-16 rounded-full border border-[#FFAA00]" />
        <h1 className="text-lg font-semibold">Matchpoint UFBA</h1>
      </div>

      <nav className="flex flex-col gap-4">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded px-3 py-2 text-sm font-semibold transition ${
                active ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto text-sm font-semibold">Sair</div>
    </aside>
  );
}