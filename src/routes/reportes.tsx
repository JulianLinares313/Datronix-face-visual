import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Toolbar, Panel, DataTable, BarChart, StatCard } from "@/components/module-ui";

export const Route = createFileRoute("/reportes")({
  head: () => ({
    meta: [
      { title: "Reportes — Datronix" },
      { name: "description", content: "Reportes de ventas, márgenes y desempeño por categoría y vendedor." },
      { property: "og:title", content: "Reportes — Datronix" },
      { property: "og:description", content: "Indicadores, tendencias y comparativos del negocio." },
    ],
  }),
  component: Reportes,
});

function Reportes() {
  return (
    <DashboardLayout breadcrumb="Administrador/Control/Reportes de ventas">
      <Toolbar title="Reportes" action="Generar reporte" />
      <div className="mb-4 grid gap-4 sm:grid-cols-4">
        <StatCard label="Ingresos" value="$48.3M" hint="Mes actual" />
        <StatCard label="Costos" value="$29.1M" />
        <StatCard label="Margen" value="39.7%" />
        <StatCard label="Devoluciones" value="1.8%" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Ventas por categoría">
          <BarChart
            data={[
              { label: "Periféricos", value: 62 },
              { label: "Computo", value: 91 },
              { label: "Pantallas", value: 47 },
              { label: "Redes", value: 33 },
              { label: "Otros", value: 21 },
            ]}
          />
        </Panel>
        <Panel title="Desempeño por vendedor">
          <DataTable
            columns={["Vendedor", "Ventas", "Meta", "Cumplimiento"]}
            rows={[
              ["C. Gómez", "$18.400.000", "$16.000.000", "115%"],
              ["M. López", "$14.100.000", "$16.000.000", "88%"],
              ["J. Silva", "$15.800.000", "$16.000.000", "99%"],
            ]}
          />
        </Panel>
      </div>
    </DashboardLayout>
  );
}
