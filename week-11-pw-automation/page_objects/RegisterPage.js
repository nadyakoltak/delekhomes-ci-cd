class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput=page.getByLabel("First Name");
    this.lastNameInput=page.getByLabel("Last Name");
    this.emailInput = page.getByLabel("Email address");
    this.passwordInput = page.getByLabel("Password");
    this.registerButton = page.getByRole("button", { name: "Register" });
  }
  async submitRegisterForm(firstName, lastName, email, password) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.registerButton.click();
  }
}
module.exports = RegisterPage;