import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Toolbar, Panel, DataTable, Pill, StatCard } from "@/components/module-ui";

export const Route = createFileRoute("/ventas")({
  head: () => ({
    meta: [
      { title: "Ventas — Datronix" },
      { name: "description", content: "Registro y seguimiento de ventas, facturas y estados de pago." },
      { property: "og:title", content: "Ventas — Datronix" },
      { property: "og:description", content: "Facturación, estados de pago y detalle de ventas." },
    ],
  }),
  component: Ventas,
});

function Ventas() {
  return (
    <DashboardLayout breadcrumb="Administrador/Ventas/Listado de ventas">
      <Toolbar title="Ventas" action="Nueva venta" />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total facturado" value="$48.320.000" hint="Mes actual" />
        <StatCard label="Facturas emitidas" value="384" hint="21 pendientes" />
        <StatCard label="Ticket promedio" value="$125.800" />
      </div>
      <Panel>
        <DataTable
          columns={["Factura", "Cliente", "Vendedor", "Fecha", "Total", "Estado"]}
          rows={[
            ["#10245", "Andrea Ruiz", "C. Gómez", "21/08/2026", "$320.000", <Pill tone="success">Pagada</Pill>],
            ["#10244", "Comercial JR", "M. Lopez", "21/08/2026", "$1.150.000", <Pill tone="warning">Pendiente</Pill>],
            ["#10243", "Luis Ortega", "C. Gómez", "20/08/2026", "$85.000", <Pill tone="success">Pagada</Pill>],
            ["#10242", "Distribuciones M", "J. Silva", "20/08/2026", "$2.430.000", <Pill>En proceso</Pill>],
            ["#10241", "Marta Peña", "M. Lopez", "19/08/2026", "$64.500", <Pill tone="danger">Anulada</Pill>],
            ["#10240", "Tecno Sur", "J. Silva", "19/08/2026", "$980.000", <Pill tone="success">Pagada</Pill>],
          ]}
        />
      </Panel>
    </DashboardLayout>
  );
}
