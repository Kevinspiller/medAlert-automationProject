import { Page, test, expect } from '@playwright/test';
import { LoginPage } from '../tests/pages/loginPage'
import { faker } from '@faker-js/faker';
import users from '../fixtures/users.json'

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {

     loginPage = new LoginPage(page);

    await page.goto('http://localhost:3000/');

    await expect(page.getByText('Sistema de Gerenciamento de Alertas Hospitalares')).toBeVisible();  

})

test('Login with correct credentials', async ({ page }) => {

    const nurse = users.nurse.Camila;
    

    await loginPage.login(nurse.email, nurse.password);

    await expect(page.locator('span', { hasText: nurse.name })).toContainText('Enfermeiro(a)');

});

// this test will fail because the system is not validating if the informed password is correct or not, it will always log in the user, even with an incorrect password
test('Login with incorrect password', async ({ page }) => {

    const nurse = users.nurse.Camila;

    await loginPage.login(nurse.email, 'abobrinha');

    await expect(page.getByText('Senha incorreta.')).toBeVisible();

});

test('Login without password set', async ({ page }) => {

    const nurse = users.nurse.Paulo;

    await loginPage.login(nurse.email, '');

    await expect(page.locator('p[id="loginError"]')).toBeVisible();

    await expect(page.getByText('Informe uma senha.')).toBeVisible();

});

test('Create account', async ({ page }) => {

    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();

    await loginPage.createAccount(randomName, randomEmail, 'Paciente', randomPassword);

    await page.getByText('Conta criada com sucesso. Faça login.').click();

})
