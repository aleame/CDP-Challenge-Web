import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { TicketsLocators } from '../locators/tickets.locators';

/**
 * Representa la vista de resultados y permite validar 
 * la presencia de ofertas o mensajes de "sin resultados".
 */
export class TicketsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async verifyNoResultsMessage() {
        console.log("Validando mensaje 'No encontramos opciones'...");
        await expect(this.page.locator(TicketsLocators.modalMessage)).toContainText('No encontramos opciones para tu viaje');
    }

    async verifyNewSearchButtonIsVisible() {
        console.log("Validando visibilidad del botón 'Inicio'...");
        await this.page.waitForSelector(TicketsLocators.buttonInicio);
        await expect(this.page.locator(TicketsLocators.buttonInicio)).toBeVisible();
    }

    async travelOffersCount(): Promise<number> {
        console.log("Buscando ofertas de viaje disponibles...");
        await this.page.waitForSelector(TicketsLocators.travelOption);
        const travelOffers = this.page.locator(TicketsLocators.travelOption);
        const count = await travelOffers.count();
        return count;
    }
}