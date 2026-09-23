import { test, expect } from '../fixtures/base'

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

  const expectedValues = ['Dipirona', '15', '1 cada 8h quando dor'];

  const lastDataRow = page.locator('.card')
    .filter({ hasText: 'Prescrições atuais' })
    .locator('table tbody tr')
    .filter({ has: page.locator('td') })
    .last();

  const cells = lastDataRow.locator('td');
  for (let i = 0; i < expectedValues.length; i++) {
    await expect(cells.nth(i)).toHaveText(expectedValues[i]);
  }

});
