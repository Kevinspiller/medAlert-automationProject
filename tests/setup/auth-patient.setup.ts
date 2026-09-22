import { test as setup, expect } from '@playwright/test';
import users from '../../fixtures/users.json'

const authFile = 'playwright/.auth/patient.json';
const patient = users.patient.Marina;

setup('Authenticate Patient', async ({ request }) => {
    const response = await request.post('http://localhost:3000/api/auth/login', {
        data: {
            email: patient.email,
            password: patient.password,
        },
    });

    expect(response.ok()).toBeTruthy();

    await request.storageState({ path: authFile });
});