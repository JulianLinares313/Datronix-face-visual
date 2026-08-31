import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Panel, DataTable, StatCard } from "@/components/module-ui";
import { CrudHeader, RowActions, type FieldDef } from "@/components/form-ui";

export const Route = createFileRoute("/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes — Datronix" },
      {
        name: "description",
        content:
          "Gestión de clientes Datronix: cédula o RUC, contacto, dirección y tipo de cliente.",
      },
      { property: "og:title", content: "Clientes — Datronix" },
      {
        property: "og:description",
        content: "Alta, edición y búsqueda de clientes del back-office.",
      },
    ],
  }),
  component: Clientes,
});

const campos: FieldDef[] = [
  { name: "id_cliente", label: "ID (Cédula / RUC)", placeholder: "1020334" },
  { name: "nombre_cliente", label: "Nombre", placeholder: "Andrea Ruiz" },
  { name: "telefono_cliente", label: "Teléfono", placeholder: "300 000 0000" },
  { name: "email_cliente", label: "Correo", type: "email" },
  { name: "direccion_cliente", label: "Dirección", placeholder: "Cra 10 #20-30" },
  {
    name: "tipo_cliente",
    label: "Tipo de cliente",
    type: "select",
    options: ["NATURAL", "JURIDICO", "MAYORISTA"],
  },
];

function Clientes() {
  return (
    <DashboardLayout breadcrumb="Administrador/CRM/Clientes">
      <CrudHeader
        title="Clientes"
        searchPlaceholder="Buscar por ID o nombre..."
        addLabel="Agregar cliente"
        fields={campos}
      />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Clientes registrados" value="1.284" />
        <StatCard label="Nuevos este mes" value="34" />
        <StatCard label="Con crédito pendiente" value="12" />
      </div>
      <Panel>
        <DataTable
          columns={["ID", "Nombre", "Teléfono", "Correo", "Dirección", "Tipo", "Acciones"]}
          rows={[
            ["1.020.334", "Andrea Ruiz", "300 445 1120", "andrea@mail.com", "Cra 10 #20-30, Bogotá", "NATURAL", <RowActions />],
            ["900.771-2", "Comercial JR", "601 344 8890", "ventas@jr.com", "Cl 45 #12-08, Medellín", "JURIDICO", <RowActions />],
            ["79.554.221", "Luis Ortega", "310 887 2211", "lortega@mail.com", "Av 6 #14-22, Cali", "NATURAL", <RowActions />],
            ["901.004-8", "Distribuciones M", "605 221 3344", "compras@dism.com", "Cl 72 #40-11, Barranquilla", "MAYORISTA", <RowActions />],
          ]}
        />
      </Panel>
    </DashboardLayout>
  );
}
