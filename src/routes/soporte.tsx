import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Toolbar, Panel, DataTable, Pill, StatCard } from "@/components/module-ui";

export const Route = createFileRoute("/soporte")({
  head: () => ({
    meta: [
      { title: "Soporte — Datronix" },
      { name: "description", content: "Mesa de ayuda: tickets de soporte, prioridades y tiempos de respuesta." },
      { property: "og:title", content: "Soporte — Datronix" },
      { property: "og:description", content: "Tickets, prioridades y tiempos de atención." },
    ],
  }),
  component: Soporte,
});

function Soporte() {
  return (
    <DashboardLayout breadcrumb="Administrador/Servicio/Soporte técnico">
      <Toolbar title="Soporte" action="Nuevo ticket" />
      <div className="mb-4 grid gap-4 sm:grid-cols-4">
        <StatCard label="Tickets abiertos" value="14" />
        <StatCard label="En proceso" value="6" />
        <StatCard label="Resueltos hoy" value="9" />
        <StatCard label="Tiempo promedio" value="3h 20m" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <DataTable
            columns={["Ticket", "Asunto", "Cliente", "Prioridad", "Estado"]}
            rows={[
              ["T-2210", "Error al imprimir factura", "Comercial JR", <Pill tone="danger">Alta</Pill>, <Pill>Abierto</Pill>],
              ["T-2209", "Solicitud de usuario nuevo", "Distribuciones M", <Pill>Media</Pill>, <Pill tone="warning">En proceso</Pill>],
              ["T-2208", "Inventario desactualizado", "Tecno Sur", <Pill tone="danger">Alta</Pill>, <Pill tone="warning">En proceso</Pill>],
              ["T-2207", "Cambio de correo", "Andrea Ruiz", <Pill tone="success">Baja</Pill>, <Pill tone="success">Resuelto</Pill>],
            ]}
          />
        </Panel>
        <Panel title="Canales de atención">
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>Línea directa: 601 555 1200</li>
            <li>WhatsApp: 310 000 4455</li>
            <li>Correo: soporte@datronix.com</li>
            <li>Horario: Lun a Vie, 8:00 a 18:00</li>
          </ul>
        </Panel>
      </div>
    </DashboardLayout>
  );
}
