const { expect } = require("@playwright/test");
const { test } = require("../fixtures/fixtures");
const DashBoardPage = require("../../page_objects/DashBoardPage");

test("Verify logout using authenticatedPage fixture", async ({ authenticatedPage }) => {
  const dashboard = new DashBoardPage(authenticatedPage);

  await authenticatedPage.goto("/dashboard/user/profile");

  await expect(dashboard.userFullName).toHaveText("Admin Adminuk");
  await expect(dashboard.userRole).toHaveText("role: admin");

  await dashboard.logout();

  await expect(
    authenticatedPage.getByText("Sign in to Delek Homes")
  ).toBeVisible();
});


