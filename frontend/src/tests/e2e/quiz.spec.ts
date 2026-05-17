import { test, expect } from "@playwright/test";

test.describe("Public Quiz System", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/quizzes");
  });

  test("shows quiz list without login", async ({ page }) => {
    await expect(page.getByText(/Test Your Knowledge/i)).toBeVisible();
    // At least one quiz card should be visible
    const quizCards = page.locator("button", { hasText: "Start Quiz" });
    await expect(quizCards.first()).toBeVisible();
  });

  test("starts a quiz on button click", async ({ page }) => {
    await page.getByRole("button", { name: "Start Quiz →" }).first().click();
    await expect(page.getByText(/Q1\./)).toBeVisible();
  });

  test("can select an answer", async ({ page }) => {
    await page.getByRole("button", { name: "Start Quiz →" }).first().click();
    // Click the first option
    const options = page.locator("button").filter({ hasText: /^[A-D]\. / });
    await options.first().click();
  });

  test("shows results after submitting", async ({ page }) => {
    await page.getByRole("button", { name: "Start Quiz →" }).first().click();

    // Answer all questions by clicking next
    let hasNext = true;
    let iterations = 0;
    while (hasNext && iterations < 10) {
      const nextBtn = page.getByRole("button", { name: "Next →" });
      const submitBtn = page.getByRole("button", { name: /Submit Quiz/i });
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
        hasNext = false;
      } else if (await nextBtn.isVisible()) {
        await nextBtn.click();
      } else {
        hasNext = false;
      }
      iterations++;
    }

    await expect(page.getByText(/excellent|keep practicing/i)).toBeVisible({ timeout: 5000 });
  });
});
