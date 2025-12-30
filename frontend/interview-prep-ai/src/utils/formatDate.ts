import moment from "moment";
import i18next from "i18next";

// Import moment locales so they're registered (keeps fallback working)
import "moment/locale/fr";
import "moment/locale/en-gb";

/**
 * Format a date string using Intl.DateTimeFormat when possible (browser),
 * otherwise fall back to moment with per-instance locale.
 *
 * - date: ISO string or anything Date accepts
 * - format: moment format string (default 'LL' -> localized long date)
 * - lang: optional override language code (e.g. 'fr' or 'en-US')
 */
export const formatDate = (
  date?: string | null,
  format: string = "LL",
  lang?: string
): string => {
  if (!date) return "";

  const active = (lang || i18next.language || "en").split("-")[0];

  // Prefer Intl for localized formatting (more reliable in browser)
  try {
    // Map short codes to fuller locales for Intl
    const intlLocale =
      active === "fr" ? "fr-FR" : active === "en" ? "en-US" : active;

    if (format === "LL") {
      return new Intl.DateTimeFormat(intlLocale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(date));
    }

    if (format === "LLL") {
      return new Intl.DateTimeFormat(intlLocale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(date));
    }

    // For other formats, fall back to moment below
  } catch (e) {
    // continue to moment fallback
  }

  // Fallback: use moment with per-instance locale (ensure locale loaded)
  const momentLocale = active === "en" ? "en-gb" : active;
  return moment(date).locale(momentLocale).format(format);
};

export default formatDate;
