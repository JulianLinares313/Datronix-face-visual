import { createFileRoute } from "@tanstack/react-router";
import { Search, Trash2, Plus, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Panel } from "@/components/module-ui";

export const Route = createFileRoute("/ventas")({
  head: () => ({
    meta: [
      { title: "Nueva venta — Datronix" },
      {
        name: "description",
        content:
          "Registro de ventas Datronix: cliente, carrito de productos, dirección de entrega y estado de pago contado o crédito.",
      },
      { property: "og:title", content: "Nueva venta — Datronix" },
      {
        property: "og:description",
        content: "Carrito de venta con generación automática de remisión.",
      },
    ],
  }),
  component: Ventas,
});

function Paso({
  n,
  titulo,
  children,
}: {
  n: number;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card shadow-card">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {n}
        </span>
        <h2 className="text-sm font-semibold">{titulo}</h2>
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

const input =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

function Ventas() {
  return (
    <DashboardLayout breadcrumb="Administrador/Ventas/Nueva venta">
      <h1 className="mb-4 text-xl font-semibold">Registrar venta</h1>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Paso n={1} titulo="Datos del cliente">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Search className="size-4 text-muted-foreground" />
                <input
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Buscar cliente por cédula o RUC..."
                />
              </div>
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                Buscar
              </button>
            </div>
            <div className="mt-3 grid gap-3 rounded-md bg-muted/60 p-3 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs text-muted-foreground">Nombre</p>
                <p className="font-medium">Andrea Ruiz</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Teléfono</p>
                <p className="font-medium">300 445 1120</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Dirección</p>
                <p className="font-medium">Cra 10 #20-30, Bogotá</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              ¿El cliente no existe?{" "}
              <span className="cursor-pointer font-medium text-primary">
                Agregar cliente
              </span>
            </p>
          </Paso>

          <Paso n={2} titulo="Agregar productos al carrito">
            <div className="grid gap-3 sm:grid-cols-[1fr_7rem_auto]">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Search className="size-4 text-muted-foreground" />
                <input
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Buscar producto por ID o nombre..."
                />
              </div>
              <input
                type="number"
                min={1}
                defaultValue={1}
                className={input}
                aria-label="Cantidad"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                <Plus className="size-4" /> Añadir
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="bg-primary-soft text-left text-secondary-foreground">
                    {["Producto", "Cantidad", "Precio unitario", "Subtotal", ""].map(
                      (c) => (
                        <th key={c} className="px-3 py-2 font-semibold">
                          {c}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Teclado mecánico K80", "2", "$189.000", "$378.000"],
                    ["Mouse inalámbrico M2", "3", "$79.900", "$239.700"],
                    ['Monitor 27" QHD', "1", "$1.290.000", "$1.290.000"],
                  ].map((r) => (
                    <tr key={r[0]} className="border-b border-border last:border-0">
                      {r.map((c, i) => (
                        <td key={i} className="px-3 py-2">
                          {c}
                        </td>
                      ))}
                      <td className="px-3 py-2">
                        <button
                          aria-label="Quitar"
                          className="rounded-md border border-border p-1.5 text-destructive hover:bg-muted"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Paso>

          <Paso n={3} titulo="Finalizar venta">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-1.5 sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Dirección de entrega
                </span>
                <input
                  className={input}
                  defaultValue="Cra 10 #20-30, Bogotá"
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Estado de pago
                </span>
                <select className={input} defaultValue="CONTADO">
                  <option value="CONTADO">CONTADO</option>
                  <option value="CREDITO">CREDITO</option>
                </select>
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Fecha de venta
                </span>
                <input type="date" className={input} />
              </label>
              <label className="block space-y-1.5 sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Observaciones (opcional)
                </span>
                <textarea rows={3} className={input} />
              </label>
            </div>
          </Paso>
        </div>

        <div className="space-y-4">
          <Panel title="Resumen de la venta">
            <dl className="space-y-2 text-sm">
              {[
                ["Ítems", "3"],
                ["Unidades", "6"],
                ["Descuentos", "$0"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
              <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-semibold">
                <dt>Total venta</dt>
                <dd>$1.907.700</dd>
              </div>
            </dl>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              <CheckCircle2 className="size-4" /> Finalizar venta
            </button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Al finalizar se descuenta el stock y se genera la remisión.
            </p>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
