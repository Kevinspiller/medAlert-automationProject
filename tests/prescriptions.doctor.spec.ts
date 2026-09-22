import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('http://localhost:3000/');

  await expect(page.getByText('MedAlert')).toBeVisible();

})

test('Add prescription', async ({ page }) => {

  await page.locator('div[data-pid="pac1"]').click();

  await page.locator('div[data-tab="rx"]').click();

  await expect(
    page.locator('.card').filter({ hasText: 'Nova prescrição' }).locator('h3')
  ).toContainText('Nova prescrição');

  await page.locator('input[id="rx_drug"]').fill('Dipirona');

  await page.locator('input[id="rx_dose"]').fill('15');

  await page.locator('input[id="rx_freq"]').fill('1 cada 8h quando dor');

  await page.getByText('Prescrever').click();

  await page.getByText('Prescrição salva com sucesso.').click();

  //completar com expect de cada linha sobre medicamento, dose e frequencia informados

});
