import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('http://localhost:3000/');

  await expect(page.getByText('MedAlert')).toBeVisible();

})

test('Add vitalSign', async ({ page }) => {

  await page.locator('div[data-pid="pac1"]').click();

  await page.getByText('Sinais vitais').first().click();

  await page.locator('#v_hr').fill('49');

  await page.locator('#v_spo2').fill('95');

  await page.locator('#v_temp').fill('37.7');
  
  await page.locator('#v_sys').fill('140');
  
  await page.locator('#v_dia').fill('90');

  await page.getByRole('button', {name : "Registrar sinais"});

  //adicionar expect para verificar resultado

});