"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

/** Unexpected server error in the back office (database down, bug…): explain and offer a retry. */
export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto mt-16 flex max-w-md flex-col items-center gap-4 rounded-2xl bg-deep p-8 text-center ring-1 ring-white/10">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sun/10 text-sun">
        <AlertTriangle size={22} />
      </span>
      <h1 className="text-lg font-semibold">Une erreur est survenue</h1>
      <p className="text-sm text-white/55">
        L&apos;action n&apos;a pas pu aboutir. Vos dernières modifications n&apos;ont peut-être pas été enregistrées. Réessayez dans
        un instant ; si le problème continue, transmettez ce code à votre développeur.
      </p>
      {error.digest && <code className="rounded-lg bg-canvas px-3 py-1.5 text-xs text-white/50">{error.digest}</code>}
      <button
        type="button"
        onClick={reset}
        className="mt-2 inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-medium text-canvas hover:bg-accent-press"
      >
        <RotateCcw size={15} /> Réessayer
      </button>
    </div>
  );
}
