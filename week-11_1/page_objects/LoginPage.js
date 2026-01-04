class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByLabel("Email address");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.loginLink = page.getByRole("link", { name: "Login" });
  }

  async login(email, password, isRealtor = false) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAs(role) {
    await this.page.goto("/");
    await this.loginLink.click();

    let email;
    let password;

    if (role === "admin") {
      email = "admin@gmail.com";
      password = "DontTestMe";
    } else if (role === "realtor") {
      email = "nadezhdak@gmail.com";
      password = "8878Kna#";
    } else {
      throw new Error(`Unknown role: ${role}`);
    }

    await this.login(email, password, role === "realtor");
  }
}

module.exports = LoginPage;
