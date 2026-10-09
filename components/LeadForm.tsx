"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Lock } from "lucide-react";
import { submitLead, type LeadFormState } from "@/app/actions/lead";
import { useContent } from "@/components/ContentProvider";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cn } from "@/lib/utils";

const field =
  "body-md h-12 w-full rounded-full bg-surface px-5 text-white outline-none ring-1 ring-transparent transition placeholder:text-white/35 focus:ring-accent";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-wa w-full justify-center disabled:opacity-70">
      <WhatsAppIcon className="h-5 w-5" />
      <span className="button-sm">{pending ? "Ouverture de WhatsApp…" : "Continuer sur WhatsApp"}</span>
    </button>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="title-xs mb-2 block text-white/60">
      {children}
    </label>
  );
}

/**
 * Short form: the request is saved for the agency, then the visitor lands in
 * WhatsApp with a message already written.
 */
export function LeadForm({ source = "formulaire", defaultService = "" }: { source?: string; defaultService?: string }) {
  const { services, destinations } = useContent();
  const [rawState, action] = useFormState<LeadFormState, FormData>(submitLead, { ok: false });
  const state = rawState ?? { ok: false };
  const [service, setService] = useState(defaultService);

  useEffect(() => {
    if (rawState?.ok && rawState.redirect) window.location.assign(rawState.redirect);
  }, [rawState]);

  return (
    <form action={action} className="relative flex flex-col gap-4" noValidate>
      <input type="hidden" name="source" value={source} />
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="lead-website">Site web</label>
        <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <Label htmlFor="lead-name">Nom complet</Label>
        <input id="lead-name" name="name" autoComplete="name" required maxLength={80} placeholder="Awa Traoré" className={field} />
        {state.fieldErrors?.name && <p className="body-sm mt-1.5 pl-5 text-sun">{state.fieldErrors.name}</p>}
      </div>

      <div>
        <Label htmlFor="lead-phone">Numéro WhatsApp</Label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          maxLength={30}
          placeholder="+223 70 00 00 00"
          className={field}
        />
        {state.fieldErrors?.phone && <p className="body-sm mt-1.5 pl-5 text-sun">{state.fieldErrors.phone}</p>}
      </div>

      <div className={cn("grid gap-4", service === "accompagnement-etudiant" && "sm:grid-cols-2")}>
        <div>
          <Label htmlFor="lead-service">Votre projet</Label>
          <select
            id="lead-service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={cn(field, "appearance-none [&_option]:bg-deep")}
          >
            <option value="">Je ne sais pas encore</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        {service === "accompagnement-etudiant" && (
          <div>
            <Label htmlFor="lead-destination">Destination</Label>
            <select id="lead-destination" name="destination" defaultValue="" className={cn(field, "appearance-none [&_option]:bg-deep")}>
              <option value="">À définir</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.country}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="lead-message">Message (facultatif)</Label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          maxLength={1000}
          placeholder="Niveau d'études, dates de voyage, questions…"
          className={cn(field, "h-auto resize-none rounded-[1.5rem] py-3.5")}
        />
      </div>

      <Submit />
      <p className="body-sm flex items-center gap-2 text-white/45">
        <Lock size={13} className="shrink-0" />
        Vos informations restent confidentielles et servent uniquement à vous répondre.
      </p>
    </form>
  );
}
