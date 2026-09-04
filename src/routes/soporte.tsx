import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Panel, DataTable, Pill } from "@/components/module-ui";

export const Route = createFileRoute("/soporte")({
  head: () => ({
    meta: [
      { title: "Soporte y tickets — Datronix" },
      {
        name: "description",
        content:
          "Envía tickets de soporte técnico Datronix y consulta el estado de las solicitudes enviadas.",
      },
      { property: "og:title", content: "Soporte y tickets — Datronix" },
      {
        property: "og:description",
        content: "Solicitudes de soporte técnico del back-office Datronix.",
      },
    ],
  }),
  component: Soporte,
});

const input =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

function Soporte() {
  return (
    <DashboardLayout breadcrumb="Administrador/Ayuda/Soporte">
      <h1 className="mb-4 text-xl font-semibold">Soporte</h1>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Nuevo ticket">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block space-y-1.5 sm:col-span-2">
              <span className="text-xs font-medium text-muted-foreground">Empresa</span>
              <input className={input} placeholder="Comercial JR" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                ID remitente (Cédula)
              </span>
              <input className={input} placeholder="1020334" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Nombre del remitente
              </span>
              <input className={input} placeholder="Andrea Ruiz" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Teléfono</span>
              <input className={input} placeholder="300 000 0000" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Asunto</span>
              <input className={input} placeholder="Error al generar remisión" />
            </label>
            <label className="block space-y-1.5 sm:col-span-2">
              <span className="text-xs font-medium text-muted-foreground">Descripción</span>
              <textarea rows={5} className={input} placeholder="Describe el inconveniente..." />
            </label>
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Send className="size-4" /> Enviar ticket
          </button>
        </Panel>

        <Panel title="Tickets enviados">
          <DataTable
            columns={["ID", "Empresa", "Remitente", "Asunto", "Fecha", "Estado"]}
            rows={[
              ["112", "Comercial JR", "Andrea Ruiz", "Error al generar remisión", "30/08/2026", <Pill tone="warning">Abierto</Pill>],
              ["111", "Distribuciones M", "Sara Muñoz", "Actualizar precios masivo", "28/08/2026", <Pill tone="success">Resuelto</Pill>],
              ["110", "Tecno Sur", "Camilo Vega", "No carga el inventario", "26/08/2026", <Pill tone="success">Resuelto</Pill>],
              ["109", "Comercial JR", "Jorge Peña", "Solicitud de usuario nuevo", "24/08/2026", <Pill>En proceso</Pill>],
            ]}
          />
        </Panel>
      </div>
    </DashboardLayout>
  );
}
