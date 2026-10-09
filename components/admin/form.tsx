"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import type { ActionState, FormAction } from "@/lib/admin/action";
import { cn } from "@/lib/utils";

const StateContext = createContext<ActionState>({});

export const inputClass =
  "h-11 w-full rounded-xl bg-canvas px-4 text-sm text-white outline-none ring-1 ring-white/10 transition placeholder:text-white/30 focus:ring-accent disabled:opacity-50";

/** Form bound to a server action, with inline success / error feedback. */
export function ActionForm({
  action,
  children,
  className,
  resetOnSuccess,
}: {
  action: FormAction;
  children: ReactNode;
  className?: string;
  resetOnSuccess?: boolean;
}) {
  const [rawState, formAction] = useFormState(action, {});
  // An action that redirects to the same page leaves the state undefined
  const state = rawState ?? {};
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (rawState?.ok && resetOnSuccess) ref.current?.reset();
  }, [rawState, resetOnSuccess]);

  return (
    <form ref={ref} action={formAction} className={className} noValidate>
      <StateContext.Provider value={state}>
        {children}
        <FormMessage />
      </StateContext.Provider>
    </form>
  );
}

function FormMessage() {
  const state = useContext(StateContext);
  if (!state.message) return null;
  return (
    <p
      role={state.ok ? "status" : "alert"}
      className={cn(
        "mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm",
        state.ok ? "bg-whatsapp/10 text-whatsapp" : "bg-red-500/10 text-red-300"
      )}
    >
      {state.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      {state.message}
    </p>
  );
}

type FieldProps = {
  name: string;
  label: string;
  hint?: ReactNode;
  className?: string;
};

function FieldShell({ name, label, hint, className, children }: FieldProps & { children: ReactNode }) {
  const error = useContext(StateContext).errors?.[name];
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={`f-${name}`} className="text-xs font-medium text-white/60">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs text-red-300">{error}</p> : hint ? <p className="text-xs text-white/40">{hint}</p> : null}
    </div>
  );
}

export function Field({
  name,
  label,
  hint,
  className,
  ...input
}: FieldProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "className">) {
  const error = useContext(StateContext).errors?.[name];
  return (
    <FieldShell name={name} label={label} hint={hint} className={className}>
      <input id={`f-${name}`} name={name} aria-invalid={Boolean(error)} className={cn(inputClass, error && "ring-red-400/60")} {...input} />
    </FieldShell>
  );
}

export function TextArea({
  name,
  label,
  hint,
  className,
  rows = 4,
  ...input
}: FieldProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "className">) {
  const error = useContext(StateContext).errors?.[name];
  return (
    <FieldShell name={name} label={label} hint={hint} className={className}>
      <textarea
        id={`f-${name}`}
        name={name}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={cn(inputClass, "h-auto py-3 leading-relaxed", error && "ring-red-400/60")}
        {...input}
      />
    </FieldShell>
  );
}

export function Select({
  name,
  label,
  hint,
  className,
  options,
  ...input
}: FieldProps & {
  options: { value: string; label: string }[];
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name" | "className">) {
  return (
    <FieldShell name={name} label={label} hint={hint} className={className}>
      <select id={`f-${name}`} name={name} className={cn(inputClass, "[&_option]:bg-deep")} {...input}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function Checkbox({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-white/80">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-[#00AEEF]" />
      {label}
    </label>
  );
}

export function Submit({ children = "Enregistrer", className }: { children?: ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={cn(buttonClass("primary"), className)}>
      {pending && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  );
}

export function buttonClass(variant: "primary" | "secondary" | "danger" | "ghost" = "secondary") {
  return cn(
    "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors disabled:opacity-60",
    variant === "primary" && "bg-accent text-canvas hover:bg-accent-press",
    variant === "secondary" && "bg-surface text-white ring-1 ring-white/10 hover:bg-white/10",
    variant === "danger" && "bg-red-500/10 text-red-300 ring-1 ring-red-400/20 hover:bg-red-500/20",
    variant === "ghost" && "text-white/60 hover:bg-white/5 hover:text-white"
  );
}

/** Small one-click form (delete, toggle…), with an optional confirmation. */
export function ActionButton({
  action,
  children,
  confirm,
  variant = "secondary",
  className,
  fields,
}: {
  action: (formData: FormData) => void | Promise<void>;
  children: ReactNode;
  confirm?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  className?: string;
  fields?: Record<string, string>;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
    >
      {fields && Object.entries(fields).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      <PendingButton variant={variant} className={className}>
        {children}
      </PendingButton>
    </form>
  );
}

function PendingButton({ children, variant, className }: { children: ReactNode; variant: "primary" | "secondary" | "danger" | "ghost"; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={cn(buttonClass(variant), className)}>
      {pending ? <Loader2 size={15} className="animate-spin" /> : null}
      {children}
    </button>
  );
}
