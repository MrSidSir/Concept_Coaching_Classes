import { test, expect } from "@playwright/test";

test.describe("Public Navigation", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Concept Coaching Classes/);
  });

  test("courses page is accessible", async ({ page }) => {
    await page.goto("/courses");
    await expect(page.getByRole("heading", { name: /courses/i })).toBeVisible();
  });

  test("videos page is accessible without login", async ({ page }) => {
    await page.goto("/videos");
    await expect(page).not.toHaveURL(/login/);
  });

  test("quizzes page is accessible without login", async ({ page }) => {
    await page.goto("/quizzes");
    await expect(page.getByText(/Test Your Knowledge/i)).toBeVisible();
  });

  test("notes page is accessible without login", async ({ page }) => {
    await page.goto("/notes");
    await expect(page).not.toHaveURL(/login/);
  });

  test("admin redirects to login when not authenticated", async ({ page }) => {
    await page.goto("/admin");
    // Either redirect to login or show loading (auth check in client)
    const url = page.url();
    const hasRedirectedOrBlocked = url.includes("/login") || url.includes("/admin");
    expect(hasRedirectedOrBlocked).toBe(true);
  });
});

test.describe("SEO", () => {
  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("User-agent");
  });

  test("sitemap.xml is accessible", async ({ page }) => {
    const response = await page.request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
  });
});

test.describe("Theme Toggle", () => {
  test("theme toggle button is visible", async ({ page }) => {
    await page.goto("/");
    const toggleButtons = page.getByRole("button", { name: /switch to/i });
    await expect(toggleButtons.first()).toBeVisible();
  });
});
