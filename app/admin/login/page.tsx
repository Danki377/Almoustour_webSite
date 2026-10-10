import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import { login } from "@/app/admin/actions/auth";
import { ActionForm, Field, Submit } from "@/components/admin/form";
import { Logo } from "@/components/Logo";
import { getSessionUser } from "@/lib/server/auth";
import { isDbConfigured } from "@/lib/server/db";

export const metadata = { title: "Connexion" };
export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: { next?: string } }) {
  if (isDbConfigured && (await getSessionUser())) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-2xl bg-deep p-6 ring-1 ring-white/10 sm:p-8">
          <h1 className="text-xl font-semibold tracking-[-0.03em]">Espace administration</h1>
          <p className="mt-1.5 text-sm text-white/50">Réservé à l&apos;équipe Al Moustour Voyages.</p>

          <ActionForm action={login} className="mt-8 flex flex-col gap-4">
            <input type="hidden" name="next" value={searchParams.next ?? ""} />
            <Field name="email" label="Email" type="email" autoComplete="username" required autoFocus />
            <Field name="password" label="Mot de passe" type="password" autoComplete="current-password" required />
            <Submit className="mt-2 w-full">Se connecter</Submit>
          </ActionForm>
          <p className="mt-5 text-center text-xs text-white/40">Mot de passe oublié ? Demandez au super admin de le réinitialiser.</p>
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
          <Lock size={12} />
          Connexion chiffrée · tentatives limitées
        </p>
      </div>
    </main>
  );
}
