import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("HTML Meta Tags", () => {
  const indexHtmlPath = join(process.cwd(), "index.html");
  const indexHtmlContent = readFileSync(indexHtmlPath, "utf-8");

  it("should have correct page title", () => {
    expect(indexHtmlContent).toContain(
      "<title>Igiehon Foundation - Empowering Minds, Inspiring Excellence</title>"
    );
  });

  it("should have proper meta description", () => {
    expect(indexHtmlContent).toContain(
      'name="description" content="The Igiehon Mathematics Tournament is a high-impact competition for senior secondary schools in Edo State, celebrating intellect and creativity."'
    );
  });

  it("should have Open Graph title", () => {
    expect(indexHtmlContent).toContain(
      'property="og:title" content="Igiehon Foundation - Empowering Minds, Inspiring Excellence"'
    );
  });

  it("should have Twitter card meta tags", () => {
    expect(indexHtmlContent).toContain('property="twitter:card" content="summary_large_image"');
    expect(indexHtmlContent).toContain(
      'property="twitter:title" content="Igiehon Foundation - Empowering Minds, Inspiring Excellence"'
    );
  });

  it("should have favicon link", () => {
    expect(indexHtmlContent).toContain(
      'rel="icon" type="image/x-icon" href="https://igiehonfoundation.org/assets/images/IFnewicon.jpg"'
    );
  });

  it("should not contain placeholder title", () => {
    expect(indexHtmlContent).not.toContain("Hello world project");
  });
});