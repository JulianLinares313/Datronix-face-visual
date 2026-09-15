import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Warehouse, Users } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard, Panel, DataTable, Pill } from "@/components/module-ui";
import { SearchBar, RowActions } from "@/components/form-ui";

export const Route = createFileRoute("/usuarios")({
  head: () => ({
    meta: [
      { title: "Usuarios y roles — Datronix" },
      {
        name: "description",
        content:
          "Gestión de usuarios de Datronix con asignación de rol Administrador o Bodega.",
      },
      { property: "og:title", content: "Usuarios y roles — Datronix" },
      {
        property: "og:description",
        content: "Crea usuarios y asigna el rol Administrador o Bodega.",
      },
    ],
  }),
  component: Usuarios,
});

const ROLES = ["ADMINISTRADOR", "BODEGA"] as const;
type Rol = (typeof ROLES)[number];

const usuariosMock: {
  id: string;
  nombre: string;
  correo: string;
  rol: Rol;
}[] = [
  { id: "1094567321", nombre: "Andrea Ruiz", correo: "andrea@datronix.co", rol: "ADMINISTRADOR" },
  { id: "1020334455", nombre: "Luis Ortega", correo: "luis@datronix.co", rol: "BODEGA" },
  { id: "1033445566", nombre: "Marta Peña", correo: "marta@datronix.co", rol: "BODEGA" },
  { id: "1077889900", nombre: "Carlos Mena", correo: "carlos@datronix.co", rol: "ADMINISTRADOR" },
];

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

function Usuarios() {
  const [rol, setRol] = useState<Rol>("ADMINISTRADOR");

  return (
    <DashboardLayout breadcrumb="Administrador/Seguridad/Usuarios y roles">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Usuarios registrados"
          value={String(usuariosMock.length)}
          hint="Cuentas activas"
          icon={<Users className="size-4" />}
        />
        <StatCard
          label="Administradores"
          value={String(usuariosMock.filter((u) => u.rol === "ADMINISTRADOR").length)}
          hint="Acceso al panel principal"
          icon={<ShieldCheck className="size-4" />}
        />
        <StatCard
          label="Personal de bodega"
          value={String(usuariosMock.filter((u) => u.rol === "BODEGA").length)}
          hint="Acceso al portal de bodega"
          icon={<Warehouse className="size-4" />}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Registrar nuevo usuario">
          <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Cédula (ID usuario)
              </span>
              <input className={inputClass} placeholder="Ej: 1094567321" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Nombre completo
              </span>
              <input className={inputClass} placeholder="Nombre del usuario" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Correo
              </span>
              <input
                type="email"
                className={inputClass}
                placeholder="usuario@datronix.co"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Contraseña
              </span>
              <input type="password" className={inputClass} placeholder="••••••••" />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Rol del usuario
              </span>
              <select
                className={inputClass}
                value={rol}
                onChange={(e) => setRol(e.target.value as Rol)}
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r === "ADMINISTRADOR" ? "Administrador" : "Bodega"}
                  </option>
                ))}
              </select>
            </label>

            <p className="rounded-md bg-primary-soft px-3 py-2 text-xs text-secondary-foreground">
              {rol === "ADMINISTRADOR"
                ? "Administrador: ingresa al panel principal con todos los módulos."
                : "Bodega: ingresa al portal de bodega (subdominio) con remisiones y despachos."}
            </p>

            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Guardar usuario
            </button>
          </form>
        </Panel>

        <Panel title="Usuarios del sistema" className="lg:col-span-2">
          <div className="mb-3">
            <SearchBar placeholder="Buscar por cédula, nombre o correo..." />
          </div>
          <DataTable
            columns={["Cédula", "Nombre", "Correo", "Rol", "Acciones"]}
            rows={usuariosMock.map((u) => [
              u.id,
              u.nombre,
              u.correo,
              <Pill tone={u.rol === "ADMINISTRADOR" ? "primary" : "warning"}>
                {u.rol}
              </Pill>,
              <RowActions />,
            ])}
          />
        </Panel>
      </div>

      <Panel title="Redirección por rol" className="mt-4">
        <div className="grid gap-3 sm:grid-cols-2 text-sm">
          <div className="rounded-md border border-border p-3">
            <p className="font-semibold">ADMINISTRADOR</p>
            <p className="mt-1 text-muted-foreground">
              Ingresa a esta página principal (panel, ventas, inventario, reportes).
            </p>
          </div>
          <div className="rounded-md border border-border p-3">
            <p className="font-semibold">BODEGA</p>
            <p className="mt-1 text-muted-foreground">
              Ingresa al subdominio de bodega que se configurará más adelante.
            </p>
          </div>
        </div>
      </Panel>
    </DashboardLayout>
  );
}
