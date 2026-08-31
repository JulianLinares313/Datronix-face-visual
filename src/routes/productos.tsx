import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Panel, DataTable, StatCard, Pill } from "@/components/module-ui";
import { CrudHeader, RowActions, type FieldDef } from "@/components/form-ui";

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

const campos: FieldDef[] = [
  { name: "nombre_producto", label: "Nombre del producto" },
  { name: "categoria_producto", label: "Categoría" },
  { name: "marca_producto", label: "Marca" },
  { name: "modelo_producto", label: "Modelo" },
  { name: "precio_costo_producto", label: "Precio costo", type: "number" },
  { name: "precio_venta_producto", label: "Precio venta", type: "number" },
  { name: "stock_producto", label: "Stock", type: "number" },
  { name: "stock_minimo_producto", label: "Stock mínimo", type: "number" },
  {
    name: "id_proveedor",
    label: "Proveedor",
    type: "select",
    options: ["Tecno Import SAS", "Delta Distribuciones", "Andina Hardware"],
  },
  { name: "descripcion_producto", label: "Descripción", type: "textarea" },
  { name: "especificaciones_producto", label: "Especificaciones", type: "textarea" },
];

const bajo = "bg-destructive/10 text-destructive font-medium";

function Productos() {
  return (
    <DashboardLayout breadcrumb="Administrador/Inventario/Productos">
      <CrudHeader
        title="Productos"
        searchPlaceholder="Buscar por ID o nombre..."
        addLabel="Agregar producto"
        fields={campos}
      />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Referencias" value="562" />
        <StatCard label="Stock bajo" value="9" hint="Requiere reposición" />
        <StatCard label="Valor inventario" value="$210.450.000" />
      </div>
      <Panel>
        <DataTable
          columns={["ID", "Nombre", "Categoría", "Marca", "Precio venta", "Stock", "Stock mín.", "Proveedor", "Acciones"]}
          rows={[
            ["1", "Teclado mecánico K80", "Periféricos", "Logi", "$189.000", "42", "10", "Tecno Import SAS", <RowActions />],
            ["2", "Monitor 27\" QHD", "Pantallas", "Viewx", "$1.290.000", <span className={bajo}>8</span>, "12", "Delta Distribuciones", <RowActions />],
            ["3", "Mouse inalámbrico M2", "Periféricos", "Logi", "$79.900", "120", "20", "Tecno Import SAS", <RowActions />],
            ["4", "SSD NVMe 1TB", "Almacenamiento", "Kingx", "$420.000", <span className={bajo}>0</span>, "15", "Andina Hardware", <RowActions />],
            ["5", "Portátil Ryzen 7", "Computo", "Nexo", "$3.850.000", "15", "5", "Delta Distribuciones", <RowActions />],
          ]}
        />
        <p className="mt-3 text-xs text-muted-foreground">
          Los valores en rojo indican stock por debajo del stock mínimo.
        </p>
      </Panel>
      <div className="mt-4">
        <Pill tone="danger">Stock crítico</Pill>
      </div>
    </DashboardLayout>
  );
}
