import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Toolbar, Panel, DataTable, Pill, StatCard } from "@/components/module-ui";

export const Route = createFileRoute("/productos")({
  head: () => ({
    meta: [
      { title: "Productos — Datronix" },
      { name: "description", content: "Catálogo de productos, precios, categorías y control de inventario." },
      { property: "og:title", content: "Productos — Datronix" },
      { property: "og:description", content: "Inventario, precios y alertas de stock bajo." },
    ],
  }),
  component: Productos,
});

function Productos() {
  return (
    <DashboardLayout breadcrumb="Administrador/Inventario/Productos">
      <Toolbar title="Productos" action="Nuevo producto" />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Referencias" value="562" />
        <StatCard label="Stock bajo" value="9" hint="Requiere reposición" />
        <StatCard label="Valor inventario" value="$210.450.000" />
      </div>
      <Panel>
        <DataTable
          columns={["Código", "Producto", "Categoría", "Precio", "Stock", "Estado"]}
          rows={[
            ["P-001", "Teclado mecánico K80", "Periféricos", "$189.000", "42", <Pill tone="success">Disponible</Pill>],
            ["P-002", "Monitor 27\" QHD", "Pantallas", "$1.290.000", "8", <Pill tone="warning">Stock bajo</Pill>],
            ["P-003", "Mouse inalámbrico M2", "Periféricos", "$79.900", "120", <Pill tone="success">Disponible</Pill>],
            ["P-004", "SSD NVMe 1TB", "Almacenamiento", "$420.000", "0", <Pill tone="danger">Agotado</Pill>],
            ["P-005", "Portátil Ryzen 7", "Computo", "$3.850.000", "15", <Pill tone="success">Disponible</Pill>],
          ]}
        />
      </Panel>
    </DashboardLayout>
  );
}
