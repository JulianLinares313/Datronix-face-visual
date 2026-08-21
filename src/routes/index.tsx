import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard, Panel, DataTable, Pill, BarChart } from "@/components/module-ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Datronix — Panel principal de gestión" },
      {
        name: "description",
        content:
          "Panel principal Datronix: ventas, inventario, clientes y reportes en un solo lugar.",
      },
      { property: "og:title", content: "Datronix — Panel principal" },
      {
        property: "og:description",
        content: "Control de ventas, inventario y reportes en tiempo real.",
      },
    ],
  }),
  component: Principal,
});

function Principal() {
  return (
    <DashboardLayout breadcrumb="Administrador/Control/Reportes de ventas">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Ventas del día"
          value="$4.820.000"
          hint="+12% vs ayer"
          icon={<DollarSign className="size-4" />}
        />
        <StatCard
          label="Órdenes"
          value="132"
          hint="18 pendientes"
          icon={<ShoppingCart className="size-4" />}
        />
        <StatCard
          label="Clientes activos"
          value="1.284"
          hint="+34 este mes"
          icon={<Users className="size-4" />}
        />
        <StatCard
          label="Productos"
          value="562"
          hint="9 con stock bajo"
          icon={<Package className="size-4" />}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Ventas por mes" className="lg:col-span-2">
          <BarChart
            data={[
              { label: "Ene", value: 42 },
              { label: "Feb", value: 55 },
              { label: "Mar", value: 38 },
              { label: "Abr", value: 71 },
              { label: "May", value: 64 },
              { label: "Jun", value: 88 },
              { label: "Jul", value: 76 },
              { label: "Ago", value: 92 },
            ]}
          />
        </Panel>
        <Panel title="Actividad reciente">
          <ul className="space-y-3 text-sm">
            {[
              "Nueva venta #10245 registrada",
              "Producto 'Teclado K80' actualizado",
              "Cliente Andrea Ruiz creado",
              "Compra a Proveedor Delta aprobada",
              "Nómina de agosto en revisión",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Últimas ventas" className="mt-4">
        <DataTable
          columns={["Factura", "Cliente", "Fecha", "Total", "Estado"]}
          rows={[
            ["#10245", "Andrea Ruiz", "21/08/2026", "$320.000", <Pill tone="success">Pagada</Pill>],
            ["#10244", "Comercial JR", "21/08/2026", "$1.150.000", <Pill tone="warning">Pendiente</Pill>],
            ["#10243", "Luis Ortega", "20/08/2026", "$85.000", <Pill tone="success">Pagada</Pill>],
            ["#10242", "Distribuciones M", "20/08/2026", "$2.430.000", <Pill>En proceso</Pill>],
            ["#10241", "Marta Peña", "19/08/2026", "$64.500", <Pill tone="danger">Anulada</Pill>],
          ]}
        />
      </Panel>
    </DashboardLayout>
  );
}
