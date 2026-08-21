import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Toolbar, Panel, DataTable, Pill, StatCard } from "@/components/module-ui";

export const Route = createFileRoute("/compras")({
  head: () => ({
    meta: [
      { title: "Compras — Datronix" },
      { name: "description", content: "Órdenes de compra, recepciones de mercancía y control de costos." },
      { property: "og:title", content: "Compras — Datronix" },
      { property: "og:description", content: "Órdenes, recepciones y costos de abastecimiento." },
    ],
  }),
  component: Compras,
});

function Compras() {
  return (
    <DashboardLayout breadcrumb="Administrador/Compras/Órdenes de compra">
      <Toolbar title="Compras" action="Nueva orden" />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Órdenes del mes" value="57" />
        <StatCard label="Por recibir" value="12" />
        <StatCard label="Total comprado" value="$29.140.000" />
      </div>
      <Panel>
        <DataTable
          columns={["Orden", "Proveedor", "Fecha", "Ítems", "Total", "Estado"]}
          rows={[
            ["OC-0451", "Distribuciones Delta", "20/08/2026", "24", "$8.400.000", <Pill tone="success">Recibida</Pill>],
            ["OC-0450", "TecnoImport SAS", "19/08/2026", "10", "$3.120.000", <Pill tone="warning">En tránsito</Pill>],
            ["OC-0449", "Global Parts", "17/08/2026", "48", "$12.900.000", <Pill>Aprobada</Pill>],
            ["OC-0448", "Suministros Andinos", "15/08/2026", "6", "$740.000", <Pill tone="danger">Cancelada</Pill>],
          ]}
        />
      </Panel>
    </DashboardLayout>
  );
}
