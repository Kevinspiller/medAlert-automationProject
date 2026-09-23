import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import users from '../fixtures/users.json'

test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:3000/');

    await expect(page.getByText('Sistema de Gerenciamento de Alertas Hospitalares')).toBeVisible();

})

test('Login with correct credentials', async ({ page }) => {

    const nurse = users.nurse.Camila;

    await page.selectOption('select[id="loginUser"]', { value: nurse.email });

    await page.keyboard.press('Tab');

    await page.fill('input[id="loginPass"]', nurse.password);

    await page.getByText('Entrar').click();

    await expect(page.locator('span', { hasText: nurse.name })).toContainText('Enfermeiro(a)');

});

// this test will fail because the system is not validating if the informed password is correct or not, it will always log in the user, even with an incorrect password
test('Login with incorrect password', async ({ page }) => {

    const nurse = users.nurse.Camila;

    await page.selectOption('select[id="loginUser"]', { value: nurse.email });

    await page.keyboard.press('Tab');

    await page.fill('input[id="loginPass"]', 'abobrinha');

    await page.getByText('Entrar').click();

    await expect(page.getByText('Senha incorreta.')).toBeVisible();

});

test('Login without password set', async ({ page }) => {

    const nurse = users.nurse.Paulo;

    await page.selectOption('select[id="loginUser"]', { value: nurse.email });

    await page.keyboard.press('Tab');

    await page.getByText('Entrar').click();

    await expect(page.locator('p[id="loginError"]')).toBeVisible();

    await expect(page.getByText('Informe uma senha.')).toBeVisible();

});

test('Create account', async ({ page }) => {

    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();

    await page.locator('a[id="goRegister"]').click();

    await expect(page.getByText('Cadastro de novo usuário no MedAlert')).toBeVisible();

    await page.locator('input[id="regName"]').fill(randomName);

    await page.locator('input[id="regEmail"]').fill(randomEmail);

    await page.selectOption('select[id="regRole"]', { label: 'Paciente' });

    await page.locator('input[id="regPass"]').fill(randomPassword);

    await page.locator('input[id="regPass2"]').fill(randomPassword);

    await page.getByRole('button', { name: 'Criar conta' }).click();

    await page.getByText('Conta criada com sucesso. Faça login.').click();

})
