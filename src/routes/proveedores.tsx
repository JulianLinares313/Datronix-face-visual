import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Panel, DataTable, StatCard } from "@/components/module-ui";
import { CrudHeader, RowActions, type FieldDef } from "@/components/form-ui";

export const Route = createFileRoute("/proveedores")({
  head: () => ({
    meta: [
      { title: "Proveedores — Datronix" },
      {
        name: "description",
        content:
          "Directorio de proveedores Datronix: empresa, contacto, teléfono, correo y dirección.",
      },
      { property: "og:title", content: "Proveedores — Datronix" },
      {
        property: "og:description",
        content: "Empresas proveedoras y sus contactos comerciales.",
      },
    ],
  }),
  component: Proveedores,
});

const campos: FieldDef[] = [
  { name: "nombre_empresa", label: "Empresa" },
  { name: "nombre_proveedor", label: "Nombre del contacto" },
  { name: "telefono_proveedor", label: "Teléfono" },
  { name: "email_proveedor", label: "Correo", type: "email" },
  { name: "direccion_proveedor", label: "Dirección" },
];

function Proveedores() {
  return (
    <DashboardLayout breadcrumb="Administrador/Compras/Proveedores">
      <CrudHeader
        title="Proveedores"
        searchPlaceholder="Buscar por empresa o contacto..."
        addLabel="Agregar proveedor"
        fields={campos}
      />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Proveedores activos" value="24" />
        <StatCard label="Productos abastecidos" value="562" />
        <StatCard label="Ciudades" value="7" />
      </div>
      <Panel>
        <DataTable
          columns={["ID", "Empresa", "Contacto", "Teléfono", "Correo", "Dirección", "Acciones"]}
          rows={[
            ["1", "Tecno Import SAS", "Jorge Peña", "601 220 1188", "jpena@tecnoimport.com", "Cl 100 #15-20, Bogotá", <RowActions />],
            ["2", "Delta Distribuciones", "Marcela Ríos", "604 330 7712", "mrios@delta.com", "Cra 43 #10-05, Medellín", <RowActions />],
            ["3", "Andina Hardware", "Camilo Vega", "602 118 9032", "cvega@andina.com", "Av 3N #22-14, Cali", <RowActions />],
            ["4", "Global Redes", "Sara Muñoz", "605 442 1130", "smunoz@globalredes.com", "Cl 84 #50-12, Barranquilla", <RowActions />],
          ]}
        />
      </Panel>
    </DashboardLayout>
  );
}
