import { cookies } from "next/headers";
import { logout } from "@/app/admin/actions/auth";
import { Sidebar, type NavItem } from "@/components/admin/Sidebar";
import { SIDEBAR_COOKIE } from "@/lib/auth-cookie";
import { can, requireUser, ROLE_LABEL } from "@/lib/server/auth";
import { db } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  // Pages enforce the password change themselves; the layout only adapts the menu
  const user = await requireUser("leads", { pendingPassword: true });
  const items: NavItem[] = [];
  if (!user.mustChangePassword) {
    const newLeads = await db.lead.count({ where: { status: "NEW" } });
    items.push(
      { group: "Suivi", href: "/admin", label: "Tableau de bord", icon: "dashboard" },
      { group: "Suivi", href: "/admin/leads", label: "Leads", icon: "leads", badge: newLeads }
    );
  }
  if (!user.mustChangePassword && can(user, "content")) {
    items.push(
      { group: "Offres & contenu", href: "/admin/destinations", label: "Offres études", icon: "destinations" },
      { group: "Offres & contenu", href: "/admin/visas", label: "Offres visa", icon: "visas" },
      { group: "Offres & contenu", href: "/admin/services", label: "Services", icon: "services" },
      { group: "Offres & contenu", href: "/admin/temoignages", label: "Témoignages", icon: "testimonials" },
      { group: "Offres & contenu", href: "/admin/faq", label: "FAQ", icon: "faq" },
      { group: "Offres & contenu", href: "/admin/medias", label: "Médiathèque", icon: "media" }
    );
  }
  if (!user.mustChangePassword && can(user, "admin")) {
    items.push(
      { group: "Administration", href: "/admin/parametres", label: "Paramètres du site", icon: "settings" },
      { group: "Administration", href: "/admin/utilisateurs", label: "Équipe", icon: "users" },
      { group: "Administration", href: "/admin/journal", label: "Journal d'activité", icon: "audit" }
    );
  }
  items.push({ group: "Mon compte", href: "/admin/compte", label: "Mot de passe & sessions", icon: "account" });

  return (
    <Sidebar
      items={items}
      user={{ name: user.name, role: ROLE_LABEL[user.role] }}
      logout={logout}
      initialCollapsed={cookies().get(SIDEBAR_COOKIE)?.value === "1"}
      canAddLead={!user.mustChangePassword}
    >
      {children}
    </Sidebar>
  );
}
