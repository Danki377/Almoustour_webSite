import { ParallaxImage } from "@/components/scroll/ParallaxImage";
import Link from "next/link";
import { BogolanStrip } from "@/components/BogolanStrip";
import { Logo } from "@/components/Logo";
import { getSiteContent } from "@/lib/content/server";
import { waLink } from "@/lib/site";

const LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Contacts", href: "/#contact" },
];

export async function Footer() {
  const { settings, services } = await getSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer className="pt-16 lg:pt-20">
      <div className="container-v">
        <div className="relative mb-16 h-[16rem] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl lg:mb-20 lg:h-[22rem]">
          <ParallaxImage
            src="/images/footer-travel.jpg"
            alt="Voyage international vers le monde entier"
            sizes="100vw"
            amount={14}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-canvas/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              Al Moustour Voyages · Bamako
            </span>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-2xl leading-tight">
              Votre projet d&apos;études et de voyage commence ici.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-14 pb-16 lg:flex-row lg:gap-0 lg:pb-20">
          <div className="lg:w-1/3">
            <Logo size="lg" />
          </div>
          <div className="flex flex-col gap-14 lg:w-2/3 lg:flex-row lg:gap-0">
            <nav className="flex flex-col gap-2 lg:w-1/2" aria-label="Pied de page">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="h3 transition-colors hover:text-accent">
                  <span className="text-white/40">+</span>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 lg:w-1/2">
              <a href={`tel:${settings.phone}`} className="body-lg hover:text-accent">
                {settings.phoneDisplay}
              </a>
              <a href={`mailto:${settings.email}`} className="body-lg break-all hover:text-accent">
                {settings.email}
              </a>
              <a href={waLink(undefined, { src: "footer" })} target="_blank" rel="noopener noreferrer" className="body-lg hover:text-accent">
                WhatsApp
              </a>
              <p className="body-lg text-white/60">
                {settings.address}
                <br />
                {settings.addressHint}
              </p>
              <ul className="mt-4 flex flex-col gap-1.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.href} className="body-md text-white/60 hover:text-white">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <BogolanStrip className="absolute inset-x-0 top-0 -translate-y-full" />
        <span className="absolute left-0 right-0 top-0 h-px bg-white/20" />
        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
          <div className="relative flex w-full justify-center px-5 py-3 lg:w-auto lg:px-[3.6rem] lg:py-[1.875rem]">
            <span className="button-sm text-white/60">
              ©Tous droits réservés. Al Moustour Voyages, {year}
            </span>
            <span className="absolute bottom-px right-0 top-px hidden w-px bg-white/20 lg:block" />
          </div>
          <span className="button-sm hidden text-white/60 lg:block">Bamako, Mali — depuis {settings.since}</span>
          <div className="flex gap-6 px-5 pb-5 lg:px-10 lg:pb-0">
            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="button-sm text-white/60 hover:text-white">
              Facebook
            </a>
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="button-sm text-white/60 hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
