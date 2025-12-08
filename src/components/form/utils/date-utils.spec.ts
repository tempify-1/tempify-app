import { describe, test, expect } from "vitest";
import { getOrdinalSuffix, formatDate, MONTH_NAMES_LONG, MONTH_NAMES_SHORT } from "./date-utils";

describe("getOrdinalSuffix", () => {
  test("returns 'st' for 1, 21, 31", () => {
    expect(getOrdinalSuffix(1)).toBe("st");
    expect(getOrdinalSuffix(21)).toBe("st");
    expect(getOrdinalSuffix(31)).toBe("st");
  });

  test("returns 'nd' for 2, 22", () => {
    expect(getOrdinalSuffix(2)).toBe("nd");
    expect(getOrdinalSuffix(22)).toBe("nd");
  });

  test("returns 'rd' for 3, 23", () => {
    expect(getOrdinalSuffix(3)).toBe("rd");
    expect(getOrdinalSuffix(23)).toBe("rd");
  });

  test("returns 'th' for 4-20", () => {
    for (let i = 4; i <= 20; i++) {
      expect(getOrdinalSuffix(i)).toBe("th");
    }
  });

  test("returns 'th' for 11, 12, 13 (special cases)", () => {
    expect(getOrdinalSuffix(11)).toBe("th");
    expect(getOrdinalSuffix(12)).toBe("th");
    expect(getOrdinalSuffix(13)).toBe("th");
  });

  test("returns 'th' for 24-30", () => {
    expect(getOrdinalSuffix(24)).toBe("th");
    expect(getOrdinalSuffix(25)).toBe("th");
    expect(getOrdinalSuffix(30)).toBe("th");
  });
});

describe("formatDate", () => {
  test("returns undefined for empty/undefined input", () => {
    expect(formatDate(undefined)).toBeUndefined();
    expect(formatDate("")).toBeUndefined();
  });

  test("returns undefined for invalid date string", () => {
    expect(formatDate("not-a-date")).toBeUndefined();
    expect(formatDate("invalid")).toBeUndefined();
  });

  test("formats date with long month name by default", () => {
    // Note: Date parsing can vary by timezone, using ISO format for consistency
    const result = formatDate("2024-01-15");
    expect(result).toContain("January");
    expect(result).toContain("15th");
    expect(result).toContain("2024");
  });

  test("formats date with short month name when option set", () => {
    const result = formatDate("2024-03-22", { shortMonth: true });
    expect(result).toContain("Mar");
    expect(result).toContain("22nd");
    expect(result).toContain("2024");
  });

  test("formats date with short year when option set", () => {
    const result = formatDate("2024-07-01", { shortYear: true });
    expect(result).toContain("July");
    expect(result).toContain("1st");
    expect(result).toContain("24");
    expect(result).not.toContain("2024");
  });

  test("formats date with both short options", () => {
    const result = formatDate("2024-12-25", { shortMonth: true, shortYear: true });
    expect(result).toContain("Dec");
    expect(result).toContain("25th");
    expect(result).toContain("25"); // short year
  });

  test("handles different ordinal suffixes correctly", () => {
    expect(formatDate("2024-01-01")).toContain("1st");
    expect(formatDate("2024-01-02")).toContain("2nd");
    expect(formatDate("2024-01-03")).toContain("3rd");
    expect(formatDate("2024-01-11")).toContain("11th");
    expect(formatDate("2024-01-21")).toContain("21st");
  });
});

describe("MONTH_NAMES constants", () => {
  test("MONTH_NAMES_LONG has 12 months", () => {
    expect(MONTH_NAMES_LONG).toHaveLength(12);
    expect(MONTH_NAMES_LONG[0]).toBe("January");
    expect(MONTH_NAMES_LONG[11]).toBe("December");
  });

  test("MONTH_NAMES_SHORT has 12 months", () => {
    expect(MONTH_NAMES_SHORT).toHaveLength(12);
    expect(MONTH_NAMES_SHORT[0]).toBe("Jan");
    expect(MONTH_NAMES_SHORT[11]).toBe("Dec");
  });
});

