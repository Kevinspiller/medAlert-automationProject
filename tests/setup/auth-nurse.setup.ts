import { test as setup, expect } from '@playwright/test';
import users from '../../fixtures/users.json'

const authFile = 'playwright/.auth/nurse.json';
const nurse = users.nurse.Camila;

setup('Authenticate Nurse', async ({ request }) => {
    const response = await request.post('http://localhost:3000/api/auth/login', {
        data: {
            email: nurse.email,
            password: nurse.password,
        },
    });

    expect(response.ok()).toBeTruthy();

    await request.storageState({ path: authFile });
});