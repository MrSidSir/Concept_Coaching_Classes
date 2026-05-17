import { describe, it, expect } from "vitest";
import { validateFile, FILE_RULES } from "@/services/storage.service";

describe("validateFile", () => {
  const makeFile = (name: string, type: string, sizeMB: number) =>
    new File(["x".repeat(sizeMB * 1024 * 1024)], name, { type });

  it("accepts valid PDF file", () => {
    const f = makeFile("notes.pdf", "application/pdf", 1);
    expect(validateFile(f, [...FILE_RULES.pdf.types], FILE_RULES.pdf.maxMB).valid).toBe(true);
  });

  it("rejects PDF that is too large", () => {
    const f = makeFile("big.pdf", "application/pdf", 200);
    const result = validateFile(f, [...FILE_RULES.pdf.types], FILE_RULES.pdf.maxMB);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("too large");
  });

  it("rejects wrong file type for video slot", () => {
    const f = makeFile("doc.pdf", "application/pdf", 1);
    const result = validateFile(f, [...FILE_RULES.video.types], FILE_RULES.video.maxMB);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("Invalid file type");
  });

  it("accepts valid image file", () => {
    const f = makeFile("thumb.jpg", "image/jpeg", 1);
    expect(validateFile(f, [...FILE_RULES.image.types], FILE_RULES.image.maxMB).valid).toBe(true);
  });
});
