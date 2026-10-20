import { Page, Locator } from '@playwright/test'

export class LoginPage {
    page: Page;
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly registerLink: Locator;
    private readonly registerName: Locator;
    private readonly registerEmail: Locator;
    private readonly registerPassword: Locator;
    private readonly registerRole: Locator;
    private readonly registerConfirmPassword: Locator;
    private readonly registerButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.email = this.page.locator('select[id="loginUser"]');
        this.password = this.page.locator('input[id="loginPass"]');
        this.loginButton = this.page.locator('text=Entrar');
        this.registerLink = this.page.locator('a[id="goRegister"]');
        this.registerName = this.page.locator('input[id="regName"]');
        this.registerEmail = this.page.locator('input[id="regEmail"]');
        this.registerPassword = this.page.locator('input[id="regPass"]');
        this.registerConfirmPassword = this.page.locator('input[id="regPass2"]');
        this.registerRole = this.page.locator('select[id="regRole"]');
        this.registerButton = this.page.locator('button[id="registerBtn"]');
    }

    async login(email: string, password: string): Promise<void> {
        await this.email.selectOption({ value: email });
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async createAccount(name: string, email: string, role: string, password: string): Promise<void> {
        await this.registerLink.click();
        await this.registerName.fill(name);
        await this.registerEmail.fill(email);
        await this.registerPassword.fill(password);
        await this.registerConfirmPassword.fill(password);
        await this.registerRole.selectOption({ label: role });
        await this.registerButton.click();
    }

}