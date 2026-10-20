import { Page } from "@playwright/test";
import { LoginPage } from "../tests/pages/loginPage";

export const pageFixture = {

    page: undefined as unknown as Page,

    pages: undefined as unknown as Array<Page>,

    loginPage: undefined as unknown as LoginPage,
}