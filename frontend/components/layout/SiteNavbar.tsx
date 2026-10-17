import Navbar from "./Navbar";
import { safeFetchFresh } from "../../lib/sanity";

export default async function SiteNavbar({ overlay = false }: { overlay?: boolean }) {
  const settings = await safeFetchFresh<{ logoImageUrl?: string }>(
    `*[_type == "settings"][0]{"logoImageUrl": logo.asset->url}`,
    {},
  );

  return <Navbar overlay={overlay} logoUrl={settings?.logoImageUrl} />;
}
