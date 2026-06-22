"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const items = [
  { href: "/eventos", label: "Eventos", icon: "📅" },
  { href: "/criar-evento", label: "Criar evento", icon: "➕" },
  { href: "/meus-eventos", label: "Meus eventos", icon: "🗂️" },
  { href: "/perfil", label: "Perfil", icon: "👤" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/");
  }

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
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm font-semibold transition ${
                active ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 text-sm font-semibold hover:opacity-80"
      >
        <span>→</span> Sair
      </button>
    </aside>
  );
}