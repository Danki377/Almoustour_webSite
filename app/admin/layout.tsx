import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Administration", template: "%s · Admin Al Moustour" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-theme min-h-screen bg-canvas text-white">{children}</div>;
}
