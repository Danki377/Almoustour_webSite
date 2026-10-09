import { ContentProvider } from "@/components/ContentProvider";
import { getSiteContent } from "@/lib/content/server";

// Pages are cached and regenerated when the back office changes something (or every 10 min)
export const revalidate = 600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  return <ContentProvider value={content}>{children}</ContentProvider>;
}
