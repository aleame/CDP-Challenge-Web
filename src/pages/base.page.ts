import { Page } from '@playwright/test';

/**
 * Clase base que encapsula la instancia de Playwright `Page` 
 * y métodos de navegación genéricos reutilizables.
 */
export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string = '/') {
        await this.page.goto(url);
    }

    async waitForElement(selector: string) {
        await this.page.waitForSelector(selector);
    }
}
