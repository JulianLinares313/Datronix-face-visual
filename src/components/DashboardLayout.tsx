import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Home,
  Tag,
  Package,
  Truck,
  BarChart3,
  Users,
  History,
  Undo2,
  Wallet,
  Headphones,
  LogOut,
  Menu,
  Bell,
  Search,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AsistenteIA } from "@/components/AsistenteIA";

const nav = [
  { to: "/", label: "Principal", icon: Home },
  { to: "/ventas", label: "Nueva venta", icon: Tag },
  { to: "/historial", label: "Historial y remisiones", icon: History },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/productos", label: "Productos", icon: Package },
  { to: "/proveedores", label: "Proveedores", icon: Truck },
  { to: "/devoluciones", label: "Devoluciones", icon: Undo2 },
  { to: "/reportes", label: "Reportes", icon: BarChart3 },
  { to: "/nomina", label: "Nómina", icon: Wallet },
  { to: "/soporte", label: "Soporte", icon: Headphones },
] as const;


function todayEs() {
  return new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function DashboardLayout({
  breadcrumb,
  children,
}: {
  breadcrumb: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gradient-sidebar text-sidebar-foreground transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="border-b border-sidebar-border px-6 py-6 text-center">
          <p className="text-xl font-semibold tracking-wide">Datronix</p>
          <div className="mx-auto mt-3 h-px w-32 bg-sidebar-border" />
          <p className="mt-3 text-xs font-medium tracking-[0.3em] opacity-80">
            IA
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 text-sm transition-colors",
                  active
                    ? "bg-sidebar-primary font-semibold"
                    : "hover:bg-sidebar-accent/70",
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <Link
            to="/login"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-sidebar-accent/50 px-4 py-2 text-sm transition-colors hover:bg-sidebar-accent"
          >
            <LogOut className="size-4" />
            Salir
          </Link>
        </div>

      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="lg:pl-64">
        <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-2 text-sm">
          <button
            className="rounded-md p-2 hover:bg-muted lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </button>
          <span className="text-primary">♥</span>
          <span className="font-medium">
            We Transform Data into Intelligent Decisions!
          </span>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-md border border-border px-3 py-1.5 text-muted-foreground md:flex">
              <Search className="size-4" />
              <span className="text-xs">Buscar...</span>
            </div>
            <button className="rounded-md p-2 hover:bg-muted" aria-label="Notificaciones">
              <Bell className="size-5" />
            </button>
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              AD
            </div>
          </div>
        </div>

        <header className="bg-gradient-header px-6 py-8 text-primary-foreground">
          <p className="text-center text-lg font-medium">{breadcrumb}</p>
          <p className="mt-4 text-center text-base opacity-90">
            Hoy es {todayEs()}
          </p>
        </header>

        <main className="p-4 md:p-6">{children}</main>
      </div>

      <AsistenteIA />
    </div>

  );
}
