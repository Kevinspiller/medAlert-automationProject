import { test, expect } from '../fixtures/base'

test('Request nursing attendance', async ({ page }) => {

  await page.getByRole('button', { name: 'Solicitar atendimento da enfermagem' }).click();
  await page.getByText('Solicitação enviada à enfermagem.').click();

  const alertsCard = page.locator('.card').filter({ hasText: 'Alertas' });

  const date = new Date();

  const expectedAlert = {
    severity: 'baixa',
    message: 'Paciente solicitou atendimento (chamada de enfermagem)',
    status: 'Pendente',
  };

  const row = alertsCard.locator('table tbody tr')
    .filter({ hasText: expectedAlert.message })
    .first();

  await expect(row).toBeVisible();

  const cells = row.locator('td');

  await expect(cells.nth(0)).toContainText(date.toLocaleDateString());
  await expect(cells.nth(1).locator('.sev')).toHaveClass(new RegExp(`sev-${expectedAlert.severity}`));
  await expect(cells.nth(2)).toHaveText(expectedAlert.message);
  await expect(cells.nth(3)).toContainText(expectedAlert.status);

});