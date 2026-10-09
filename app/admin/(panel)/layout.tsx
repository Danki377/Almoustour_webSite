import { logout } from "@/app/admin/actions/auth";
import { Sidebar, type NavItem } from "@/components/admin/Sidebar";
import { can, requireUser, ROLE_LABEL } from "@/lib/server/auth";
import { db } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("leads");
  const newLeads = await db.lead.count({ where: { status: "NEW" } });

  const items: NavItem[] = [
    { group: "Suivi", href: "/admin", label: "Tableau de bord", icon: "dashboard" },
    { group: "Suivi", href: "/admin/leads", label: "Leads", icon: "leads", badge: newLeads },
  ];
  if (can(user, "content")) {
    items.push(
      { group: "Offres & contenu", href: "/admin/destinations", label: "Offres études", icon: "destinations" },
      { group: "Offres & contenu", href: "/admin/visas", label: "Offres visa", icon: "visas" },
      { group: "Offres & contenu", href: "/admin/services", label: "Services", icon: "services" },
      { group: "Offres & contenu", href: "/admin/temoignages", label: "Témoignages", icon: "testimonials" },
      { group: "Offres & contenu", href: "/admin/faq", label: "FAQ", icon: "faq" }
    );
  }
  if (can(user, "admin")) {
    items.push(
      { group: "Administration", href: "/admin/parametres", label: "Paramètres du site", icon: "settings" },
      { group: "Administration", href: "/admin/utilisateurs", label: "Équipe", icon: "users" },
      { group: "Administration", href: "/admin/journal", label: "Journal d'activité", icon: "audit" }
    );
  }

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar items={items} user={{ name: user.name, role: ROLE_LABEL[user.role] }} logout={logout} />
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
