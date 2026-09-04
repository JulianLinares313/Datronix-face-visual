import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Panel, DataTable, StatCard, BarChart, Pill } from "@/components/module-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/reportes")({
  head: () => ({
    meta: [
      { title: "Reportes — Datronix" },
      {
        name: "description",
        content:
          "Reportes Datronix en tiempo real: stock bajo, productos más vendidos, clientes frecuentes, ventas por mes y créditos pendientes.",
      },
      { property: "og:title", content: "Reportes — Datronix" },
      {
        property: "og:description",
        content: "Stock crítico, top productos, top clientes, ventas por mes y cartera.",
      },
    ],
  }),
  component: Reportes,
});

const rojo = "text-destructive font-medium";

function Reportes() {
  return (
    <DashboardLayout breadcrumb="Administrador/Control/Reportes">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Reportes</h1>
        <p className="text-xs text-muted-foreground">
          Los reportes se consultan en tiempo real, no se almacenan.
        </p>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-4">
        <StatCard label="Ingresos del mes" value="$48.3M" />
        <StatCard label="Ventas realizadas" value="384" />
        <StatCard label="Cartera en crédito" value="$5.42M" />
        <StatCard label="Stock crítico" value="9" />
      </div>

      <Tabs defaultValue="stock">
        <TabsList className="flex h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="stock">Stock bajo</TabsTrigger>
          <TabsTrigger value="productos">Top productos</TabsTrigger>
          <TabsTrigger value="clientes">Clientes frecuentes</TabsTrigger>
          <TabsTrigger value="meses">Ventas por mes</TabsTrigger>
          <TabsTrigger value="creditos">Créditos pendientes</TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="mt-4">
          <Panel title="Inventario crítico (stock actual < stock mínimo)">
            <DataTable
              columns={["ID Producto", "Nombre", "Stock actual", "Stock mínimo"]}
              rows={[
                ["4", <span className={rojo}>SSD NVMe 1TB</span>, <span className={rojo}>0</span>, "15"],
                ["2", <span className={rojo}>Monitor 27&quot; QHD</span>, <span className={rojo}>8</span>, "12"],
                ["9", <span className={rojo}>Switch 24 puertos</span>, <span className={rojo}>3</span>, "10"],
                ["14", <span className={rojo}>Cable HDMI 2m</span>, <span className={rojo}>11</span>, "40"],
              ]}
            />
          </Panel>
        </TabsContent>

        <TabsContent value="productos" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel title="Top 10 productos más vendidos">
              <DataTable
                columns={["Producto", "Total vendido", "Ingresos generados"]}
                rows={[
                  ["Portátil Ryzen 7", "142", "$546.700.000"],
                  ["Mouse inalámbrico M2", "820", "$65.518.000"],
                  ["Teclado mecánico K80", "410", "$77.490.000"],
                  ["Monitor 27\" QHD", "96", "$123.840.000"],
                  ["SSD NVMe 1TB", "230", "$96.600.000"],
                ]}
              />
            </Panel>
            <Panel title="Unidades vendidas">
              <BarChart
                data={[
                  { label: "Mouse", value: 820 },
                  { label: "Teclado", value: 410 },
                  { label: "SSD", value: 230 },
                  { label: "Portátil", value: 142 },
                  { label: "Monitor", value: 96 },
                ]}
              />
            </Panel>
          </div>
        </TabsContent>

        <TabsContent value="clientes" className="mt-4">
          <Panel title="Clientes frecuentes">
            <DataTable
              columns={["Cliente", "N° de compras", "Total invertido", "Promedio de compra", "Última compra"]}
              rows={[
                ["Distribuciones M", "132", "$182.400.000", "$1.381.818", "30/08/2026"],
                ["Comercial JR", "64", "$74.200.000", "$1.159.375", "31/08/2026"],
                ["Andrea Ruiz", "18", "$5.780.000", "$321.111", "31/08/2026"],
                ["Luis Ortega", "7", "$1.240.000", "$177.142", "30/08/2026"],
              ]}
            />
          </Panel>
        </TabsContent>

        <TabsContent value="meses" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel title="Ventas por mes">
              <DataTable
                columns={["Mes", "Año", "N° de ventas", "Total mes", "Promedio venta"]}
                rows={[
                  ["Agosto", "2026", "384", "$48.320.000", "$125.833"],
                  ["Julio", "2026", "351", "$44.180.000", "$125.868"],
                  ["Junio", "2026", "402", "$52.640.000", "$130.945"],
                  ["Mayo", "2026", "338", "$41.220.000", "$121.952"],
                ]}
              />
            </Panel>
            <Panel title="Tendencia mensual">
              <BarChart
                data={[
                  { label: "May", value: 41 },
                  { label: "Jun", value: 53 },
                  { label: "Jul", value: 44 },
                  { label: "Ago", value: 48 },
                ]}
              />
            </Panel>
          </div>
        </TabsContent>

        <TabsContent value="creditos" className="mt-4">
          <Panel title="Créditos pendientes (estado de pago = CREDITO)">
            <DataTable
              columns={["ID Venta", "Cliente", "Fecha", "Total", "Días transcurridos", "Estado"]}
              rows={[
                ["10244", "Comercial JR", "31/08/2026", "$1.150.000", "0", <Pill tone="success">Al día</Pill>],
                ["10242", "Distribuciones M", "30/08/2026", "$2.430.000", "1", <Pill tone="success">Al día</Pill>],
                ["10198", "Tecno Sur", "15/07/2026", "$980.000", "47", <Pill tone="warning">Por vencer</Pill>],
                ["10120", "Distribuciones M", "02/06/2026", "$860.000", "90", <Pill tone="danger">Vencido</Pill>],
              ]}
            />
          </Panel>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
