import { createFileRoute, Link } from "@tanstack/react-router";
import { DollarSign, AlertTriangle, CreditCard, Package } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard, Panel, DataTable, Pill, BarChart } from "@/components/module-ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Datronix — Panel principal del back-office" },
      {
        name: "description",
        content:
          "Panel principal Datronix: ventas del día, stock crítico, créditos pendientes e inventario total.",
      },
      { property: "og:title", content: "Datronix — Panel principal" },
      {
        property: "og:description",
        content: "Ventas del día, stock crítico y cartera en tiempo real.",
      },
    ],
  }),
  component: Principal,
});

function Principal() {
  return (
    <DashboardLayout breadcrumb="Administrador/Control/Panel principal">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Ventas de hoy"
          value="$4.820.000"
          hint="14 ventas registradas"
          icon={<DollarSign className="size-4" />}
        />
        <StatCard
          label="Productos con stock bajo"
          value="9"
          hint="Por debajo del mínimo"
          icon={<AlertTriangle className="size-4" />}
        />
        <StatCard
          label="Clientes con crédito pendiente"
          value="12"
          hint="$5.420.000 en cartera"
          icon={<CreditCard className="size-4" />}
        />
        <StatCard
          label="Productos en inventario"
          value="562"
          hint="Valor $210.450.000"
          icon={<Package className="size-4" />}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Ventas de los últimos 7 días" className="lg:col-span-2">
          <BarChart
            data={[
              { label: "Lun", value: 42 },
              { label: "Mar", value: 55 },
              { label: "Mié", value: 38 },
              { label: "Jue", value: 71 },
              { label: "Vie", value: 64 },
              { label: "Sáb", value: 88 },
              { label: "Dom", value: 26 },
            ]}
          />
        </Panel>
        <Panel title="Accesos rápidos">
          <div className="grid gap-2 text-sm">
            {[
              { to: "/ventas", label: "Registrar nueva venta" } as const,
              { to: "/clientes", label: "Agregar cliente" } as const,
              { to: "/productos", label: "Actualizar inventario" } as const,
              { to: "/devoluciones", label: "Registrar devolución" } as const,
              { to: "/reportes", label: "Ver reportes" } as const,
            ].map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="rounded-md border border-border px-3 py-2 hover:bg-muted"
              >
                {a.label}
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Últimas ventas registradas" className="mt-4">
        <DataTable
          columns={["ID Venta", "Cliente", "Fecha", "Total", "Estado de pago"]}
          rows={[
            ["10245", "Andrea Ruiz", "31/08/2026", "$320.000", <Pill tone="success">CONTADO</Pill>],
            ["10244", "Comercial JR", "31/08/2026", "$1.150.000", <Pill tone="warning">CREDITO</Pill>],
            ["10243", "Luis Ortega", "30/08/2026", "$85.000", <Pill tone="success">CONTADO</Pill>],
            ["10242", "Distribuciones M", "30/08/2026", "$2.430.000", <Pill tone="warning">CREDITO</Pill>],
            ["10241", "Marta Peña", "29/08/2026", "$64.500", <Pill tone="success">CONTADO</Pill>],
          ]}
        />
      </Panel>
    </DashboardLayout>
  );
}
