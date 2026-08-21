import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Toolbar, Panel, DataTable, Pill, StatCard } from "@/components/module-ui";

export const Route = createFileRoute("/proveedores")({
  head: () => ({
    meta: [
      { title: "Proveedores — Datronix" },
      { name: "description", content: "Directorio de proveedores, contactos, condiciones y saldos pendientes." },
      { property: "og:title", content: "Proveedores — Datronix" },
      { property: "og:description", content: "Contactos, condiciones de pago y saldos por proveedor." },
    ],
  }),
  component: Proveedores,
});

function Proveedores() {
  return (
    <DashboardLayout breadcrumb="Administrador/Compras/Proveedores">
      <Toolbar title="Proveedores" action="Nuevo proveedor" />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Proveedores activos" value="48" />
        <StatCard label="Órdenes abiertas" value="12" />
        <StatCard label="Saldo por pagar" value="$32.900.000" />
      </div>
      <Panel>
        <DataTable
          columns={["NIT", "Proveedor", "Contacto", "Teléfono", "Condición", "Estado"]}
          rows={[
            ["900.123-4", "Distribuciones Delta", "Jorge Mena", "310 445 8899", "30 días", <Pill tone="success">Activo</Pill>],
            ["901.556-1", "TecnoImport SAS", "Laura Cano", "320 118 2233", "Contado", <Pill tone="success">Activo</Pill>],
            ["800.998-7", "Global Parts", "Andrés Rey", "315 776 5544", "60 días", <Pill tone="warning">En revisión</Pill>],
            ["901.221-9", "Suministros Andinos", "Paula Díaz", "300 334 1122", "30 días", <Pill tone="danger">Inactivo</Pill>],
          ]}
        />
      </Panel>
    </DashboardLayout>
  );
}
