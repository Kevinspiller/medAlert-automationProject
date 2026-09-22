import { test as setup, expect } from '@playwright/test';
import users from '../../fixtures/users.json'

const authFile = 'playwright/.auth/doctor.json';
const doctor = users.doctor.Helena;

setup('Authenticate Doctor', async ({ request }) => {
    const response = await request.post('http://localhost:3000/api/auth/login', {
        data: {
            email: doctor.email,
            password: doctor.password,
        },
    });

    expect(response.ok()).toBeTruthy();

    await request.storageState({ path: authFile });
});