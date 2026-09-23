import { test, expect, Page, BrowserContext } from '@playwright/test';
import { formatDate } from '../utils/auxFunctions';
import vitalSigns from '../fixtures/vitalSigns.json'

test.describe.serial('Vital signs flow', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    // reuse of authentication storageState
    context = await browser.newContext({
      storageState: 'playwright/.auth/nurse.json',
    });
    page = await context.newPage();
    await page.goto('/');
  });

  test.afterAll(async () => {
    await context.close();
  });

  async function fillAndSubmitVitals() {
  await page.locator('#v_hr').fill(vitalSigns.hr.toString());
  await page.locator('#v_spo2').fill(vitalSigns.spo2.toString());
  await page.locator('#v_temp').fill(vitalSigns.temp.toString());
  await page.locator('#v_sys').fill(vitalSigns.sys.toString());
  await page.locator('#v_dia').fill(vitalSigns.dias.toString());
  await page.getByRole('button', { name: 'Registrar sinais' }).click();
}

  test('Add vitalSign', async () => {
  await page.locator('div[data-pid="pac1"]').click();
  await page.getByText('Sinais vitais').first().click();

  const clickTime = new Date();

  await expect(async () => {
    await fillAndSubmitVitals();
    // confirms success rapidly, if it fails, toPass try the whole block again
    await expect(page.getByText('Sinais vitais registrados.')).toBeVisible({ timeout: 1500 });
  }).toPass({ timeout: 20000 });

  const expectedDate = formatDate(clickTime);

  const firstDataRow = page.locator('.card')
    .filter({ hasText: 'Histórico' })
    .locator('table tbody tr')
    .filter({ has: page.locator('td') })
    .first();

  const cells = firstDataRow.locator('td');

  const fixedValues = [
    vitalSigns.hr.toString(),
    `${vitalSigns.spo2}%`,
    `${vitalSigns.temp} °F`,
    `${vitalSigns.sys}/${vitalSigns.dias}`,
  ];

  for (let i = 0; i < fixedValues.length; i++) {
    await expect(cells.nth(i + 1)).toHaveText(fixedValues[i]);
  }

  const actualDateTimeText = (await cells.nth(0).textContent())?.trim() ?? '';
  const actualDateOnly = actualDateTimeText.split(' ')[0];

  expect(actualDateOnly).toEqual(expectedDate);
});

  test('Alerts show correct severity for vitals', async () => {
  await page.locator('div[data-tab="alerts"]').click();

  const alertsCard = page.locator('.card').filter({ hasText: 'Alertas' });

  const expectedAlerts = [
    { message: `Pressão sistólica elevada (${vitalSigns.sys} mmHg)`, severity: 'media' },
    { message: `Febre — temperatura elevada (${vitalSigns.temp}°C)`, severity: 'alta' },
    { message: `Saturação de oxigênio abaixo do limite (${vitalSigns.spo2}%)`, severity: 'critica' },
    { message: `Frequência cardíaca baixa (${vitalSigns.hr} bpm)`, severity: 'alta' },
  ];

  for (const alert of expectedAlerts) {
    const row = alertsCard.locator('table tbody tr').filter({ hasText: alert.message }).first();

    await expect(row).toBeVisible();
    await expect(row.locator('td .sev')).toHaveText(alert.severity);
    await expect(row.locator('td .sev')).toHaveClass(new RegExp(`sev-${alert.severity}`));
  }
});

});