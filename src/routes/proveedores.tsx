// ============================================================================
// proveedores.tsx — CRUD visual de Proveedores
// Directorio de empresas proveedoras: contacto, teléfono, correo y dirección.
// ============================================================================

import { createFileRoute } from "@tanstack/react-router";
import { LayoutPanel } from "@/components/DashboardLayout";
import { Panel, TablaDatos, TarjetaEstadistica } from "@/components/module-ui";
import { EncabezadoCrud, AccionesFila, type DefinicionCampo } from "@/components/form-ui";

// Ruta "/proveedores" con metadatos SEO
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

// ----------------------------------------------------------------------------
// camposProveedor: campos del formulario "Agregar proveedor"
// Coinciden con la tabla Proveedor del backend
// ----------------------------------------------------------------------------
const camposProveedor: DefinicionCampo[] = [
  { nombre: "nombre_empresa", etiqueta: "Empresa" },
  { nombre: "nombre_proveedor", etiqueta: "Nombre del contacto" },
  { nombre: "telefono_proveedor", etiqueta: "Teléfono" },
  { nombre: "email_proveedor", etiqueta: "Correo", tipo: "email" },
  { nombre: "direccion_proveedor", etiqueta: "Dirección" },
];

// ----------------------------------------------------------------------------
// Proveedores: pantalla del módulo
// ----------------------------------------------------------------------------
function Proveedores() {
  return (
    <LayoutPanel rutaMiga="Administrador/Compras/Proveedores">
      {/* Encabezado CRUD: buscador + modal de agregar proveedor */}
      <EncabezadoCrud
        titulo="Proveedores"
        placeholderBusqueda="Buscar por empresa o contacto..."
        etiquetaAgregar="Agregar proveedor"
        campos={camposProveedor}
      />
      {/* KPIs del módulo */}
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <TarjetaEstadistica etiqueta="Proveedores activos" valor="24" />
        <TarjetaEstadistica etiqueta="Productos abastecidos" valor="562" />
        <TarjetaEstadistica etiqueta="Ciudades" valor="7" />
      </div>
      {/* Tabla de proveedores con botones de editar/eliminar */}
      <Panel>
        <TablaDatos
          columnas={["ID", "Empresa", "Contacto", "Teléfono", "Correo", "Dirección", "Acciones"]}
          filas={[
            ["1", "Tecno Import SAS", "Jorge Peña", "601 220 1188", "jpena@tecnoimport.com", "Cl 100 #15-20, Bogotá", <AccionesFila />],
            ["2", "Delta Distribuciones", "Marcela Ríos", "604 330 7712", "mrios@delta.com", "Cra 43 #10-05, Medellín", <AccionesFila />],
            ["3", "Andina Hardware", "Camilo Vega", "602 118 9032", "cvega@andina.com", "Av 3N #22-14, Cali", <AccionesFila />],
            ["4", "Global Redes", "Sara Muñoz", "605 442 1130", "smunoz@globalredes.com", "Cl 84 #50-12, Barranquilla", <AccionesFila />],
          ]}
        />
      </Panel>
    </LayoutPanel>
  );
}
