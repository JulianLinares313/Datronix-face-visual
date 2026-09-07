import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ShoppingCart,
  Search,
  Plus,
  Trash2,
  Eye,
  XCircle,
  FileText,
  Calendar,
  Filter,
  Package,
  CheckCircle2,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Panel, DataTable, StatCard } from "@/components/module-ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/compras")({
  head: () => ({
    meta: [
      { title: "Compras — Datronix" },
      {
        name: "description",
        content:
          "Registro de compras a proveedores, entrada de mercancía al inventario y control de costos.",
      },
      { property: "og:title", content: "Compras — Datronix" },
      {
        property: "og:description",
        content:
          "Gestión de compras, proveedores y comprobantes de entrada.",
      },
    ],
  }),
  component: Compras,
});

const input =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

const proveedoresMock = [
  { id: 1, empresa: "Tecno Import SAS", contacto: "Jorge Peña" },
  { id: 2, empresa: "Delta Distribuciones", contacto: "Marcela Ríos" },
  { id: 3, empresa: "Andina Hardware", contacto: "Camilo Vega" },
];

const productosMock = [
  { id: 101, nombre: "Teclado mecánico K80", precio: 120000 },
  { id: 102, nombre: "Mouse inalámbrico M2", precio: 52000 },
  { id: 103, nombre: 'Monitor 27" QHD', precio: 980000 },
];

const comprasMock = [
  {
    id: 1001,
    fecha: "2026-09-05",
    proveedor: "Tecno Import SAS",
    total: 1320000,
    observaciones: "Compra de insumos",
    detalles: [
      { producto: "Teclado mecánico K80", cantidad: 10, precio: 120000, subtotal: 1200000 },
      { producto: "Mouse inalámbrico M2", cantidad: 2, precio: 60000, subtotal: 120000 },
    ],
  },
  {
    id: 1002,
    fecha: "2026-09-06",
    proveedor: "Delta Distribuciones",
    total: 980000,
    observaciones: "Reposición monitor",
    detalles: [
      { producto: 'Monitor 27" QHD', cantidad: 1, precio: 980000, subtotal: 980000 },
    ],
  },
];

function formatearPesos(valor: number) {
  return `$${valor.toLocaleString("es-CO")}`;
}

function hoy() {
  return new Date().toISOString().split("T")[0];
}

export default function Compras() {
  const [fecha, setFecha] = useState(hoy());
  const [proveedorBusqueda, setProveedorBusqueda] = useState("");
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<typeof proveedoresMock[0] | null>(null);
  const [observaciones, setObservaciones] = useState("");
  const [filas, setFilas] = useState<{ productoId: number; nombre: string; cantidad: number; precio: number }[]>([]);
  const [productoBusqueda, setProductoBusqueda] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState(0);
  const [productoSeleccionado, setProductoSeleccionado] = useState<typeof productosMock[0] | null>(null);
  const [detalleAbierto, setDetalleAbierto] = useState(false);
  const [compraDetalle, setCompraDetalle] = useState<typeof comprasMock[0] | null>(null);

  const totalCompra = filas.reduce((sum, f) => sum + f.cantidad * f.precio, 0);

  function buscarProveedor() {
    const encontrado = proveedoresMock.find(
      (p) =>
        p.id.toString() === proveedorBusqueda ||
        p.empresa.toLowerCase().includes(proveedorBusqueda.toLowerCase())
    );
    setProveedorSeleccionado(encontrado ?? null);
  }

  function seleccionarProducto(producto: typeof productosMock[0]) {
    setProductoSeleccionado(producto);
    setPrecio(producto.precio);
    setProductoBusqueda(producto.nombre);
  }

  function agregarFila() {
    if (!productoSeleccionado || cantidad <= 0 || precio <= 0) return;
    setFilas((prev) => [
      ...prev,
      {
        productoId: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        cantidad,
        precio,
      },
    ]);
    setProductoSeleccionado(null);
    setProductoBusqueda("");
    setCantidad(1);
    setPrecio(0);
  }

  function quitarFila(index: number) {
    setFilas((prev) => prev.filter((_, i) => i !== index));
  }

  function verDetalle(compra: typeof comprasMock[0]) {
    setCompraDetalle(compra);
    setDetalleAbierto(true);
  }

  return (
    <DashboardLayout breadcrumb="Administrador/Compras/Compras">
      <h1 className="mb-4 text-xl font-semibold">Gestión de compras</h1>

      <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Compras del mes" value="12" icon={<ShoppingCart className="size-5" />} />
        <StatCard label="Total comprado" value="$8.420.000" icon={<FileText className="size-5" />} />
        <StatCard label="Proveedores con compras" value="5" icon={<Package className="size-5" />} />
        <StatCard label="Productos ingresados" value="340" icon={<Plus className="size-5" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel title="Registrar compra">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground">Proveedor</span>
                <div className="flex gap-2">
                  <div className="flex flex-1 items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                    <Search className="size-4 text-muted-foreground" />
                    <input
                      className="w-full bg-transparent text-sm outline-none"
                      placeholder="Buscar por ID o empresa..."
                      value={proveedorBusqueda}
                      onChange={(e) => setProveedorBusqueda(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={buscarProveedor}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                  >
                    Buscar
                  </button>
                </div>
                {proveedorSeleccionado ? (
                  <div className="rounded-md bg-muted/60 p-3 text-sm">
                    <p className="font-medium">{proveedorSeleccionado.empresa}</p>
                    <p className="text-xs text-muted-foreground">Contacto: {proveedorSeleccionado.contacto}</p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Seleccione un proveedor registrado.</p>
                )}
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Fecha de compra</span>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <input
                    type="date"
                    className={input}
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>
              </label>

              <label className="block space-y-1.5 sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground">Observaciones</span>
                <textarea
                  rows={2}
                  className={input}
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                />
              </label>
            </div>

            <div className="mt-4 rounded-md border border-border p-3">
              <h3 className="mb-2 text-sm font-semibold">Productos comprados</h3>
              <div className="grid gap-3 sm:grid-cols-[1fr_6rem_7rem_auto]">
                <div className="relative">
                  <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                    <Search className="size-4 text-muted-foreground" />
                    <input
                      className="w-full bg-transparent text-sm outline-none"
                      placeholder="Buscar producto..."
                      value={productoBusqueda}
                      onChange={(e) => setProductoBusqueda(e.target.value)}
                    />
                  </div>
                  {productoBusqueda && !productoSeleccionado && (
                    <div className="absolute z-10 mt-1 w-full rounded-md border border-border bg-card shadow-card">
                      {productosMock
                        .filter((p) => p.nombre.toLowerCase().includes(productoBusqueda.toLowerCase()))
                        .map((p) => (
                          <button
                            key={p.id}
                            onClick={() => seleccionarProducto(p)}
                            className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                          >
                            {p.nombre} — {formatearPesos(p.precio)}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
                <input
                  type="number"
                  min={1}
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className={input}
                  aria-label="Cantidad"
                />
                <input
                  type="number"
                  min={0}
                  value={precio || ""}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                  className={input}
                  aria-label="Precio unitario"
                />
                <button
                  onClick={agregarFila}
                  className="inline-flex items-center justify-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[480px] text-sm">
                  <thead>
                    <tr className="bg-primary-soft text-left text-secondary-foreground">
                      {["Producto", "Cantidad", "Precio unitario", "Subtotal", ""].map((c) => (
                        <th key={c} className="px-3 py-2 font-semibold">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filas.map((f, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="px-3 py-2">{f.nombre}</td>
                        <td className="px-3 py-2">{f.cantidad}</td>
                        <td className="px-3 py-2">{formatearPesos(f.precio)}</td>
                        <td className="px-3 py-2">{formatearPesos(f.cantidad * f.precio)}</td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => quitarFila(i)}
                            aria-label="Quitar"
                            className="rounded-md border border-border p-1.5 text-destructive hover:bg-muted"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filas.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-3 py-4 text-center text-sm text-muted-foreground">
                          Agrega al menos un producto.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Total compra: </span>
                <span className="text-lg font-semibold">{formatearPesos(totalCompra)}</span>
              </div>
              <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
                <CheckCircle2 className="size-4" /> Registrar compra
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Al registrar se suma el stock de cada producto y se genera el comprobante de entrada.
            </p>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel title="Listado de compras">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Calendar className="size-4 text-muted-foreground" />
                <input type="date" className="bg-transparent text-sm outline-none" defaultValue={hoy()} />
              </div>
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Filter className="size-4 text-muted-foreground" />
                <input className="bg-transparent text-sm outline-none" placeholder="Proveedor..." />
              </div>
            </div>
            <DataTable
              columns={["ID", "Fecha", "Proveedor", "Total", "Acciones"]}
              rows={comprasMock.map((c) => [
                c.id.toString(),
                c.fecha,
                c.proveedor,
                formatearPesos(c.total),
                <div key={c.id} className="flex gap-1">
                  <button
                    onClick={() => verDetalle(c)}
                    aria-label="Ver detalle"
                    className="rounded-md border border-border p-1.5 text-primary hover:bg-muted"
                  >
                    <Eye className="size-3.5" />
                  </button>
                  <button
                    aria-label="Anular"
                    className="rounded-md border border-border p-1.5 text-destructive hover:bg-muted"
                  >
                    <XCircle className="size-3.5" />
                  </button>
                  <button
                    aria-label="PDF"
                    className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-muted"
                  >
                    <FileText className="size-3.5" />
                  </button>
                </div>,
              ])}
            />
          </Panel>
        </div>
      </div>

      <Dialog open={detalleAbierto} onOpenChange={setDetalleAbierto}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalle de compra #{compraDetalle?.id}</DialogTitle>
          </DialogHeader>
          {compraDetalle && (
            <div className="space-y-3 text-sm">
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Fecha</p>
                  <p className="font-medium">{compraDetalle.fecha}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Proveedor</p>
                  <p className="font-medium">{compraDetalle.proveedor}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-muted-foreground">Observaciones</p>
                  <p className="font-medium">{compraDetalle.observaciones}</p>
                </div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-soft text-left text-secondary-foreground">
                    <th className="px-3 py-2 font-semibold">Producto</th>
                    <th className="px-3 py-2 font-semibold">Cant.</th>
                    <th className="px-3 py-2 font-semibold">P. unit.</th>
                    <th className="px-3 py-2 font-semibold">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {compraDetalle.detalles.map((d, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-3 py-2">{d.producto}</td>
                      <td className="px-3 py-2">{d.cantidad}</td>
                      <td className="px-3 py-2">{formatearPesos(d.precio)}</td>
                      <td className="px-3 py-2">{formatearPesos(d.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                <span>Total</span>
                <span>{formatearPesos(compraDetalle.total)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
