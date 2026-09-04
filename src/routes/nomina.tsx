import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Panel, DataTable, StatCard, Pill } from "@/components/module-ui";
import { FormDialog, AddButton, RowActions, type FieldDef } from "@/components/form-ui";

export const Route = createFileRoute("/nomina")({
  head: () => ({
    meta: [
      { title: "Nómina y empleados — Datronix" },
      {
        name: "description",
        content:
          "Gestión de empleados y registro de pagos de nómina por período en el back-office Datronix.",
      },
      { property: "og:title", content: "Nómina y empleados — Datronix" },
      {
        property: "og:description",
        content: "Empleados, salarios base y pagos de nómina por período.",
      },
    ],
  }),
  component: Nomina,
});

const camposEmpleado: FieldDef[] = [
  { name: "id_empleado", label: "ID (Cédula)" },
  { name: "nombre_empleado", label: "Nombre" },
  { name: "cargo", label: "Cargo" },
  { name: "correo_empleado", label: "Correo", type: "email" },
  { name: "telefono_empleado", label: "Teléfono" },
  { name: "fecha_ingreso", label: "Fecha de ingreso", type: "date" },
  { name: "salario_base", label: "Salario base", type: "number" },
];

const camposPago: FieldDef[] = [
  {
    name: "id_empleado",
    label: "Empleado",
    type: "select",
    options: ["Carolina Gómez", "Mauricio López", "Paula Díaz", "Julián Silva"],
  },
  { name: "fecha_pago", label: "Fecha de pago", type: "date" },
  { name: "salario_pagado", label: "Salario pagado", type: "number" },
  { name: "periodo", label: "Período", placeholder: "2026-08" },
];

function Nomina() {
  return (
    <DashboardLayout breadcrumb="Administrador/Talento humano/Nómina">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Nómina y empleados</h1>
        <div className="flex flex-wrap gap-2">
          <FormDialog
            title="Agregar empleado"
            fields={camposEmpleado}
            trigger={<AddButton label="Agregar empleado" />}
          />
          <FormDialog
            title="Registrar pago de nómina"
            fields={camposPago}
            trigger={<AddButton label="Registrar pago" />}
            submitLabel="Registrar pago"
          />
        </div>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-4">
        <StatCard label="Empleados" value="36" />
        <StatCard label="Período" value="2026-08" />
        <StatCard label="Total pagado" value="$92.400.000" />
        <StatCard label="Pagos pendientes" value="4" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Empleados">
          <DataTable
            columns={["ID", "Nombre", "Cargo", "Ingreso", "Salario base", "Acciones"]}
            rows={[
              ["1.020.334", "Carolina Gómez", "Ventas", "12/02/2023", "$3.200.000", <RowActions />],
              ["79.221.884", "Mauricio López", "Ventas", "05/07/2022", "$3.200.000", <RowActions />],
              ["52.998.010", "Paula Díaz", "Contabilidad", "18/01/2021", "$4.100.000", <RowActions />],
              ["1.144.220", "Julián Silva", "Logística", "03/09/2024", "$2.700.000", <RowActions />],
            ]}
          />
        </Panel>

        <Panel title="Pagos registrados">
          <DataTable
            columns={["ID", "Empleado", "Período", "Fecha de pago", "Salario pagado", "Estado"]}
            rows={[
              ["881", "Carolina Gómez", "2026-08", "30/08/2026", "$2.860.000", <Pill tone="success">Pagado</Pill>],
              ["880", "Mauricio López", "2026-08", "30/08/2026", "$2.860.000", <Pill tone="success">Pagado</Pill>],
              ["879", "Paula Díaz", "2026-08", "—", "$3.640.000", <Pill tone="warning">En revisión</Pill>],
              ["878", "Julián Silva", "2026-08", "—", "$2.415.000", <Pill>Pendiente</Pill>],
            ]}
          />
        </Panel>
      </div>
    </DashboardLayout>
  );
}
