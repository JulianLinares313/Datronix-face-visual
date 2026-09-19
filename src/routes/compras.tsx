// ============================================================================
// compras.tsx — Módulo de COMPRAS (entrada de mercancía al inventario)
// Flujo del documento:
//   1. Buscar y seleccionar el proveedor
//   2. Fecha de compra (por defecto hoy) y observaciones
//   3. Tabla dinámica de productos: cantidad + precio unitario → subtotal
//   4. Total automático y botón "Registrar compra"
// Al registrar, el backend SUMARÁ el stock de cada producto.
// El listado tiene filtros por fecha y proveedor, ver detalle, anular y PDF.
// ============================================================================

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
// Iconos usados en la pantalla
import {
  ShoppingCart, // carrito → KPI compras
  Search, // lupa → buscadores
  Plus, // más → agregar fila de producto
  Trash2, // caneca → quitar fila
  Eye, // ojo → ver detalle
  XCircle, // equis → anular compra
  FileText, // documento → PDF
  Calendar, // calendario → filtros de fecha
  Filter, // embudo → filtro por proveedor
  Package, // paquete → KPI productos
  CheckCircle2, // check → registrar compra
} from "lucide-react";
import { LayoutPanel } from "@/components/DashboardLayout";
import { Panel, TablaDatos, TarjetaEstadistica } from "@/components/module-ui";
// Componentes del modal de detalle (shadcn/ui)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Ruta "/compras" con metadatos SEO
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

// Clases base de los inputs de esta pantalla
const claseInput =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

// ----------------------------------------------------------------------------
// DATOS DE EJEMPLO (mock) — se reemplazarán por llamadas al backend
// ----------------------------------------------------------------------------

// Proveedores registrados (vendrán de GET /api/proveedores)
const proveedoresEjemplo = [
  { id: 1, empresa: "Tecno Import SAS", contacto: "Jorge Peña" },
  { id: 2, empresa: "Delta Distribuciones", contacto: "Marcela Ríos" },
  { id: 3, empresa: "Andina Hardware", contacto: "Camilo Vega" },
];

// Productos disponibles para comprar (vendrán de GET /api/productos)
const productosEjemplo = [
  { id: 101, nombre: "Teclado mecánico K80", precio: 120000 },
  { id: 102, nombre: "Mouse inalámbrico M2", precio: 52000 },
  { id: 103, nombre: 'Monitor 27" QHD', precio: 980000 },
];

// Compras ya registradas (vendrán del listado de compras del backend)
const comprasEjemplo = [
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

// formatearPesos: convierte un número a formato de moneda colombiana ($1.200.000)
function formatearPesos(valor: number) {
  return `$${valor.toLocaleString("es-CO")}`;
}

// fechaHoy: devuelve la fecha de hoy en formato AAAA-MM-DD (para el input date)
function fechaHoy() {
  return new Date().toISOString().split("T")[0];
}

// ----------------------------------------------------------------------------
// Compras: pantalla del módulo
// ----------------------------------------------------------------------------
export default function Compras() {
  // ---- Estados del formulario "Registrar compra" ----
  const [fecha, setFecha] = useState(fechaHoy()); // fecha de compra (hoy por defecto)
  const [proveedorBusqueda, setProveedorBusqueda] = useState(""); // texto del buscador de proveedor
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<typeof proveedoresEjemplo[0] | null>(null); // proveedor elegido
  const [observaciones, setObservaciones] = useState(""); // observaciones de la compra
  const [filas, setFilas] = useState<{ productoId: number; nombre: string; cantidad: number; precio: number }[]>([]); // productos agregados
  const [productoBusqueda, setProductoBusqueda] = useState(""); // texto del buscador de producto
  const [cantidad, setCantidad] = useState(1); // cantidad a comprar
  const [precio, setPrecio] = useState(0); // precio unitario de compra
  const [productoSeleccionado, setProductoSeleccionado] = useState<typeof productosEjemplo[0] | null>(null); // producto elegido
  // ---- Estados del modal de detalle ----
  const [detalleAbierto, setDetalleAbierto] = useState(false); // si el modal está abierto
  const [compraDetalle, setCompraDetalle] = useState<typeof comprasEjemplo[0] | null>(null); // compra a mostrar

  // Total de la compra: suma de (cantidad × precio) de cada fila
  const totalCompra = filas.reduce((suma, fila) => suma + fila.cantidad * fila.precio, 0);

  // buscarProveedor: busca por ID o por nombre de empresa (visual, datos de ejemplo)
  function buscarProveedor() {
    const encontrado = proveedoresEjemplo.find(
      (p) =>
        p.id.toString() === proveedorBusqueda ||
        p.empresa.toLowerCase().includes(proveedorBusqueda.toLowerCase())
    );
    setProveedorSeleccionado(encontrado ?? null);
  }

  // seleccionarProducto: llena el buscador y el precio con el producto elegido
  function seleccionarProducto(producto: typeof productosEjemplo[0]) {
    setProductoSeleccionado(producto);
    setPrecio(producto.precio);
    setProductoBusqueda(producto.nombre);
  }

  // agregarFila: valida cantidad/precio > 0 y agrega el producto a la tabla
  function agregarFila() {
    if (!productoSeleccionado || cantidad <= 0 || precio <= 0) return;
    setFilas((anteriores) => [
      ...anteriores,
      {
        productoId: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        cantidad,
        precio,
      },
    ]);
    // Limpia el buscador para agregar otro producto
    setProductoSeleccionado(null);
    setProductoBusqueda("");
    setCantidad(1);
    setPrecio(0);
  }

  // quitarFila: elimina una fila de la tabla por su posición
  function quitarFila(indice: number) {
    setFilas((anteriores) => anteriores.filter((_, i) => i !== indice));
  }

  // verDetalle: abre el modal con la compra seleccionada
  function verDetalle(compra: typeof comprasEjemplo[0]) {
    setCompraDetalle(compra);
    setDetalleAbierto(true);
  }

  return (
    <LayoutPanel rutaMiga="Administrador/Compras/Compras">
      <h1 className="mb-4 text-xl font-semibold">Gestión de compras</h1>

      {/* ---- KPIs del módulo ---- */}
      <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TarjetaEstadistica etiqueta="Compras del mes" valor="12" icono={<ShoppingCart className="size-5" />} />
        <TarjetaEstadistica etiqueta="Total comprado" valor="$8.420.000" icono={<FileText className="size-5" />} />
        <TarjetaEstadistica etiqueta="Proveedores con compras" valor="5" icono={<Package className="size-5" />} />
        <TarjetaEstadistica etiqueta="Productos ingresados" valor="340" icono={<Plus className="size-5" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* ======== Columna izquierda: formulario de registro ======== */}
        <div className="space-y-4 lg:col-span-2">
          <Panel titulo="Registrar compra">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Buscador de proveedor */}
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
                {/* Ficha del proveedor encontrado o mensaje de ayuda */}
                {proveedorSeleccionado ? (
                  <div className="rounded-md bg-muted/60 p-3 text-sm">
                    <p className="font-medium">{proveedorSeleccionado.empresa}</p>
                    <p className="text-xs text-muted-foreground">Contacto: {proveedorSeleccionado.contacto}</p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Seleccione un proveedor registrado.</p>
                )}
              </div>

              {/* Fecha de compra (hoy por defecto) */}
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Fecha de compra</span>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <input
                    type="date"
                    className={claseInput}
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>
              </label>

              {/* Observaciones */}
              <label className="block space-y-1.5 sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground">Observaciones</span>
                <textarea
                  rows={2}
                  className={claseInput}
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                />
              </label>
            </div>

            {/* ---- Tabla dinámica de productos comprados ---- */}
            <div className="mt-4 rounded-md border border-border p-3">
              <h3 className="mb-2 text-sm font-semibold">Productos comprados</h3>
              {/* Fila para agregar: buscador de producto + cantidad + precio + botón */}
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
                  {/* Lista desplegable de coincidencias mientras se escribe */}
                  {productoBusqueda && !productoSeleccionado && (
                    <div className="absolute z-10 mt-1 w-full rounded-md border border-border bg-card shadow-card">
                      {productosEjemplo
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
                {/* Cantidad a comprar */}
                <input
                  type="number"
                  min={1}
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className={claseInput}
                  aria-label="Cantidad"
                />
                {/* Precio unitario de compra */}
                <input
                  type="number"
                  min={0}
                  value={precio || ""}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                  className={claseInput}
                  aria-label="Precio unitario"
                />
                {/* Botón para agregar la fila */}
                <button
                  onClick={agregarFila}
                  className="inline-flex items-center justify-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              {/* Tabla de filas agregadas con subtotal por fila */}
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[480px] text-sm">
                  <thead>
                    <tr className="bg-primary-soft text-left text-secondary-foreground">
                      {["Producto", "Cantidad", "Precio unitario", "Subtotal", ""].map((columna) => (
                        <th key={columna} className="px-3 py-2 font-semibold">
                          {columna}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filas.map((fila, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="px-3 py-2">{fila.nombre}</td>
                        <td className="px-3 py-2">{fila.cantidad}</td>
                        <td className="px-3 py-2">{formatearPesos(fila.precio)}</td>
                        {/* Subtotal = cantidad × precio */}
                        <td className="px-3 py-2">{formatearPesos(fila.cantidad * fila.precio)}</td>
                        <td className="px-3 py-2">
                          {/* Quitar la fila */}
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
                    {/* Mensaje cuando no hay productos agregados */}
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

            {/* Total automático + botón registrar */}
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

        {/* ======== Columna derecha: listado de compras ======== */}
        <div className="space-y-4">
          <Panel titulo="Listado de compras">
            {/* Filtros: por fecha y por proveedor */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Calendar className="size-4 text-muted-foreground" />
                <input type="date" className="bg-transparent text-sm outline-none" defaultValue={fechaHoy()} />
              </div>
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Filter className="size-4 text-muted-foreground" />
                <input className="bg-transparent text-sm outline-none" placeholder="Proveedor..." />
              </div>
            </div>
            {/* Tabla de compras con acciones: ver detalle, anular y PDF */}
            <TablaDatos
              columnas={["ID", "Fecha", "Proveedor", "Total", "Acciones"]}
              filas={comprasEjemplo.map((compra) => [
                compra.id.toString(),
                compra.fecha,
                compra.proveedor,
                formatearPesos(compra.total),
                <div key={compra.id} className="flex gap-1">
                  {/* Ver detalle (abre el modal) */}
                  <button
                    onClick={() => verDetalle(compra)}
                    aria-label="Ver detalle"
                    className="rounded-md border border-border p-1.5 text-primary hover:bg-muted"
                  >
                    <Eye className="size-3.5" />
                  </button>
                  {/* Anular compra (el backend revertirá el stock) */}
                  <button
                    aria-label="Anular"
                    className="rounded-md border border-border p-1.5 text-destructive hover:bg-muted"
                  >
                    <XCircle className="size-3.5" />
                  </button>
                  {/* Descargar PDF del comprobante */}
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

      {/* ======== Modal de detalle de compra ======== */}
      <Dialog open={detalleAbierto} onOpenChange={setDetalleAbierto}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalle de compra #{compraDetalle?.id}</DialogTitle>
          </DialogHeader>
          {/* Solo se pinta si hay una compra seleccionada */}
          {compraDetalle && (
            <div className="space-y-3 text-sm">
              {/* Datos generales de la compra */}
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
              {/* Productos de la compra */}
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
                  {compraDetalle.detalles.map((detalle, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-3 py-2">{detalle.producto}</td>
                      <td className="px-3 py-2">{detalle.cantidad}</td>
                      <td className="px-3 py-2">{formatearPesos(detalle.precio)}</td>
                      <td className="px-3 py-2">{formatearPesos(detalle.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Total de la compra */}
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                <span>Total</span>
                <span>{formatearPesos(compraDetalle.total)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </LayoutPanel>
  );
}
