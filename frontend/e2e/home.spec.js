import { test, expect } from "@playwright/test";

test("home island nav and hero are visible", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Care that meets you where you are/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Find a doctor" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeAttached();
  await page.screenshot({ path: "e2e/home.png" });
});

test("unknown route shows a way home", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(page.getByRole("heading", { name: /This page is not here/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Go home" })).toBeVisible();
});

test("medicine store renders products with the design system", async ({ page }) => {
  await page.route("**/api/v1/product/getProduct", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify([
        {
          id: 1,
          title: "Daily vitamin tablets",
          image: "https://picsum.photos/seed/vitamins/420/315",
          description: "Daily nutrition support.",
          price: 190,
          reviews: 48,
          rating: 4.5,
        },
      ]),
    });
  });

  await page.goto("/medicines");
  await expect(page.getByRole("heading", { name: "Everyday care, delivered" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Daily vitamin tablets" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Add to Cart" })).toBeVisible();
});

test("AI Lab exposes all three screenings", async ({ page }) => {
  await page.goto("/AI_Lab");
  await expect(page.getByRole("heading", { name: "Understand health signals" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Diabetes risk/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Heart risk/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Stress check/i })).toBeVisible();
});

test("protected booking redirects to sign in", async ({ page }) => {
  await page.goto("/bookDoctor");
  await expect(page).toHaveURL(/\/signin$/);
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
});
