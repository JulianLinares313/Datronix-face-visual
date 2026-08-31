import { useState, type ReactNode } from "react";
import { Search, Pencil, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "date" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
};

export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex w-full max-w-sm items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
      <Search className="size-4 text-muted-foreground" />
      <input
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        placeholder={placeholder}
      />
    </div>
  );
}

export function FieldInput({ field }: { field: FieldDef }) {
  const base =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">
        {field.label}
      </span>
      {field.type === "textarea" ? (
        <textarea rows={3} className={base} placeholder={field.placeholder} />
      ) : field.type === "select" ? (
        <select className={base} defaultValue="">
          <option value="" disabled>
            Seleccionar...
          </option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type ?? "text"}
          className={base}
          placeholder={field.placeholder}
        />
      )}
    </label>
  );
}

export function FormDialog({
  title,
  fields,
  trigger,
  submitLabel = "Guardar",
  columns = 2,
}: {
  title: string;
  fields: FieldDef[];
  trigger: ReactNode;
  submitLabel?: string;
  columns?: 1 | 2;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div
          className={cn(
            "grid gap-3",
            columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
          )}
        >
          {fields.map((f) => (
            <FieldInput key={f.name} field={f} />
          ))}
        </div>
        <DialogFooter>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"
          >
            Cancelar
          </button>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {submitLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AddButton({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
      <Plus className="size-4" /> {label}
    </button>
  );
}

export function RowActions() {
  return (
    <div className="flex gap-1">
      <button
        aria-label="Editar"
        className="rounded-md border border-border p-1.5 text-primary hover:bg-muted"
      >
        <Pencil className="size-3.5" />
      </button>
      <button
        aria-label="Eliminar"
        className="rounded-md border border-border p-1.5 text-destructive hover:bg-muted"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
}

export function CrudHeader({
  title,
  searchPlaceholder,
  addLabel,
  fields,
}: {
  title: string;
  searchPlaceholder: string;
  addLabel: string;
  fields: FieldDef[];
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex flex-wrap items-center gap-2">
        <SearchBar placeholder={searchPlaceholder} />
        <FormDialog
          title={addLabel}
          fields={fields}
          trigger={<AddButton label={addLabel} />}
        />
      </div>
    </div>
  );
}
