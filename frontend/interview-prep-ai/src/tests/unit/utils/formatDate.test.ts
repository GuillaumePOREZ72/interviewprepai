import i18next from "i18next";
import moment from "moment";
import formatDate from "../../../utils/formatDate";

describe("formatDate util", () => {
  const iso = "2025-12-30";

  it("formats with explicit lang 'fr' using moment fallback equivalence", () => {
    const expected = moment(iso).locale("fr").format("LL");
    expect(formatDate(iso, "LL", "fr")).toBe(expected);
  });

  it("formats with explicit lang 'en' using moment equivalence (en-gb)", () => {
    const expected = moment(iso).locale("en-gb").format("LL");
    expect(formatDate(iso, "LL", "en")).toBe(expected);
  });

  it("uses i18next.language when lang not provided", async () => {
    await i18next.changeLanguage("fr");
    const expected = moment(iso).locale("fr").format("LL");
    expect(formatDate(iso)).toBe(expected);

    await i18next.changeLanguage("en");
    const expectedEn = moment(iso).locale("en-gb").format("LL");
    expect(formatDate(iso)).toBe(expectedEn);
  });

  it("returns empty string for falsy date", () => {
    expect(formatDate(null)).toBe("");
    expect(formatDate(undefined)).toBe("");
  });
});
