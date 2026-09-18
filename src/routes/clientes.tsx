// ============================================================================
// clientes.tsx — CRUD visual de Clientes
// Encabezado con buscador + botón "Agregar cliente" (modal), 3 KPIs y tabla.
// Los nombres de los campos (nombre, etiqueta) coinciden con la tabla Cliente
// del backend: id_cliente, nombre_cliente, telefono_cliente, etc.
// ============================================================================

import { createFileRoute } from "@tanstack/react-router";
import { LayoutPanel } from "@/components/DashboardLayout";
import { Panel, TablaDatos, TarjetaEstadistica } from "@/components/module-ui";
import { EncabezadoCrud, AccionesFila, type DefinicionCampo } from "@/components/form-ui";

// Ruta "/clientes" con sus metadatos SEO
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

// ----------------------------------------------------------------------------
// camposCliente: definición de los campos del formulario "Agregar cliente"
// El tipo "select" dibuja una lista desplegable con las opciones dadas
// ----------------------------------------------------------------------------
const camposCliente: DefinicionCampo[] = [
  { nombre: "id_cliente", etiqueta: "ID (Cédula / RUC)", placeholder: "1020334" },
  { nombre: "nombre_cliente", etiqueta: "Nombre", placeholder: "Andrea Ruiz" },
  { nombre: "telefono_cliente", etiqueta: "Teléfono", placeholder: "300 000 0000" },
  { nombre: "email_cliente", etiqueta: "Correo", tipo: "email" },
  { nombre: "direccion_cliente", etiqueta: "Dirección", placeholder: "Cra 10 #20-30" },
  {
    nombre: "tipo_cliente",
    etiqueta: "Tipo de cliente",
    tipo: "select",
    opciones: ["NATURAL", "JURIDICO", "MAYORISTA"],
  },
];

// ----------------------------------------------------------------------------
// Clientes: pantalla del módulo
// ----------------------------------------------------------------------------
function Clientes() {
  return (
    <LayoutPanel rutaMiga="Administrador/CRM/Clientes">
      {/* Encabezado: título + buscador + botón que abre el modal de registro */}
      <EncabezadoCrud
        titulo="Clientes"
        placeholderBusqueda="Buscar por ID o nombre..."
        etiquetaAgregar="Agregar cliente"
        campos={camposCliente}
      />
      {/* Tarjetas KPI del módulo */}
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <TarjetaEstadistica etiqueta="Clientes registrados" valor="1.284" />
        <TarjetaEstadistica etiqueta="Nuevos este mes" valor="34" />
        <TarjetaEstadistica etiqueta="Con crédito pendiente" valor="12" />
      </div>
      {/* Tabla de clientes (datos de ejemplo) */}
      <Panel>
        <TablaDatos
          columnas={["ID", "Nombre", "Teléfono", "Correo", "Dirección", "Tipo", "Acciones"]}
          filas={[
            ["1.020.334", "Andrea Ruiz", "300 445 1120", "andrea@mail.com", "Cra 10 #20-30, Bogotá", "NATURAL", <AccionesFila />],
            ["900.771-2", "Comercial JR", "601 344 8890", "ventas@jr.com", "Cl 45 #12-08, Medellín", "JURIDICO", <AccionesFila />],
            ["79.554.221", "Luis Ortega", "310 887 2211", "lortega@mail.com", "Av 6 #14-22, Cali", "NATURAL", <AccionesFila />],
            ["901.004-8", "Distribuciones M", "605 221 3344", "compras@dism.com", "Cl 72 #40-11, Barranquilla", "MAYORISTA", <AccionesFila />],
          ]}
        />
      </Panel>
    </LayoutPanel>
  );
}
