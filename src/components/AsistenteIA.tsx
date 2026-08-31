import { useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  "¿Cómo registro una venta?",
  "¿Qué hago con un crédito vencido?",
  "¿Cómo repongo stock bajo?",
  "¿Dónde veo las remisiones?",
];

type Msg = { from: "ia" | "user"; text: string };

const respuestas: Record<string, string> = {
  "¿Cómo registro una venta?":
    "Ve al módulo Ventas, busca el cliente por cédula, agrega productos al carrito, define dirección de entrega y estado de pago (CONTADO o CRÉDITO) y finaliza. La remisión se genera automáticamente.",
  "¿Qué hago con un crédito vencido?":
    "Abre Reportes > Créditos pendientes. Allí ves las ventas con estado CRÉDITO y los días transcurridos para gestionar el cobro.",
  "¿Cómo repongo stock bajo?":
    "En Reportes > Stock bajo verás los productos por debajo del mínimo, resaltados en rojo. Contacta al proveedor asociado desde el módulo Proveedores.",
  "¿Dónde veo las remisiones?":
    "En Historial de ventas, cada venta tiene el botón Ver detalle con los productos y la remisión generada.",
};

export function AsistenteIA() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "ia",
      text: "¡Hola! Soy el asistente Datronix IA. ¿En qué te ayudo hoy?",
    },
  ]);
  const [text, setText] = useState("");

  function send(value: string) {
    if (!value.trim()) return;
    setMsgs((m) => [
      ...m,
      { from: "user", text: value },
      {
        from: "ia",
        text:
          respuestas[value] ??
          "Estoy en modo demostración. Pronto podré responder consultas sobre tus ventas, inventario y cartera en tiempo real.",
      },
    ]);
    setText("");
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Asistente IA"
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-gradient-header text-primary-foreground shadow-card transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <Bot className="size-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[26rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card">
          <div className="flex items-center gap-2 bg-gradient-header px-4 py-3 text-primary-foreground">
            <Sparkles className="size-4" />
            <p className="text-sm font-semibold">Datronix IA</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                  m.from === "ia"
                    ? "bg-muted text-foreground"
                    : "ml-auto bg-primary text-primary-foreground",
                )}
              >
                {m.text}
              </div>
            ))}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {faqs.map((f) => (
                <button
                  key={f}
                  onClick={() => send(f)}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-border p-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(text)}
              placeholder="Escribe tu consulta..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={() => send(text)}
              aria-label="Enviar"
              className="rounded-md bg-primary p-2 text-primary-foreground hover:opacity-90"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
