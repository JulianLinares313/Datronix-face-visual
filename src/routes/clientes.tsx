import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Toolbar, Panel, DataTable, Pill, StatCard } from "@/components/module-ui";

export const Route = createFileRoute("/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes — Datronix" },
      { name: "description", content: "Base de clientes, historial de compras, cartera y segmentación." },
      { property: "og:title", content: "Clientes — Datronix" },
      { property: "og:description", content: "Historial de compras, cartera y segmentación de clientes." },
    ],
  }),
  component: Clientes,
});

function Clientes() {
  return (
    <DashboardLayout breadcrumb="Administrador/CRM/Clientes">
      <Toolbar title="Clientes" action="Nuevo cliente" />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Clientes activos" value="1.284" />
        <StatCard label="Nuevos este mes" value="34" />
        <StatCard label="Cartera vencida" value="$5.420.000" />
      </div>
      <Panel>
        <DataTable
          columns={["Documento", "Cliente", "Ciudad", "Compras", "Saldo", "Estado"]}
          rows={[
            ["1.020.334", "Andrea Ruiz", "Bogotá", "18", "$0", <Pill tone="success">Al día</Pill>],
            ["900.771-2", "Comercial JR", "Medellín", "64", "$1.150.000", <Pill tone="warning">Pendiente</Pill>],
            ["79.554.221", "Luis Ortega", "Cali", "7", "$0", <Pill tone="success">Al día</Pill>],
            ["901.004-8", "Distribuciones M", "Barranquilla", "132", "$4.270.000", <Pill tone="danger">Vencida</Pill>],
          ]}
        />
      </Panel>
    </DashboardLayout>
  );
}
