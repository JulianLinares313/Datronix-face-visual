// ============================================================================
// productos.tsx — CRUD visual de Productos e inventario
// Muestra KPIs, tabla de productos y resalta en ROJO el stock que está
// por debajo del stock mínimo (regla visual del brief).
// ============================================================================

import { createFileRoute } from "@tanstack/react-router";
import { LayoutPanel } from "@/components/DashboardLayout";
import { Panel, TablaDatos, TarjetaEstadistica, Etiqueta } from "@/components/module-ui";
import { EncabezadoCrud, AccionesFila, type DefinicionCampo } from "@/components/form-ui";

// Ruta "/productos" con metadatos SEO
export const Route = createFileRoute("/productos")({
  head: () => ({
    meta: [
      { title: "Productos e inventario — Datronix" },
      {
        name: "description",
        content:
          "Catálogo de productos Datronix: precios de costo y venta, stock, stock mínimo y proveedor asociado.",
      },
      { property: "og:title", content: "Productos e inventario — Datronix" },
      {
        property: "og:description",
        content: "Inventario, precios y alertas de stock por debajo del mínimo.",
      },
    ],
  }),
  component: Productos,
});

// ----------------------------------------------------------------------------
// camposProducto: campos del formulario "Agregar producto"
// Coinciden con la tabla Producto del backend (id_proveedor es la relación)
// ----------------------------------------------------------------------------
const camposProducto: DefinicionCampo[] = [
  { nombre: "nombre_producto", etiqueta: "Nombre del producto" },
  { nombre: "categoria_producto", etiqueta: "Categoría" },
  { nombre: "marca_producto", etiqueta: "Marca" },
  { nombre: "modelo_producto", etiqueta: "Modelo" },
  { nombre: "precio_costo_producto", etiqueta: "Precio costo", tipo: "number" },
  { nombre: "precio_venta_producto", etiqueta: "Precio venta", tipo: "number" },
  { nombre: "stock_producto", etiqueta: "Stock", tipo: "number" },
  { nombre: "stock_minimo_producto", etiqueta: "Stock mínimo", tipo: "number" },
  {
    nombre: "id_proveedor",
    etiqueta: "Proveedor",
    tipo: "select",
    opciones: ["Tecno Import SAS", "Delta Distribuciones", "Andina Hardware"],
  },
  { nombre: "descripcion_producto", etiqueta: "Descripción", tipo: "textarea" },
  { nombre: "especificaciones_producto", etiqueta: "Especificaciones", tipo: "textarea" },
];

// Clase reutilizable para pintar en rojo las celdas de stock bajo
const estiloStockBajo = "bg-destructive/10 text-destructive font-medium";

// ----------------------------------------------------------------------------
// Productos: pantalla del módulo
// ----------------------------------------------------------------------------
function Productos() {
  return (
    <LayoutPanel rutaMiga="Administrador/Inventario/Productos">
      {/* Encabezado CRUD: buscador + modal de agregar producto */}
      <EncabezadoCrud
        titulo="Productos"
        placeholderBusqueda="Buscar por ID o nombre..."
        etiquetaAgregar="Agregar producto"
        campos={camposProducto}
      />
      {/* KPIs del inventario */}
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <TarjetaEstadistica etiqueta="Referencias" valor="562" />
        <TarjetaEstadistica etiqueta="Stock bajo" valor="9" pista="Requiere reposición" />
        <TarjetaEstadistica etiqueta="Valor inventario" valor="$210.450.000" />
      </div>
      {/* Tabla de productos; el stock bajo va envuelto en un span rojo */}
      <Panel>
        <TablaDatos
          columnas={["ID", "Nombre", "Categoría", "Marca", "Precio venta", "Stock", "Stock mín.", "Proveedor", "Acciones"]}
          filas={[
            ["1", "Teclado mecánico K80", "Periféricos", "Logi", "$189.000", "42", "10", "Tecno Import SAS", <AccionesFila />],
            // 8 < 12 → stock bajo: celda en rojo
            ["2", "Monitor 27\" QHD", "Pantallas", "Viewx", "$1.290.000", <span className={estiloStockBajo}>8</span>, "12", "Delta Distribuciones", <AccionesFila />],
            ["3", "Mouse inalámbrico M2", "Periféricos", "Logi", "$79.900", "120", "20", "Tecno Import SAS", <AccionesFila />],
            // 0 < 15 → stock agotado: celda en rojo
            ["4", "SSD NVMe 1TB", "Almacenamiento", "Kingx", "$420.000", <span className={estiloStockBajo}>0</span>, "15", "Andina Hardware", <AccionesFila />],
            ["5", "Portátil Ryzen 7", "Computo", "Nexo", "$3.850.000", "15", "5", "Delta Distribuciones", <AccionesFila />],
          ]}
        />
        {/* Nota aclaratoria de la regla visual */}
        <p className="mt-3 text-xs text-muted-foreground">
          Los valores en rojo indican stock por debajo del stock mínimo.
        </p>
      </Panel>
      <div className="mt-4">
        <Etiqueta tono="danger">Stock crítico</Etiqueta>
      </div>
    </LayoutPanel>
  );
}
