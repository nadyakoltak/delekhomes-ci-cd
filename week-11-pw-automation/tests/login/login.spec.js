const { test, expect } = require("@playwright/test");
const LoginPage = require("../../page_objects/LoginPage");
const DashBoardPage = require("../../page_objects/DashBoardPage");

test.describe("Login", () => {
  test("Verify login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashBoardPage(page);

    await loginPage.loginAs("admin");

    await expect(dashboard.userFullName).toHaveText("Admin Adminuk");
    await expect(dashboard.userRole).toHaveText("role: admin");
  });
});
