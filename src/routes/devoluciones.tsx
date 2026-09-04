import { createFileRoute } from "@tanstack/react-router";
import { Search, Undo2 } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Panel, DataTable, StatCard } from "@/components/module-ui";

export const Route = createFileRoute("/devoluciones")({
  head: () => ({
    meta: [
      { title: "Devoluciones — Datronix" },
      {
        name: "description",
        content:
          "Registro de devoluciones Datronix: producto, cliente, cantidad y motivo, con reingreso de stock.",
      },
      { property: "og:title", content: "Devoluciones — Datronix" },
      {
        property: "og:description",
        content: "Devoluciones de producto y reingreso automático al inventario.",
      },
    ],
  }),
  component: Devoluciones,
});

const input =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

function Devoluciones() {
  return (
    <DashboardLayout breadcrumb="Administrador/Inventario/Devoluciones">
      <h1 className="mb-4 text-xl font-semibold">Devoluciones</h1>

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Devoluciones del mes" value="18" />
        <StatCard label="Unidades reingresadas" value="41" />
        <StatCard label="Tasa de devolución" value="1.8%" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Registrar devolución">
          <div className="space-y-3">
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Producto
              </span>
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Search className="size-4 text-muted-foreground" />
                <input
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Buscar por ID o nombre..."
                />
              </div>
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Nombre del cliente
              </span>
              <input className={input} placeholder="Andrea Ruiz" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Cantidad
              </span>
              <input type="number" min={1} defaultValue={1} className={input} />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Motivo
              </span>
              <textarea rows={3} className={input} placeholder="Producto defectuoso..." />
            </label>
            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              <Undo2 className="size-4" /> Registrar devolución
            </button>
            <p className="text-center text-xs text-muted-foreground">
              La cantidad devuelta se suma al stock del producto.
            </p>
          </div>
        </Panel>

        <Panel title="Devoluciones recientes" className="lg:col-span-2">
          <DataTable
            columns={["ID", "Producto", "Cliente", "Cantidad", "Motivo", "Fecha"]}
            rows={[
              ["41", "Monitor 27\" QHD", "Comercial JR", "1", "Pantalla con píxeles muertos", "30/08/2026"],
              ["40", "Mouse inalámbrico M2", "Andrea Ruiz", "2", "Producto equivocado", "29/08/2026"],
              ["39", "SSD NVMe 1TB", "Distribuciones M", "3", "Empaque abierto", "28/08/2026"],
              ["38", "Teclado mecánico K80", "Luis Ortega", "1", "No enciende", "27/08/2026"],
            ]}
          />
        </Panel>
      </div>
    </DashboardLayout>
  );
}
