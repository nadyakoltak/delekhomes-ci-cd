const { test, expect } = require("@playwright/test");
const HomePage = require("../../page_objects/HomePage");
const RegisterPage = require("../../page_objects/RegisterPage");

test.describe("Registration", () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await page.goto("/");
    await home.clickRegisterLink();
  });

  test("User cannot register with invalid email", async ({ page }) => {
    const register = new RegisterPage(page);

    await register.submitRegisterForm(
      "Nadya",
      "Koltakova",
      "admingmail.com",
      "DontTestMe"
    );

    await expect(
      page.getByText("Email must be a valid email address")
    ).toBeVisible();
  });

  test("User can register a new account", async ({ page }) => {
    const register = new RegisterPage(page);

    const randomEmail = `nadya${Date.now()}@gmail.com`;
    await register.submitRegisterForm(
      "Nadya",
      "Koltakova",
      randomEmail,
      "DontTestMe"
    );

    await expect(page.getByText("role: user")).toBeVisible();
  });

  test("User cannot register if email already exists", async ({ page }) => {
    const register = new RegisterPage(page);

    await register.submitRegisterForm(
      "Nadya",
      "Koltakova",
      "nadezhda@gmail.com",
      "DontTestMe"
    );

    await expect(page.getByText("Input data validation failed")).toBeVisible();
  });

  test("User cannot register with empty fields", async ({ page }) => {
    const register = new RegisterPage(page);

    await register.submitRegisterForm("", "", "", "");

    await expect(page.getByText("First name required")).toBeVisible();
    await expect(page.getByText("Last name required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });
});
