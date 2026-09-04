import { createFileRoute } from "@tanstack/react-router";
import { Eye, Printer } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Panel, DataTable, Pill, StatCard } from "@/components/module-ui";
import { SearchBar } from "@/components/form-ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/historial")({
  head: () => ({
    meta: [
      { title: "Historial de ventas y remisiones — Datronix" },
      {
        name: "description",
        content:
          "Consulta el historial de ventas Datronix con su detalle de productos y la remisión generada por cada venta.",
      },
      {
        property: "og:title",
        content: "Historial de ventas y remisiones — Datronix",
      },
      {
        property: "og:description",
        content: "Ventas, detalle de productos y comprobantes de salida.",
      },
    ],
  }),
  component: Historial,
});

function DetalleVenta() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs hover:bg-muted">
          <Eye className="size-3.5" /> Ver detalle
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Venta #10244 — Comercial JR</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 rounded-md bg-muted/60 p-3 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">Fecha</p>
            <p className="font-medium">31/08/2026</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Estado de pago</p>
            <p className="font-medium">CREDITO</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Dirección de entrega</p>
            <p className="font-medium">Cl 45 #12-08, Medellín</p>
          </div>
        </div>

        <table className="mt-2 w-full text-sm">
          <thead>
            <tr className="bg-primary-soft text-left text-secondary-foreground">
              {["Producto", "Cant.", "Precio", "Desc.", "Subtotal"].map((c) => (
                <th key={c} className="px-3 py-2 font-semibold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Portátil Ryzen 7", "1", "$3.850.000", "$0", "$3.850.000"],
              ["Mouse inalámbrico M2", "2", "$79.900", "$0", "$159.800"],
            ].map((r) => (
              <tr key={r[0]} className="border-b border-border last:border-0">
                {r.map((c, i) => (
                  <td key={i} className="px-3 py-2">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="rounded-md border border-dashed border-border p-3 text-sm">
          <p className="font-semibold">Remisión #R-8841</p>
          <p className="text-muted-foreground">
            Emitida el 31/08/2026 · Total $4.009.800
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Observaciones: entregar en horario de la mañana.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          <Printer className="size-4" /> Imprimir remisión
        </button>
      </DialogContent>
    </Dialog>
  );
}

function Historial() {
  return (
    <DashboardLayout breadcrumb="Administrador/Ventas/Historial y remisiones">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Historial de ventas</h1>
        <SearchBar placeholder="Buscar por ID de venta o cliente..." />
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-4">
        <StatCard label="Ventas del mes" value="384" />
        <StatCard label="Total facturado" value="$48.320.000" />
        <StatCard label="Contado" value="72%" />
        <StatCard label="Crédito" value="28%" />
      </div>

      <Panel>
        <DataTable
          columns={["ID Venta", "Cliente", "Fecha", "Total", "Estado de pago", "Remisión", "Detalle"]}
          rows={[
            ["10245", "Andrea Ruiz", "31/08/2026", "$320.000", <Pill tone="success">CONTADO</Pill>, "R-8842", <DetalleVenta />],
            ["10244", "Comercial JR", "31/08/2026", "$1.150.000", <Pill tone="warning">CREDITO</Pill>, "R-8841", <DetalleVenta />],
            ["10243", "Luis Ortega", "30/08/2026", "$85.000", <Pill tone="success">CONTADO</Pill>, "R-8840", <DetalleVenta />],
            ["10242", "Distribuciones M", "30/08/2026", "$2.430.000", <Pill tone="warning">CREDITO</Pill>, "R-8839", <DetalleVenta />],
            ["10241", "Marta Peña", "29/08/2026", "$64.500", <Pill tone="success">CONTADO</Pill>, "R-8838", <DetalleVenta />],
          ]}
        />
      </Panel>
    </DashboardLayout>
  );
}
