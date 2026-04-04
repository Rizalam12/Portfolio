import { useEffect } from "react";

/**
 * Optional analytics. Set one of these in .env to enable:
 * - VITE_PLAUSIBLE_DOMAIN (e.g. rizwan.dev)
 * - VITE_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX)
 */
export function Analytics() {
  useEffect(() => {
    const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;

    if (plausibleDomain && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.defer = true;
      script.dataset.domain = plausibleDomain;
      script.src = "https://plausible.io/js/script.js";
      document.head.appendChild(script);
    }

    if (gaId && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);
      (window as unknown as { gtag: (a: string, b: string, c: object) => void }).gtag = function () {
        ((window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer: unknown[] }).dataLayer || []).push(arguments);
      };
      (window as unknown as { gtag: (a: string, b: string, c: object) => void }).gtag("config", gaId, { send_page_view: true });
    }
  }, []);

  return null;
}
