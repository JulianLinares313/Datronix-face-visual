import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Toolbar, Panel, DataTable, Pill, StatCard } from "@/components/module-ui";

export const Route = createFileRoute("/nomina")({
  head: () => ({
    meta: [
      { title: "Nómina — Datronix" },
      { name: "description", content: "Liquidación de nómina, empleados, novedades y pagos del período." },
      { property: "og:title", content: "Nómina — Datronix" },
      { property: "og:description", content: "Empleados, novedades y liquidación del período." },
    ],
  }),
  component: Nomina,
});

function Nomina() {
  return (
    <DashboardLayout breadcrumb="Administrador/Talento humano/Nómina">
      <Toolbar title="Nómina" action="Liquidar período" />
      <div className="mb-4 grid gap-4 sm:grid-cols-4">
        <StatCard label="Empleados" value="36" />
        <StatCard label="Período" value="Agosto 2026" />
        <StatCard label="Devengado" value="$92.400.000" />
        <StatCard label="Deducciones" value="$11.800.000" />
      </div>
      <Panel>
        <DataTable
          columns={["Documento", "Empleado", "Cargo", "Salario", "Neto", "Estado"]}
          rows={[
            ["1.020.334", "Carolina Gómez", "Ventas", "$3.200.000", "$2.860.000", <Pill tone="success">Pagado</Pill>],
            ["79.221.884", "Mauricio López", "Ventas", "$3.200.000", "$2.860.000", <Pill tone="success">Pagado</Pill>],
            ["52.998.010", "Paula Díaz", "Contabilidad", "$4.100.000", "$3.640.000", <Pill tone="warning">En revisión</Pill>],
            ["1.144.220", "Julián Silva", "Logística", "$2.700.000", "$2.415.000", <Pill>Pendiente</Pill>],
          ]}
        />
      </Panel>
    </DashboardLayout>
  );
}
