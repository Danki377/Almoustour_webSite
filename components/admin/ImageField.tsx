"use client";

import { useState } from "react";
import { Field } from "@/components/admin/form";

/** Photos shipped with the site (public/images). Any https image URL also works. */
const SITE_IMAGES = [
  "billetterie",
  "canada",
  "chine",
  "etudiant",
  "france",
  "inde",
  "maroc",
  "russie",
  "turquie",
  "usa",
  "visa",
  "combine-travel",
  "footer-travel",
].map((n) => `/images/${n}.jpg`);

export function ImageField({ name = "image", label = "Image", defaultValue = "" }: { name?: string; label?: string; defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const valid = /^(\/[\w\-./]+\.(jpe?g|png|webp|avif)|https:\/\/\S+)$/i.test(value);

  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_7rem] sm:items-end">
      <div>
        <Field
          name={name}
          label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          list={`${name}-suggestions`}
          placeholder="/images/france.jpg ou https://…"
          hint="Choisissez une photo du site dans la liste, ou collez l'adresse https d'une image en ligne."
        />
        <datalist id={`${name}-suggestions`}>
          {SITE_IMAGES.map((src) => (
            <option key={src} value={src} />
          ))}
        </datalist>
      </div>
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-canvas ring-1 ring-white/10">
        {valid ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Aperçu" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center text-xs text-white/30">Aperçu</span>
        )}
      </div>
    </div>
  );
}
