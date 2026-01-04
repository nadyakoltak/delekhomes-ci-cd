class DashBoardPage {
  constructor(page) {
    this.page = page;
    this.userFullName = page.locator('h6.MuiTypography-root');
    this.userRole = page.locator('a p.MuiTypography-body2');
    this.profileAvatar = page.locator('button img[src*="BR-"]'); 
    this.logoutButton = page.getByText("Logout");
  }

  async logout() {
    await this.profileAvatar.click();
    await this.logoutButton.click();
  }
}

module.exports = DashBoardPage;
